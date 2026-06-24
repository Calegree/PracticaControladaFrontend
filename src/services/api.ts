const BASE = '/api/v1';
const AGENTS_BASE = import.meta.env.VITE_AGENTS_URL || '/agents';

export async function apiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
    return res.json();
}

export interface RCASummary {
    wbs_id: number;
    total: number;
    cumplidos: number;
    en_proceso: number;
    atrasados: number;
    tiene_datos: boolean;
}

export interface WBSPermitSummary {
    wbs_id: number;
    total_permits: number;
    rca_permits: number;
    gdc_permits: number;
    aprobados: number;
    en_proceso: number;
    no_iniciados: number;
}

export async function fetchRCASummary(wbsId: number): Promise<RCASummary> {
    return apiFetch<RCASummary>(`/rca/${wbsId}/summary`);
}

export async function fetchWBSPermitSummary(wbsId: number): Promise<WBSPermitSummary> {
    return apiFetch<WBSPermitSummary>(`/rca/wbs/${wbsId}/permit-summary`);
}

export interface OrigenPermitStats {
    total: number;
    cumplidos: number;
    en_proceso: number;
    rechazados: number;
}

export interface ObraActivitySummary {
    obra_actividad: string;
    rca: OrigenPermitStats;
    gdc: OrigenPermitStats;
    total: OrigenPermitStats;
}

export async function fetchObraActivitySummary(obraActividad: string): Promise<ObraActivitySummary> {
    return apiFetch<ObraActivitySummary>(`/rca/obra-summary?obra=${encodeURIComponent(obraActividad)}`);
}

