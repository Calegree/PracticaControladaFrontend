import { apiFetch } from './api';
import type { PermitTramitacion, PermitEstado, MilestoneDates, TiempoTramitacion } from '../types/permit';

// ─── Backend API types ───────────────────────────────────────────────────────

export interface ApiWBSItem {
    id: number;
    wbs_number: number;
    wbs_name: string;
    nombre_wbs: string | null;
}

export interface ApiMilestone {
    id: number;
    permit_id: number;
    milestone_name: string;
    milestone_order: number;
    plan_date: string | null;
    actual_date: string | null;
    forecast_date: string | null;
    plan_days: number | null;
    actual_days: number | null;
    forecast_days: number | null;
}

export interface ApiPermitListItem {
    id: number;
    codigo_aconex: string;
    macrozona: string | null;
    gerencia: string | null;
    origen_permiso: string | null;
    obra_actividad: string | null;
    tipo_permiso: string | null;
    permiso_aplicable: string | null;
    autoridad: string | null;
    categoria_1: string | null;
    contratista_responsable: string | null;
    estado: string | null;
    resolucion_aprobacion: string | null;
    or_flag: boolean;
    index_or: number | null;
    wbs_id: number | null;
    wbs_item: ApiWBSItem | null;
    forecast_aprobacion: string | null;
    plan_aprobacion: string | null;
    actual_aprobacion: string | null;
}

