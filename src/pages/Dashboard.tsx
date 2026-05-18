import { useState, useMemo, useRef, useEffect } from 'react';
import { fetchPermits } from '../services/permits';
import type { ApiWBSItem } from '../services/permits';
import type { PermitTramitacion } from '../types/permit';
import { apiFetch } from '../services/api';

function buildWBSOptions(wbsItems: ApiWBSItem[]): string[] {
    return wbsItems.map(i => i.nombre_wbs ?? i.wbs_name).sort();
}
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

// ─── Generic Dropdown ─────────────────────────────────────────────────────────

const GenericDropdown = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col gap-1 relative" ref={containerRef}>
            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">{label}</label>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                onBlur={(e) => { if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
                className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none transition-all shadow-sm w-full flex items-center justify-between gap-2 hover:border-primary/60"
            >
                <span className="truncate">{value}</span>
                <span className="material-symbols-outlined text-[14px] text-text-secondary">expand_more</span>
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-[#1a1f2e] border border-border-dark rounded-xl shadow-2xl z-50 overflow-hidden max-h-[300px] overflow-y-auto">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors
                                ${value === opt ? 'bg-primary/20 text-primary' : 'text-white hover:bg-white/5'}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTHS_ORDER = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function dateToMonthKey(display: string | null): string | null {
    if (!display) return null;
    const parts = display.split('/');
    if (parts.length !== 3) return null;
    const [, mon, yy] = parts;
    const monthIdx = MONTHS_ORDER.indexOf(mon);
    if (monthIdx === -1) return null;
    const year = 2000 + parseInt(yy);
    return `${year}-${String(monthIdx + 1).padStart(2, '0')}`;
}

function monthKeyToLabel(key: string): string {
    const [year, month] = key.split('-');
    return `${MONTHS_ORDER[parseInt(month) - 1]}/${year.slice(2)}`;
}

// ─── DonutWidget ─────────────────────────────────────────────────────────────

const DonutWidget = ({ total, count, colorClass, label, ringColor }: { total: number; count: number; colorClass: string; label: string; ringColor: string }) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="bg-surface-dark border border-border-dark p-6 rounded-xl flex flex-col items-center justify-center flex-1 shadow-sm">
            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="64" cy="64" r="36" stroke="currentColor" strokeWidth="8" fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className={`transition-all duration-1000 ease-out ${ringColor}`}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-4xl font-black ${colorClass}`}>{count}</span>
                </div>
            </div>
            <h3 className="text-[11px] font-black uppercase tracking-widest text-white text-center">{label}</h3>
            <p className="text-[10px] text-text-secondary/60 mt-1 uppercase tracking-widest">
                {percentage.toFixed(0)}% del total
            </p>
        </div>
    );
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = () => {
    const [permits, setPermits] = useState<PermitTramitacion[]>([]);
    const [wbsOptions, setWbsOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedGerencia, setSelectedGerencia] = useState('Todas');
    const [selectedWBS, setSelectedWBS] = useState('Todos');
    const [selectedObraActividad, setSelectedObraActividad] = useState('Todas');
    const [selectedAutoridad, setSelectedAutoridad] = useState('Todas');
    const [selectedContratista, setSelectedContratista] = useState('Todos');

    useEffect(() => {
        Promise.all([
            fetchPermits(),
            apiFetch<ApiWBSItem[]>('/wbs'),
        ])
            .then(([p, wbs]) => {
                setPermits(p);
                setWbsOptions(buildWBSOptions(wbs));
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    // Dynamic filter options from real data
    const gerenciaOptions = useMemo(() =>
        ['Todas', ...Array.from(new Set(permits.map(p => p.gerencia).filter(Boolean))) as string[]],
        [permits]
    );
    const autoridadOptions = useMemo(() =>
        ['Todas', ...Array.from(new Set(permits.map(p => p.autoridad).filter(Boolean))) as string[]],
        [permits]
    );
    const contratistaOptions = useMemo(() =>
        ['Todos', ...Array.from(new Set(permits.map(p => p.contratistaResponsable).filter(Boolean))) as string[]],
        [permits]
    );
    const obraActividadOptions = useMemo(() =>
        ['Todas', ...Array.from(new Set(permits.map(p => p.obraActividad).filter(Boolean))).sort() as string[]],
        [permits]
    );

    const filteredPermits = useMemo(() => {
        return permits.filter(p => {
            const matchGerencia = selectedGerencia === 'Todas' || p.gerencia === selectedGerencia;
            const matchWBS = selectedWBS === 'Todos' || p.wbs === selectedWBS;
            const matchObraActividad = selectedObraActividad === 'Todas' || p.obraActividad === selectedObraActividad;
            const matchAutoridad = selectedAutoridad === 'Todas' || p.autoridad === selectedAutoridad;
            const matchContratista = selectedContratista === 'Todos' || p.contratistaResponsable === selectedContratista;
            return matchGerencia && matchWBS && matchObraActividad && matchAutoridad && matchContratista;
        });
    }, [permits, selectedGerencia, selectedWBS, selectedObraActividad, selectedAutoridad, selectedContratista]);

    const totalCount = filteredPermits.length;
    const finishedCount = filteredPermits.filter(p => p.estado === 'APROBADO').length;
    const inProcessCount = filteredPermits.filter(p => p.estado === 'EN ELABORACIÓN' || p.estado === 'EN REVISIÓN').length;
    const pendingCount = filteredPermits.filter(p => p.estado === 'NO INICIADO').length;

    // Cumulative approval curve: plan vs forecast vs actual per month
    const approvalCurve = useMemo(() => {
        const monthsSet = new Set<string>();
        filteredPermits.forEach(p => {
            const pk = dateToMonthKey(p.aprobacion.plan);
            const fk = dateToMonthKey(p.aprobacion.forecast);
            const ak = dateToMonthKey(p.aprobacion.actual);
            if (pk) monthsSet.add(pk);
            if (fk) monthsSet.add(fk);
            if (ak) monthsSet.add(ak);
        });
        if (monthsSet.size === 0) return [];

        const sortedMonths = Array.from(monthsSet).sort();

        // Last month that has at least one actual date (to avoid flat line beyond real data)
        const lastActualKey = sortedMonths.reduce<string | null>((max, m) => {
            const hasActual = filteredPermits.some(p => {
                const ak = dateToMonthKey(p.aprobacion.actual);
                return ak !== null && ak <= m;
            });
            return hasActual ? m : max;
        }, null);

        return sortedMonths.map((month, idx) => {
            let planCumul = 0;
            let forecastCumul = 0;
            let actualCumul = 0;
            let hasAnyActual = false;
            filteredPermits.forEach(p => {
                const pk = dateToMonthKey(p.aprobacion.plan);
                const fk = dateToMonthKey(p.aprobacion.forecast);
                const ak = dateToMonthKey(p.aprobacion.actual);
                if (pk && pk <= sortedMonths[idx]) planCumul++;
                if (fk && fk <= sortedMonths[idx]) forecastCumul++;
                if (ak) { hasAnyActual = true; if (ak <= sortedMonths[idx]) actualCumul++; }
            });
            return {
                name: monthKeyToLabel(month),
                Plan: planCumul,
                Forecast: forecastCumul,
                ...(hasAnyActual && month <= (lastActualKey ?? '') ? { Actual: actualCumul } : {}),
            };
        });
    }, [filteredPermits]);

    // Contratista breakdown table
    const contratistaBreakdown = useMemo(() => {
        const map = new Map<string, { total: number; aprobados: number; en_proceso: number; pendientes: number }>();
        filteredPermits.forEach(p => {
            const key = p.contratistaResponsable || 'SIN CONTRATISTA';
            if (!map.has(key)) map.set(key, { total: 0, aprobados: 0, en_proceso: 0, pendientes: 0 });
            const entry = map.get(key)!;
            entry.total++;
            if (p.estado === 'APROBADO') entry.aprobados++;
            else if (p.estado === 'EN ELABORACIÓN' || p.estado === 'EN REVISIÓN') entry.en_proceso++;
            else entry.pendientes++;
        });
        return Array.from(map.entries())
            .map(([contratista, stats]) => ({ contratista, ...stats }))
            .sort((a, b) => b.total - a.total);
    }, [filteredPermits]);

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando dashboard...
        </div>
    );
    if (error) return (
        <div className="flex-1 flex items-center justify-center text-red-400 text-sm">
            <span className="material-symbols-outlined mr-2">error</span> Error: {error}
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white pb-12">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-4 border-b border-border-dark bg-background-dark sticky top-0 z-10">
                <div className="flex items-center gap-3 mb-5">
                    <span className="material-symbols-outlined text-[32px] text-primary">pie_chart</span>
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">Dashboard General</h2>
                        <p className="text-text-secondary text-xs uppercase tracking-widest mt-1">Visión Consolidada de Proyectos y Presupuestos</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <GenericDropdown
                        label="Gerencia"
                        value={selectedGerencia}
                        options={gerenciaOptions}
                        onChange={setSelectedGerencia}
                    />
                    <GenericDropdown
                        label="WBS"
                        value={selectedWBS}
                        options={['Todos', ...wbsOptions]}
                        onChange={setSelectedWBS}
                    />
                    <GenericDropdown
                        label="Obra / Actividad"
                        value={selectedObraActividad}
                        options={obraActividadOptions}
                        onChange={setSelectedObraActividad}
                    />
                    <GenericDropdown
                        label="Autoridad"
                        value={selectedAutoridad}
                        options={autoridadOptions}
                        onChange={setSelectedAutoridad}
                    />
                    <GenericDropdown
                        label="Contratista Resp."
                        value={selectedContratista}
                        options={contratistaOptions}
                        onChange={setSelectedContratista}
                    />
                </div>
            </header>

            <div className="px-4 md:px-8 pt-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
                {/* SECTION 1: PROJECT OVERVIEW (DONUTS) */}
                <section>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-[18px] text-text-secondary">folder_special</span>
                        <h2 className="text-sm font-black uppercase tracking-widest text-text-secondary">Estado Global de Permisos ({totalCount})</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <DonutWidget
                            total={totalCount}
                            count={finishedCount}
                            colorClass="text-green-400"
                            label="Permisos Aprobados"
                            ringColor="text-green-500"
                        />
                        <DonutWidget
                            total={totalCount}
                            count={inProcessCount}
                            colorClass="text-yellow-400"
                            label="En Proceso (Elaboración / Revisión)"
                            ringColor="text-yellow-500"
                        />
                        <DonutWidget
                            total={totalCount}
                            count={pendingCount}
                            colorClass="text-slate-400"
                            label="No Iniciados"
                            ringColor="text-slate-500"
                        />
                    </div>
                </section>

                <hr className="border-border-dark" />

                {/* SECTION 2: APPROVAL CURVE & CONTRATISTA BREAKDOWN */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-[18px] text-primary">timeline</span>
                        <h2 className="text-sm font-black uppercase tracking-widest text-text-secondary">Seguimiento de Aprobaciones</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* APPROVAL S-CURVE */}
                        <div className="bg-surface-dark border border-border-dark p-6 rounded-xl shadow-sm flex flex-col h-[400px]">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white mt-1 mb-6">Curva Acumulada de Aprobaciones (Plan vs Forecast vs Actual)</h3>
                            <div className="flex-1 w-full h-full min-h-[250px] relative">
                                {approvalCurve.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={approvalCurve} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickMargin={10} />
                                            <YAxis stroke="#94a3b8" fontSize={11} />
                                            <RechartsTooltip
                                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px' }}
                                                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                            />
                                            <Legend wrapperStyle={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                                            <Line type="monotone" dataKey="Plan" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="Forecast" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="Actual" stroke="#22c55e" strokeWidth={3} dot={false} activeDot={{ r: 6 }} connectNulls={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-text-secondary/50 text-sm font-bold uppercase tracking-widest">
                                        Sin datos de aprobación para esta selección
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CONTRATISTA BREAKDOWN TABLE */}
                        <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm flex flex-col overflow-hidden h-[400px]">
                            <div className="p-6 border-b border-border-dark bg-[#1e293b]/50">
                                <h3 className="text-xs font-black uppercase tracking-widest text-white mt-1">Estado por Contratista Responsable</h3>
                            </div>
                            <div className="overflow-auto flex-1">
                                <table className="w-full text-left border-collapse relative">
                                    <thead className="bg-[#0f172a] text-[9px] font-black text-text-secondary uppercase tracking-widest border-b border-border-dark sticky top-0 z-10">
                                        <tr>
                                            <th className="px-4 py-3">Contratista</th>
                                            <th className="px-4 py-3 text-right">Total</th>
                                            <th className="px-4 py-3 text-right">No Iniciados</th>
                                            <th className="px-4 py-3 text-right">En Proceso</th>
                                            <th className="px-4 py-3 text-right">Aprobados</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border-dark text-[11px] font-mono">
                                        {contratistaBreakdown.length > 0 ? (
                                            contratistaBreakdown.map((row) => (
                                                <tr key={row.contratista} className="hover:bg-slate-800/50 transition-colors text-slate-300">
                                                    <td className="px-4 py-3 font-sans font-bold text-white max-w-[140px] truncate">{row.contratista}</td>
                                                    <td className="px-4 py-3 text-right text-white font-bold">{row.total}</td>
                                                    <td className="px-4 py-3 text-right text-slate-400">{row.pendientes}</td>
                                                    <td className="px-4 py-3 text-right text-yellow-400">{row.en_proceso}</td>
                                                    <td className="px-4 py-3 text-right text-green-400">{row.aprobados}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-8 text-center text-text-secondary/50 font-sans font-bold uppercase tracking-widest">
                                                    Sin datos
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
