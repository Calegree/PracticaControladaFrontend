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