export async function triggerRCAExtraction(wbsId: number, rcaText: string): Promise<{ total_extraidos: number; guardados_en_db: number; errores: string[] }> {
    const res = await fetch(`${AGENTS_BASE}/rca/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wbs_id: wbsId, rca_text: rcaText, guardar_en_db: true }),
    });
    if (!res.ok) throw new Error(`Agent error ${res.status}: ${res.statusText}`);
    return res.json();
}

// ─── Documents API ────────────────────────────────────────────────────────────

export interface Documento {
    id: number;
    permit_id: number;
    milestone_order: number;
    nombre_documento: string;
    nombre_responsable: string | null;
    gerencia_responsable: string | null;
    correo_responsable: string | null;
    fecha_entrega: string | null;
    dias_atraso: number;
    subido: boolean;
    extraido_por_agente: boolean;
}

export async function fetchDocumentos(permitId: number): Promise<Documento[]> {
    return apiFetch<Documento[]>(`/documents?permit_id=${permitId}`);
}

export async function updateDocumento(docId: number, payload: Partial<Pick<Documento, 'subido' | 'dias_atraso' | 'fecha_entrega' | 'nombre_responsable' | 'gerencia_responsable' | 'correo_responsable'>>): Promise<Documento> {
    const res = await fetch(`/api/v1/documents/${docId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}

export interface NuevoDocumentoRequerido {
    permit_id: number;
    milestone_order: number;
    nombre_documento: string;
    nombre_responsable?: string | null;
    gerencia_responsable?: string | null;
    correo_responsable?: string | null;
    fecha_entrega?: string | null;
}

export async function createDocumento(payload: NuevoDocumentoRequerido): Promise<Documento> {
    const res = await fetch('/api/v1/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, dias_atraso: 0, subido: false, extraido_por_agente: false }),
    });
    if (!res.ok) {
        const e = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(e.detail || `API error ${res.status}`);
    }
    return res.json();
}

export async function deleteDocumento(docId: number): Promise<void> {
    const res = await fetch(`/api/v1/documents/${docId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`API error ${res.status}`);
}

export interface DocEntry {
    nombre_documento: string;
    nombre_responsable: string | null;
    gerencia_responsable: string | null;
    correo_responsable: string | null;
    fecha_entrega: string | null;
    milestone_order: number;
    missing_fields: string[];
}

export interface DocAnalysisResult {
    status: 'ok' | 'blank' | 'incomplete';
    detected_permits: string[];
    warnings: string[];
    documentos: DocEntry[];
}

export async function triggerDocumentExtraction(
    file: File,
    tipoPermiso: string,
    autoridad: string,
    gerencia: string,
    currentPermitCode: string,
    siblingCodes: string[],
): Promise<DocAnalysisResult> {
    const form = new FormData();
    form.append('file', file);
    form.append('tipo_permiso', tipoPermiso);
    form.append('autoridad', autoridad);
    form.append('gerencia', gerencia);
    form.append('current_permit_code', currentPermitCode);
    form.append('sibling_codes', JSON.stringify(siblingCodes));
    const res = await fetch(`${AGENTS_BASE}/documents/extract`, {
        method: 'POST',
        body: form,
    });
    if (!res.ok) throw new Error(`Agent error ${res.status}: ${res.statusText}`);
    return res.json();
}

// ─── Quality validation (RAG) API ──────────────────────────────────────────────

export type QualityVeredicto =
    | 'APROBADO'
    | 'APROBADO_CON_OBSERVACIONES'
    | 'RECHAZADO_INTEGRIDAD'
    | 'RECHAZADO_LEGIBILIDAD'
    | 'RECHAZADO_COHERENCIA'
    | 'INDETERMINADO';

export interface QualityEvidence {
    clausula_rca?: string;
    similitud?: number;
    fragmento_doc?: string;
}

export interface QualityVerdict {
    veredicto: QualityVeredicto;
    score_coherencia?: number | null;
    observaciones?: string | null;
    evidencia?: QualityEvidence[];
    secciones_detectadas?: string[];
    secciones_esperadas_faltantes?: string[];
    persistido?: boolean;
    persistido_error?: string;
    notificado?: boolean;
}

/**
 * Valida un PDF contra la RCA indexada del WBS (sub-producto 2 — agente de calidad documental).
 * Si se pasa `documentoId`, el backend persiste el veredicto en `quality_reviews` y, ante un
 * rechazo, notifica por correo al responsable del documento.
 */
export async function validateDocumentQuality(
    file: File,
    wbsId: number,
    documentoId?: number,
): Promise<QualityVerdict> {
    const form = new FormData();
    form.append('file', file);
    form.append('wbs_id', String(wbsId));
    if (documentoId != null) form.append('documento_id', String(documentoId));
    const res = await fetch(`${AGENTS_BASE}/documents/validate`, {
        method: 'POST',
        body: form,
    });
    if (!res.ok) throw new Error(`Agent error ${res.status}: ${res.statusText}`);
    return res.json();
}

// ─── Obra Documents (centro de documentos + Cloudflare R2) ──────────────────────

export interface ObraDocumento {
    id: number;
    permit_id: number;
    obra_actividad: string | null;
    categoria: string;
    nombre_archivo: string;
    content_type: string | null;
    size_bytes: number | null;
    veredicto: string | null;
    score_coherencia: number | null;
    observaciones: string | null;
    subido_por: string | null;
    created_at: string;
}

export interface ObraUploadResult {
    aprobado: boolean;
    advertencia?: boolean;
    veredicto: string;
    observaciones?: string | null;
    score_coherencia?: number | null;
    documento?: ObraDocumento;
}

export async function listObraDocuments(permitId: number): Promise<ObraDocumento[]> {
    return apiFetch<ObraDocumento[]>(`/obra-documents?permit_id=${permitId}`);
}

// ─── Obras (creación manual + enlace de permisos) ──────────────────────────────

export interface Obra {
    id: number;
    nombre: string;
    gerencia: string | null;
    wbs_label: string | null;
    descripcion: string | null;
    permit_count: number;
    created_at: string;
}

export async function listObras(soloSinPermisos = false): Promise<Obra[]> {
    return apiFetch<Obra[]>(`/obras${soloSinPermisos ? '?solo_sin_permisos=true' : ''}`);
}

export async function createObra(payload: { nombre: string; gerencia?: string; wbs_label?: string; descripcion?: string }): Promise<Obra> {
    const res = await fetch('/api/v1/obras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const e = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(e.detail || `Error ${res.status}`);
    }
    return res.json();
}

export async function linkPermitToObra(obraId: number, codigoAconex: string): Promise<Obra> {
    const res = await fetch(`/api/v1/obras/${obraId}/link-permit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo_aconex: codigoAconex }),
    });
    if (!res.ok) {
        const e = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(e.detail || `Error ${res.status}`);
    }
    return res.json();
}

export async function deleteObra(obraId: number): Promise<void> {
    const res = await fetch(`/api/v1/obras/${obraId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Error ${res.status}`);
}

