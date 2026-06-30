// ─── Permit Tracking Types ─────────────────────────────────────────────────
// Based on the client's 55-column Excel permit management matrix
// Each milestone has PLAN, ACTUAL, and FORECAST date variants

export type PermitEstado =
    | 'NO INICIADO'
    | 'EN ELABORACIÓN'
    | 'EN REVISIÓN'
    | 'APROBADO'
    | 'RECHAZADO';

export interface MilestoneDates {
    plan: string | null;
    actual: string | null;
    forecast: string | null;
}

export interface TiempoTramitacion {
    plan: number | null;     // days (e.g. 120)
    actual: number | null;   // days real (e.g. 189)
    forecast: number | null; // days projected
}

export interface PermitTramitacion {
    // Cols 1–7: Identification
    id: number;
    codigoAconex: string;
    obraActividad: string;
    tipoPermiso: string;
    permisoAplicable: string;
    autoridad: string;
    contratistaResponsable: string;
    origenPermiso?: string | null;
    macrozona?: string | null;
    gerencia?: string;
    wbs?: string;
    wbsGroupName?: string;
    wbsId?: number | null;

    // Cols 9–11: Solicitud de Información Legal / Ingeniería
    solicitudInfoLegal: MilestoneDates;

    // Cols 12–14: Entrega de Información
    entregaInformacion: MilestoneDates;

    // Cols 15–17: Inicio Elaboración Expediente
    inicioElaboracion: MilestoneDates;

    // Cols 18–20: Término Elaboración Expediente
    terminoElaboracion: MilestoneDates;

    // Cols 21–23: Inicio Revisión GF / Asesor / IC
    inicioRevisionGF: MilestoneDates;

    // Cols 24–26: Término Revisión GF / Asesor / IC
    terminoRevisionGF: MilestoneDates;

    // Cols 27–29: Inicio Corrección Observaciones
    inicioCorreccionObs: MilestoneDates;

    // Cols 30–32: Término Corrección Observaciones
    terminoCorreccionObs: MilestoneDates;

    // Cols 33–35: Inicio Revisión 0 / Final
    inicioRevision0: MilestoneDates;

    // Cols 36–38: Término Revisión 0 / Final
    terminoRevision0: MilestoneDates;

    // Cols 39–41: Firma RL
    firmaRL: MilestoneDates;

    // Cols 42–44: Ingreso Autoridad
    ingresoAutoridad: MilestoneDates;

    // Cols 45–47: Fecha Resolución Autoridad
    fechaResolucion: MilestoneDates;

    // Cols 48–50: Tiempo Tramitación (días numéricos)
    tiempoTramitacion: TiempoTramitacion;

    // Cols 51–53: Aprobación
    aprobacion: MilestoneDates;

    // Col 54: Estado
    estado: PermitEstado;

    // Col 55: Resolución / Aprobación (texto libre o número de resolución)
    resolucionAprobacion: string | null;

    // Phase 3: Specialized Tracking for "Solicitud Legal / Ingeniería"
    documentosFaltantes?: {
        nombre: string;
        responsable: string;
        diasAtraso: number;
    }[];
}
