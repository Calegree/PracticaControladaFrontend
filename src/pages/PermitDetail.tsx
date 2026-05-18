import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPermitDetail } from '../services/permits';
import type { MilestoneDates, PermitEstado, PermitTramitacion } from '../types/permit';

const estadoStyles: Record<PermitEstado, string> = {
    'NO INICIADO': 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    'EN ELABORACIÓN': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'EN REVISIÓN': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'APROBADO': 'bg-green-500/10 text-green-400 border-green-500/30',
    'RECHAZADO': 'bg-red-500/10 text-red-400 border-red-500/30',
};

// Determine if a milestone is done (has actual), in progress (has forecast only), or not started
function getMilestoneStatus(m: MilestoneDates): 'done' | 'forecast' | 'pending' {
    if (m.actual) return 'done';
    if (m.forecast) return 'forecast';
    return 'pending';
}

// Parse 'dd/Mon/yy' or 'dd/Mon/yyyy' strings into Date objects for correct comparison
const MONTH_MAP: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};
function parsePermitDate(s: string): Date | null {
    const parts = s.split('/');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const month = MONTH_MAP[parts[1]];
    const yearRaw = parseInt(parts[2], 10);
    const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;
    if (isNaN(day) || month === undefined || isNaN(year)) return null;
    return new Date(year, month, day);
}

// Compare actual vs plan to detect schedule deviation using real Date objects
function getDeviation(m: MilestoneDates): 'on-time' | 'delayed' | 'none' {
    if (!m.actual || !m.plan) return 'none';
    const actualDate = parsePermitDate(m.actual);
    const planDate = parsePermitDate(m.plan);
    if (!actualDate || !planDate) return 'none';
    return actualDate <= planDate ? 'on-time' : 'delayed';
}

interface MilestoneRowProps {
    label: string;
    data: MilestoneDates;
    explanation?: string;
    isApproved?: boolean;  // When true, deviations show as amber (historical) not red (alarm)
}

const MilestoneRow = ({ label, data, explanation, isApproved = false }: MilestoneRowProps) => {
    const status = getMilestoneStatus(data);
    const deviation = getDeviation(data);

    const planCell = data.plan ?? '—';
    const actualCell = data.actual ?? '—';

    const rowBase = 'grid grid-cols-4 text-xs border-b border-border-dark/50 hover:bg-background-dark/30 transition-colors';

    // Milestone label cell color
    const labelColor = status === 'done' ? 'text-white' : status === 'forecast' ? 'text-yellow-400/80' : 'text-text-secondary/50';

    // Actual date cell style — approved permits use amber for past delays (historical info), not red (alarm)
    const delayedColor = isApproved ? 'text-amber-400 font-bold' : 'text-red-400 font-bold';
    const actualColor =
        !data.actual ? 'text-text-secondary/40' :
            deviation === 'delayed' ? delayedColor :
                deviation === 'on-time' ? 'text-green-400 font-bold' :
                    'text-white';

    // Forecast cell style
    const forecastColor = data.actual
        ? 'text-green-400/60'
        : data.forecast
            ? 'text-yellow-400'
            : 'text-text-secondary/40';

    // Status icon
    const icon =
        status === 'done' ? (
            <span className="material-symbols-outlined text-[16px] text-green-500 icon-fill">check_circle</span>
        ) : status === 'forecast' ? (
            <span className="material-symbols-outlined text-[16px] text-yellow-500 icon-fill animate-pulse">schedule</span>
        ) : (
            <span className="w-4 h-4 rounded-full border-2 border-dashed border-border-dark inline-block" />
        );

    return (
        <div className={rowBase}>
            <div className="px-4 py-3 flex items-center gap-2.5 col-span-1 group relative cursor-help">
                <div className="shrink-0 flex items-center justify-center w-5">{icon}</div>
                <span className={`text-[11px] font-semibold leading-tight ${labelColor}`}>{label}</span>

                {/* Tooltip */}
                {explanation && (
                    <div className="absolute left-8 top-10 w-64 p-3 bg-surface-dark border border-border-dark rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
                        <p className="text-[10px] text-text-secondary leading-relaxed font-normal normal-case tracking-normal">
                            {explanation}
                        </p>
                    </div>
                )}
            </div>
            <div className="px-4 py-3 flex items-center">
                <span className="text-text-secondary/70 font-mono text-[11px] tracking-wide">{planCell}</span>
            </div>
            <div className="px-4 py-3 flex items-center">
                <span className={`font-mono text-[11px] tracking-wide ${forecastColor}`}>
                    {data.actual ? data.actual : (data.forecast ?? '—')}
                </span>
            </div>
            <div className="px-4 py-3 flex items-center gap-1.5">
                <span className={`font-mono text-[11px] tracking-wide ${actualColor}`}>{actualCell}</span>
                {deviation === 'delayed' && (
                    <span className={`material-symbols-outlined text-[12px] ${isApproved ? 'text-amber-400' : 'text-red-400'}`}>arrow_upward</span>
                )}
                {deviation === 'on-time' && (
                    <span className="material-symbols-outlined text-[12px] text-green-400">check</span>
                )}
            </div>
        </div>
    );
};

const PermitDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [permit, setPermit] = useState<PermitTramitacion | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        fetchPermitDetail(decodeURIComponent(id))
            .then(setPermit)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando permiso...
        </div>
    );

    if (error || !permit) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white gap-4">
                <span className="material-symbols-outlined text-[80px] text-text-secondary">description_off</span>
                <h2 className="text-2xl font-black uppercase">{error ? 'Error al cargar permiso' : 'Permiso no encontrado'}</h2>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button onClick={() => navigate('/tracker')} className="text-primary hover:underline text-sm font-bold">
                    ← Volver a la tabla
                </button>
            </div>
        );
    }

    const tramitDays = permit.tiempoTramitacion;
    const daysDeviation = tramitDays.actual && tramitDays.plan
        ? tramitDays.actual - tramitDays.plan
        : null;
    // Approved permits show deviations in amber (historical info) not red (active alarm)
    const isApproved = permit.estado === 'APROBADO';

    const milestones: { label: string; explanation?: string; data: MilestoneDates }[] = [
        { label: 'Solicitud Información Legal / Ingeniería', explanation: 'Se levanta el requerimiento formal pidiendo planos, estudios técnicos y documentos legales de los terrenos a ingenieros y abogados.', data: permit.solicitudInfoLegal },
        { label: 'Entrega de Información', explanation: 'Los equipos de ingeniería y legal entregan toda la información requerida (planos, escrituras, etc.) al equipo de permisos.', data: permit.entregaInformacion },
        { label: 'Inicio Elaboración Expediente', explanation: 'Con la información recibida, se inicia la redacción del documento técnico-legal formal (el "Expediente") requerido por la autoridad.', data: permit.inicioElaboracion },
        { label: 'Término Elaboración Expediente', explanation: 'Se finaliza el primer borrador completo del expediente técnico.', data: permit.terminoElaboracion },
        { label: 'Inicio Revisión GF / Asesor / IC', explanation: 'Revisión crítica del borrador por parte de Gold Fields y Revisores Internos para asegurar la calidad.', data: permit.inicioRevisionGF },
        { label: 'Término Revisión GF / Asesor / IC', explanation: 'Finaliza la revisión. Los revisores devuelven la carpeta con marcas, correcciones y comentarios (observaciones).', data: permit.terminoRevisionGF },
        { label: 'Inicio Corrección Observaciones', explanation: 'El equipo de permisos toma la carpeta marcada y comienza a corregir todas las observaciones reportadas por los revisores.', data: permit.inicioCorreccionObs },
        { label: 'Término Corrección Observaciones', explanation: 'El expediente se encuentra completamente corregido y limpio.', data: permit.terminoCorreccionObs },
        { label: 'Inicio Revisión 0 / Final', explanation: 'Última revisión de control de calidad (Versión 0) para asegurar que no se haya escapado ningún detalle.', data: permit.inicioRevision0 },
        { label: 'Término Revisión 0 / Final', explanation: 'El expediente está 100% visado y bloqueado; no se admiten más cambios.', data: permit.terminoRevision0 },
        { label: 'Firma RL', explanation: 'Firma de la carta formal por parte del Representante Legal (Gerente General) asumiendo la responsabilidad jurídica.', data: permit.firmaRL },
        { label: 'Ingreso Autoridad', explanation: 'Carga física o digital del expediente en la oficina de partes de Sernageomin, DGA, etc. (Acá inicia el Tiempo de Tramitación estatal).', data: permit.ingresoAutoridad },
        { label: 'Fecha Resolución Autoridad', explanation: 'Día en que la entidad gubernamental firma y emite el decreto legal (Resolución Exenta) aprobando o rechazando la solicitud.', data: permit.fechaResolucion },
        { label: 'Aprobación', explanation: 'Hito final que marca la vigencia total del permiso, luego de notificaciones oficiales o publicaciones en el Diario Oficial.', data: permit.aprobacion },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <div className="px-4 md:px-8 pt-6 pb-2">
                {/* Breadcrumb */}
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-6">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/tracker')}>
                        Tramitación de Permisos
                    </span>
                    <span className="mx-2">›</span>
                    <span className="text-white">Ficha #{permit.id}</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${estadoStyles[permit.estado]}`}>
                                {permit.estado}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary">
                                {permit.autoridad}
                            </span>
                        </div>
                        <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                            {permit.obraActividad}
                        </h1>
                        <p className="text-text-secondary text-sm mt-1">{permit.tipoPermiso}</p>
                        <p className="text-text-secondary/50 text-xs font-mono mt-0.5">{permit.codigoAconex}</p>
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-blue-500/10 p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-[18px] text-blue-400">account_balance</span>
                            </span>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Autoridad</p>
                        </div>
                        <p className="text-base font-black text-white">{permit.autoridad}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">{permit.contratistaResponsable}</p>
                    </div>

                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-purple-500/10 p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-[18px] text-purple-400">timer</span>
                            </span>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Tiempo Tramitación</p>
                        </div>
                        <div className="flex items-baseline gap-2 mb-1">
                            <p className={`text-3xl font-black ${daysDeviation !== null && daysDeviation > 0 ? (isApproved ? 'text-amber-400' : 'text-red-400') : 'text-white'}`}>
                                {tramitDays.actual ?? tramitDays.forecast ?? '—'}
                            </p>
                            <span className="text-text-secondary text-sm font-semibold">días en total</span>
                        </div>
                        {tramitDays.plan && (
                            <div className="flex flex-col gap-1 mt-2">
                                <p className="text-[10px] text-text-secondary/80 leading-snug">
                                    El plan inicial era de <strong className="text-text-secondary">{tramitDays.plan} días</strong>.
                                </p>
                                {daysDeviation !== null && (
                                    <p className={`text-[10px] leading-snug font-medium ${daysDeviation > 0 ? (isApproved ? 'text-amber-400/90' : 'text-red-400/90') : 'text-green-400/90'}`}>
                                        {daysDeviation > 0
                                            ? `Tuvo ${daysDeviation} días de atraso respecto al plan.`
                                            : `Terminó ${Math.abs(daysDeviation)} días antes del plan.`}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-green-500/10 p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-[18px] text-green-400">event_available</span>
                            </span>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Aprobación</p>
                        </div>
                        <p className="text-base font-black text-white">
                            {permit.aprobacion.actual ?? permit.aprobacion.forecast ?? permit.aprobacion.plan ?? '—'}
                        </p>
                        {permit.aprobacion.actual
                            ? <p className="text-[10px] text-green-400 mt-0.5">Fecha real</p>
                            : permit.aprobacion.forecast
                                ? <p className="text-[10px] text-yellow-400 mt-0.5">Fecha forecast</p>
                                : <p className="text-[10px] text-text-secondary mt-0.5">Fecha planificada</p>
                        }
                    </div>

                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-cyan-500/10 p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-[18px] text-cyan-400">gavel</span>
                            </span>
                            <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">Resolución</p>
                        </div>
                        <p className="text-sm font-black text-white leading-snug">
                            {permit.resolucionAprobacion
                                ? (permit.resolucionAprobacion.length > 30
                                    ? permit.resolucionAprobacion.substring(0, 30) + '...'
                                    : permit.resolucionAprobacion)
                                : '—'
                            }
                        </p>
                    </div>
                </div>


                {/* --- SUPER-TRACKER: SOLICITUD LEGAL / INGENIERÍA --- */}
                {permit.documentosFaltantes && permit.documentosFaltantes.length > 0 && (
                    <div className="rounded-xl bg-surface-dark border border-orange-500/30 shadow-sm overflow-hidden mb-6 relative">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
                        <div className="p-5 border-b border-border-dark flex items-start justify-between bg-orange-500/5">
                            <div className="flex gap-3">
                                <span className="material-symbols-outlined text-orange-500 text-[24px]">warning</span>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-orange-400">Atención: Documentación Faltante</h3>
                                    <p className="text-xs text-text-secondary mt-1">
                                        Fase: <strong className="text-white">Solicitud Información Legal / Ingeniería</strong>
                                        — {permit.documentosFaltantes.length} requerimientos bloquean el avance.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-500 text-[16px]">schedule</span>
                                <span className="text-[11px] font-black text-red-400 uppercase tracking-widest">
                                    Impacto: +{permit.documentosFaltantes.reduce((acc, doc) => Math.max(acc, doc.diasAtraso), 0)} Días Atraso
                                </span>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex flex-col gap-3">
                                {permit.documentosFaltantes.map((doc, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background-dark/50 border border-slate-700/50">
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0"></span>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-white">{doc.nombre}</span>
                                                <span className="text-[10px] text-text-secondary uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[12px]">person</span>
                                                    Responsable: <strong className="text-slate-300">{doc.responsable}</strong>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">
                                                {doc.diasAtraso} días tarde
                                            </span>
                                            <button className="text-[10px] font-bold text-primary hover:text-white uppercase tracking-widest bg-primary/10 hover:bg-primary/30 px-3 py-1.5 rounded transition-colors flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                                                Notificar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Tracking Progress Bar */}
                            <div className="mt-6">
                                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-text-secondary mb-2">
                                    <span>Requerimiento Enviado</span>
                                    <span className="text-orange-400">Recepción Documentos (Retrasado)</span>
                                    <span>Inicio Expediente</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full relative overflow-hidden flex">
                                    <div className="h-full bg-green-500 w-[50%]"></div>
                                    <div className="h-full bg-orange-500 animate-pulse w-[50%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Milestone Timeline Table */}
                <div className="rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden mb-6">
                    <div className="p-5 border-b border-border-dark flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">route</span>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Ruta de Tramitación — Hitos</h3>
                        </div>
                        {/* Legend */}
                        <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                            <span className="flex items-center gap-1 text-green-400">
                                <span className="material-symbols-outlined text-[12px] icon-fill">check_circle</span> Cumplido
                            </span>
                            <span className="flex items-center gap-1 text-yellow-400">
                                <span className="material-symbols-outlined text-[12px] icon-fill">schedule</span> Forecast
                            </span>
                            <span className="flex items-center gap-1 text-text-secondary/40">
                                <span className="w-3 h-3 rounded-full border border-dashed border-current inline-block" /> Pendiente
                            </span>
                        </div>
                    </div>

                    {/* Header row */}
                    <div className="grid grid-cols-4 bg-background-dark/40 border-b border-border-dark">
                        <div className="px-4 py-3">
                            <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Hito</p>
                            <p className="text-[9px] text-text-secondary/40 normal-case font-normal mt-0.5">Etapa del trámite</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">PLAN</p>
                            <p className="text-[9px] text-text-secondary/40 normal-case font-normal mt-0.5">Fecha acordada al inicio</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">FORECAST</p>
                            <p className="text-[9px] text-text-secondary/40 normal-case font-normal mt-0.5">Fecha en la que creemos que sucederá</p>
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">ACTUAL</p>
                            <p className="text-[9px] text-text-secondary/40 normal-case font-normal mt-0.5">Fecha en que realmente ocurrió</p>
                        </div>
                    </div>

                    {/* Milestone rows */}
                    <div>
                        {milestones.map(m => (
                            <MilestoneRow key={m.label} label={m.label} explanation={m.explanation} data={m.data} isApproved={isApproved} />
                        ))}
                    </div>

                    {/* Tiempo Tramitación summary row */}
                    <div className="grid grid-cols-4 text-xs border-t-2 border-primary/20 bg-primary/5">
                        <div className="px-4 py-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[16px]">timer</span>
                            <span className="font-black text-white uppercase tracking-wide text-[11px]">Tiempo Tramitación (días)</span>
                        </div>
                        <div className="px-4 py-4">
                            <span className="text-text-secondary/70 font-mono font-bold">
                                {tramitDays.plan != null ? `${tramitDays.plan}` : '—'}
                            </span>
                        </div>
                        <div className="px-4 py-4">
                            <span className="font-mono text-yellow-400/80">
                                {tramitDays.forecast != null ? `${tramitDays.forecast}` : '—'}
                            </span>
                        </div>
                        <div className="px-4 py-4">
                            <span className={`font-mono font-black ${daysDeviation != null && daysDeviation > 0 ? (isApproved ? 'text-amber-400' : 'text-red-400') : daysDeviation != null ? 'text-green-400' : 'text-text-secondary/40'}`}>
                                {tramitDays.actual != null ? `${tramitDays.actual}` : '—'}
                                {daysDeviation != null && daysDeviation > 0 && <span className={`${isApproved ? 'text-amber-400' : 'text-red-400'} ml-1 text-[10px]`}>(+{daysDeviation})</span>}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Observations / Resolution */}
                {permit.resolucionAprobacion && (
                    <div className="rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden pb-6">
                        <div className="p-5 border-b border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">comment</span>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">
                                {permit.estado === 'APROBADO' ? 'Resolución / Aprobación' : 'Observaciones / Notas Estratégicas'}
                            </h3>
                        </div>
                        <div className="px-6 pt-5">
                            <div className={`rounded-xl p-4 border ${permit.estado === 'APROBADO' ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                {permit.estado === 'APROBADO' ? (
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-green-400 text-[28px] icon-fill shrink-0">verified</span>
                                        <p className="text-sm font-black text-green-400">{permit.resolucionAprobacion}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-text-secondary italic leading-relaxed">{permit.resolucionAprobacion}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default PermitDetail;