export interface NuevoPermisoEnObra {
    codigo_aconex: string;
    tipo_permiso?: string;
    permiso_aplicable?: string;
    autoridad?: string;
    contratista_responsable?: string;
    origen_permiso?: string;
    estado?: string;
    macrozona?: string;
}

/** Crea un permiso nuevo enlazado a una obra por nombre (obra_actividad). */
export async function createPermit(payload: {
    codigo_aconex: string;
    obra_actividad?: string;
    gerencia?: string;
    wbs_label?: string;
    macrozona?: string;
    tipo_permiso?: string;
    permiso_aplicable?: string;
    autoridad?: string;
    contratista_responsable?: string;
    origen_permiso?: string;
    estado?: string;
}): Promise<{ ok: boolean; id: number; codigo_aconex: string; obra_actividad: string | null }> {
    const res = await fetch('/api/v1/permits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const e = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(e.detail || `Error ${res.status}`);
    }
    return res.json();
}

/** Crea un permiso nuevo dentro de una obra (hereda gerencia y WBS de la obra). */
export async function createPermitInObra(obraId: number, payload: NuevoPermisoEnObra): Promise<Obra> {
    const res = await fetch(`/api/v1/obras/${obraId}/create-permit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const e = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(e.detail || `Error ${res.status}`);
    }
    return res.json();
}

export type ConcordanciaResultado = 'ALTA' | 'DUDOSA' | 'NULA' | 'TITULO_INSUFICIENTE' | 'ILEGIBLE';

export interface ObraAnalyzeResult {
    resultado: ConcordanciaResultado | string;
    mensaje: string;
    como_solucionar?: string;
    titulo_obra?: string;
}

/**
 * Analiza (IA/Groq) si el documento concuerda con el título de la obra, ANTES de subir.
 * Devuelve un semáforo (ALTA/DUDOSA/NULA) + mensaje, para que el usuario decida.
 */
export async function analyzeObraDocument(file: File, permitId: number): Promise<ObraAnalyzeResult> {
    const form = new FormData();
    form.append('file', file);
    form.append('permit_id', String(permitId));
    const res = await fetch('/api/v1/obra-documents/analyze', { method: 'POST', body: form });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || `Error ${res.status}`);
    }
    return res.json();
}

/**
 * Sube un documento al centro de documentos de la obra. El backend lo valida con
 * el agente de calidad y, si aprueba, lo almacena en R2 y lo enlaza a la obra.
 */
export async function uploadObraDocument(file: File, permitId: number, categoria: string): Promise<ObraUploadResult> {
    const form = new FormData();
    form.append('file', file);
    form.append('permit_id', String(permitId));
    form.append('categoria', categoria);
    const res = await fetch('/api/v1/obra-documents/upload', { method: 'POST', body: form });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || `Error ${res.status}`);
    }
    return res.json();
}

export function obraDocumentDownloadUrl(docId: number): string {
    return `/api/v1/obra-documents/${docId}/download`;
}

export async function deleteObraDocument(docId: number): Promise<void> {
    const res = await fetch(`/api/v1/obra-documents/${docId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Error ${res.status}`);
}

// ─── Notifications API ────────────────────────────────────────────────────────

export interface NotificationPreferences {
    correo: string;
    alertas_vencimiento: boolean;
    cambios_estado: boolean;
    resumen_semanal: boolean;
    project_name?: string;
    permit_code?: string;
}

export async function sendNotificationEmail(prefs: NotificationPreferences): Promise<{ ok: boolean; enviado_a: string }> {
    const res = await fetch('/api/v1/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || `Error ${res.status}`);
    }
    return res.json();
}

export async function saveDocumentos(
    docs: DocEntry[],
    permitId: number,
): Promise<{ guardados: number; errores: string[] }> {
    let guardados = 0;
    const errores: string[] = [];
    for (const doc of docs) {
        const res = await fetch('/api/v1/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                permit_id: permitId,
                milestone_order: doc.milestone_order,
                nombre_documento: doc.nombre_documento,
                nombre_responsable: doc.nombre_responsable,
                gerencia_responsable: doc.gerencia_responsable,
                correo_responsable: doc.correo_responsable,
                fecha_entrega: doc.fecha_entrega,
                dias_atraso: 0,
                subido: false,
            }),
        });
        if (res.ok) guardados++;
        else errores.push(`Error al guardar '${doc.nombre_documento}'`);
    }
    return { guardados, errores };
}