export interface ApiPermitDetail extends ApiPermitListItem {
    milestones: ApiMilestone[];
    schedule_snapshots: unknown[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function isoToDisplay(iso: string | null): string | null {
    if (!iso) return null;
    // Handles both "YYYY-MM-DD" and Date objects serialized as strings
    const parts = iso.split('T')[0].split('-');
    if (parts.length !== 3) return null;
    const [year, month, day] = parts;
    return `${day}/${MONTHS[parseInt(month) - 1]}/${year.slice(2)}`;
}

function emptyMilestone(): MilestoneDates {
    return { plan: null, actual: null, forecast: null };
}

const VALID_ESTADOS: PermitEstado[] = [
    'NO INICIADO', 'EN ELABORACIÓN', 'EN REVISIÓN', 'APROBADO', 'RECHAZADO',
];

function toEstado(s: string | null): PermitEstado {
    const upper = (s ?? '').toUpperCase().trim();
    return VALID_ESTADOS.find(e => e === upper) ?? 'NO INICIADO';
}

// milestone_order → PermitTramitacion field name
// Backend milestone structure (from README):
//  1: Solicitud información Legal        → solicitudInfoLegal
//  2: Solicitud información Ingeniería   → (skip, combined with 1 in frontend)
//  3: Entrega información Legal          → entregaInformacion
//  4: Entrega información Ingeniería     → (skip, combined with 3 in frontend)
//  5: Inicio Elaboración Expediente      → inicioElaboracion
//  6: Borrador expediente (Rev. B)       → terminoElaboracion
//  7: Inicio Revisión GF / Asesor / IC   → inicioRevisionGF
//  8: Término Revisión GF / Asesor / IC  → terminoRevisionGF
//  9: Inicio Corrección Observaciones    → inicioCorreccionObs
// 10: Término Corrección Observaciones   → terminoCorreccionObs
// 11: Inicio Proceso Firma RL            → inicioRevision0 (best match)
// 12: Término Proceso Firma RL           → terminoRevision0 (best match)
// 13: Ingreso Autoridad                  → ingresoAutoridad
// 14: Tiempo Tramitación (days)          → tiempoTramitacion (handled separately)
// 15: Aprobación                         → aprobacion
// Note: firmaRL and fechaResolucion have no direct backend equivalent → show as "—"
const MILESTONE_FIELDS: Record<number, keyof PermitTramitacion> = {
    1: 'solicitudInfoLegal',
    3: 'entregaInformacion',
    5: 'inicioElaboracion',
    6: 'terminoElaboracion',
    7: 'inicioRevisionGF',
    8: 'terminoRevisionGF',
    9: 'inicioCorreccionObs',
    10: 'terminoCorreccionObs',
    11: 'inicioRevision0',
    12: 'terminoRevision0',
    13: 'ingresoAutoridad',
    15: 'aprobacion',
};

// ─── Mappers ─────────────────────────────────────────────────────────────────

function basePermit(p: ApiPermitListItem): PermitTramitacion {
    return {
        id: p.id,
        codigoAconex: p.codigo_aconex,
        obraActividad: p.obra_actividad ?? '',
        tipoPermiso: p.tipo_permiso ?? '',
        permisoAplicable: p.permiso_aplicable ?? '',
        autoridad: p.autoridad ?? '',
        contratistaResponsable: p.contratista_responsable ?? '',
        origenPermiso: p.origen_permiso ?? null,
        gerencia: p.gerencia ?? undefined,
        wbs: p.wbs_item?.nombre_wbs ?? p.wbs_item?.wbs_name ?? undefined,
        wbsGroupName: p.wbs_item?.wbs_name ?? undefined,
        wbsId: p.wbs_id ?? null,
        estado: toEstado(p.estado),
        resolucionAprobacion: p.resolucion_aprobacion,
        // Milestones — populated as empty for list items, real data for detail
        solicitudInfoLegal: emptyMilestone(),
        entregaInformacion: emptyMilestone(),
        inicioElaboracion: emptyMilestone(),
        terminoElaboracion: emptyMilestone(),
        inicioRevisionGF: emptyMilestone(),
        terminoRevisionGF: emptyMilestone(),
        inicioCorreccionObs: emptyMilestone(),
        terminoCorreccionObs: emptyMilestone(),
        inicioRevision0: emptyMilestone(),
        terminoRevision0: emptyMilestone(),
        firmaRL: emptyMilestone(),
        ingresoAutoridad: emptyMilestone(),
        fechaResolucion: emptyMilestone(),
        aprobacion: {
            plan: isoToDisplay(p.plan_aprobacion),
            actual: isoToDisplay(p.actual_aprobacion),
            forecast: isoToDisplay(p.forecast_aprobacion),
        },
        tiempoTramitacion: { plan: null, actual: null, forecast: null },
    };
}

export function mapListItem(p: ApiPermitListItem): PermitTramitacion {
    return basePermit(p);
}

export function mapDetail(p: ApiPermitDetail): PermitTramitacion {
    const base = basePermit(p);

    // Fill in all milestones from the API array
    for (const ms of p.milestones) {
        const field = MILESTONE_FIELDS[ms.milestone_order];
        if (field) {
            (base as unknown as Record<string, unknown>)[field] = {
                plan: isoToDisplay(ms.plan_date),
                actual: isoToDisplay(ms.actual_date),
                forecast: isoToDisplay(ms.forecast_date),
            } satisfies MilestoneDates;
        }
        // milestone_order 14 = Tiempo Tramitación (days)
        if (ms.milestone_order === 14) {
            base.tiempoTramitacion = {
                plan: ms.plan_days,
                actual: ms.actual_days,
                forecast: ms.forecast_days,
            } satisfies TiempoTramitacion;
        }
    }

    return base;
}

// ─── API calls ───────────────────────────────────────────────────────────────

export async function fetchPermits(params?: {
    limit?: number;
    gerencia?: string;
    estado?: string;
    autoridad?: string;
    contratista?: string;
    search?: string;
}): Promise<PermitTramitacion[]> {
    const qs = new URLSearchParams();
    qs.set('limit', String(params?.limit ?? 500));
    if (params?.gerencia) qs.set('gerencia', params.gerencia);
    if (params?.estado) qs.set('estado', params.estado);
    if (params?.autoridad) qs.set('autoridad', params.autoridad);
    if (params?.contratista) qs.set('contratista', params.contratista);
    if (params?.search) qs.set('search', params.search);

    const items = await apiFetch<ApiPermitListItem[]>(`/permits?${qs}`);
    return items.map(mapListItem);
}

export async function fetchPermitDetail(codigoAconex: string): Promise<PermitTramitacion> {
    const item = await apiFetch<ApiPermitDetail>(`/permits/${encodeURIComponent(codigoAconex)}`);
    return mapDetail(item);
}
