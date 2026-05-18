import { useState, useMemo, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

// ─── Types ─────────────────────────────────────────────────────────────────

interface PermitRisk {
    id: string;
    codigo: string;
    nombre: string;
    autoridad: string;
    gerencia: string;
    diasRestantes: number;
    riesgo: 'Crítico' | 'Alto' | 'Medio';
    recomendacion: string;
}

// ─── Mock data ──────────────────────────────────────────────────────────────

const BUDGET_DATA: Record<string, { totalBudget: number; spent: number; label: string }> = {
    'Todas': { totalBudget: 8_500_000, spent: 5_100_000, label: 'Todas las gerencias' },
    'Mina': { totalBudget: 3_200_000, spent: 1_900_000, label: 'Mina' },
    'Planta de Procesos': { totalBudget: 2_800_000, spent: 1_750_000, label: 'Planta de Procesos' },
    'Sustentabilidad': { totalBudget: 1_500_000, spent: 900_000, label: 'Sustentabilidad' },
    'Infraestructura': { totalBudget: 1_000_000, spent: 550_000, label: 'Infraestructura' },
};

const MOCK_PERMITS: PermitRisk[] = [
    {
        id: '1', codigo: 'GFSM01-PE-POX-00001', nombre: 'Planta de Oxígeno — Operación',
        autoridad: 'Municipalidad', gerencia: 'Mina', diasRestantes: 8,
        riesgo: 'Crítico', recomendacion: 'Coordinar aprobación municipal inmediata. Riesgo de paralización operativa.',
    },
    {
        id: '2', codigo: 'GFSM01-PE-HID-00002', nombre: 'Monitoreo Sistema Hídrico',
        autoridad: 'DGA', gerencia: 'Sustentabilidad', diasRestantes: 17,
        riesgo: 'Alto', recomendacion: 'Presentar informe de avance ante DGA antes del 28 Mar.',
    },
    {
        id: '3', codigo: 'GFSM01-PE-EXP-00003', nombre: 'Método de Explotación — WBS 200',
        autoridad: 'Sernageomin', gerencia: 'Mina', diasRestantes: 24,
        riesgo: 'Alto', recomendacion: 'Verificar documentación técnica. Plazo de respuesta 15 días hábiles.',
    },
    {
        id: '4', codigo: 'GFSM01-PE-FIL-00004', nombre: 'Expansión Planta de Filtros Norte',
        autoridad: 'SEA', gerencia: 'Planta de Procesos', diasRestantes: 29,
        riesgo: 'Medio', recomendacion: 'Iniciar proceso de evaluación ambiental. Tiempo estimado: 45 días.',
    },
    {
        id: '5', codigo: 'GFSM01-PE-ELEa00005', nombre: 'Sistema Eléctrico Planta',
        autoridad: 'SEC', gerencia: 'Infraestructura', diasRestantes: 6,
        riesgo: 'Crítico', recomendacion: 'Contactar SEC urgente. Sin permiso hay riesgo de corte eléctrico programado.',
    },
];

// Generate S-curve base + forecast extension
function generateProjectionCurve(totalBudget: number, spent: number, fineAmount: number) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentMonth = 5; // June (0-indexed)
    const data = [];

    for (let i = 0; i < 12; i++) {
        const planProgress = Math.min(1, ((i + 1) / 12) ** 0.7);
        const plan = Math.round(totalBudget * planProgress);

        let actual: number | null = null;
        let forecast: number | null = null;

        if (i <= currentMonth) {
            const actualProgress = Math.min(1, ((i + 1) / 12) ** 0.85);
            actual = Math.round(spent * (actualProgress / ((currentMonth + 1) / 12) ** 0.85));
        }

        if (i >= currentMonth) {
            // Forecast = project current spend rate forward + fine impact
            const remaining = totalBudget - spent + fineAmount;
            const monthsLeft = 12 - currentMonth;
            const forecastProgress = (i - currentMonth) / monthsLeft;
            forecast = Math.round(spent + remaining * Math.min(1, forecastProgress ** 0.6));
        }

        data.push({ mes: months[i], Planificado: plan, Real: actual, Proyección: forecast });
    }
    return data;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const AgentStatusBadge = ({ analyzing }: { analyzing: boolean }) => (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-500
        ${analyzing
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}
    >
        <span className={`w-1.5 h-1.5 rounded-full ${analyzing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
        {analyzing ? 'Analizando...' : 'Completado'}
    </div>
);

const RiskBadge = ({ riesgo }: { riesgo: PermitRisk['riesgo'] }) => {
    const map = {
        Crítico: 'bg-red-500/15 text-red-400 border-red-500/30',
        Alto: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
        Medio: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${map[riesgo]}`}>
            {riesgo}
        </span>
    );
};

// ─── Main Page ──────────────────────────────────────────────────────────────

const PredictiveAnalysis = () => {
    const [selectedGerencia, setSelectedGerencia] = useState('Todas');
    const [selectedWBS, setSelectedWBS] = useState('Todos');
    const [fineAmount, setFineAmount] = useState(0);
    const [analyzing, setAnalyzing] = useState(false);

    const budget = BUDGET_DATA[selectedGerencia] ?? BUDGET_DATA['Todas'];
    const remaining = budget.totalBudget - budget.spent;
    const remainingAfterFine = remaining - fineAmount;
    const fineImpactPercent = budget.totalBudget > 0
        ? ((fineAmount / budget.totalBudget) * 100).toFixed(1)
        : '0.0';
    const monthsDelayed = fineAmount > 0 ? Math.ceil(fineAmount / (budget.spent / 6)) : 0;

    const projectionCurve = useMemo(
        () => generateProjectionCurve(budget.totalBudget, budget.spent, fineAmount),
        [budget, fineAmount]
    );

    const filteredRisks = useMemo(() => {
        let filtered = MOCK_PERMITS;
        if (selectedGerencia !== 'Todas') {
            filtered = filtered.filter(p => p.gerencia === selectedGerencia);
        }
        // WBS filtering could be added here if MOCK_PERMITS had WBS data
        // For simulation purposes, we just apply the filter logic
        return filtered;
    }, [selectedGerencia, selectedWBS]);

    const criticalCount = filteredRisks.filter(p => p.riesgo === 'Crítico').length;
    const highCount = filteredRisks.filter(p => p.riesgo === 'Alto').length;

    const fmt = (n: number) => `$${(n / 1_000_000).toFixed(2)}M`;

    // Simulate agent "thinking" on filter/fine change
    useEffect(() => {
        setAnalyzing(true);
        const t = setTimeout(() => setAnalyzing(false), 1200);
        return () => clearTimeout(t);
    }, [selectedGerencia, selectedWBS, fineAmount]);

    const selectClass = 'bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none transition-all';

    // Consolidated recommendation
    const recommendation = useMemo(() => {
        const parts: string[] = [];
        if (fineAmount > 0) {
            parts.push(`Una multa de ${fmt(fineAmount)} representaría el ${fineImpactPercent}% del presupuesto total y retrasaría la ejecución aproximadamente ${monthsDelayed} mes(es).`);
            if (remainingAfterFine < 0) {
                parts.push(`⚠️ El presupuesto restante entraría en déficit de ${fmt(Math.abs(remainingAfterFine))}.`);
            }
        }
        if (criticalCount > 0) {
            parts.push(`Existen ${criticalCount} permiso(s) en estado CRÍTICO que requieren acción inmediata para evitar paralizaciones.`);
        }
        if (parts.length === 0) {
            parts.push('Sin multas proyectadas, el escenario presupuestario es estable. Monitore los permisos próximos a vencer para anticipar riesgos.');
        }
        return parts.join(' ');
    }, [fineAmount, fineImpactPercent, monthsDelayed, remainingAfterFine, criticalCount]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white pb-12">
            {/* ── Header ── */}
            <header className="px-4 md:px-8 py-4 md:py-6 pb-4 border-b border-border-dark bg-background-dark sticky top-0 z-10">
                <div className="flex items-center gap-3 mb-5">
                    <span className="material-symbols-outlined text-[32px] text-violet-400">auto_awesome</span>
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">Análisis Predictivo</h2>
                        <p className="text-text-secondary text-xs uppercase tracking-widest mt-1">
                            Proyecciones de impacto presupuestario y riesgo de permisos con IA
                        </p>
                    </div>
                </div>

                {/* Scenario Controls */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    {/* Gerencia */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Gerencia</label>
                        <select
                            value={selectedGerencia}
                            onChange={e => setSelectedGerencia(e.target.value)}
                            className={selectClass}
                        >
                            {Object.keys(BUDGET_DATA).map(g => (
                                <option key={g} value={g} className="bg-[#1e293b]">{g}</option>
                            ))}
                        </select>
                    </div>

                    {/* WBS */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">WBS</label>
                        <select
                            value={selectedWBS}
                            onChange={e => setSelectedWBS(e.target.value)}
                            className={selectClass}
                        >
                            <option value="Todos" className="bg-[#1e293b]">Todos</option>
                            <option value="Operación Mina" className="bg-[#1e293b]">Operación Mina</option>
                            <option value="Planta de Procesos" className="bg-[#1e293b]">Planta de Procesos</option>
                            <option value="Infraestructura" className="bg-[#1e293b]">Infraestructura</option>
                            <option value="Sustentabilidad" className="bg-[#1e293b]">Sustentabilidad</option>
                        </select>
                    </div>

                    {/* Fine slider */}
                    <div className="md:col-span-2 flex flex-col gap-2">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest">
                                Multa Potencial Simulada
                            </label>
                            <span className={`text-sm font-black tabular-nums ${fineAmount > 0 ? 'text-red-400' : 'text-text-secondary/50'}`}>
                                {fineAmount > 0 ? fmt(fineAmount) : 'Sin multa'}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={500_000_000}
                            step={5_000_000}
                            value={fineAmount}
                            onChange={e => setFineAmount(Number(e.target.value))}
                            className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer accent-violet-500"
                        />
                        <div className="flex justify-between text-[9px] text-text-secondary/50 font-bold uppercase tracking-widest">
                            <span>$0</span><span>$250M</span><span>$500M</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 pt-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">

                {/* ── Row 1: Agents 1 & 2 ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* ── AGENT 1 — Fine Impact ── */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-border-dark flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-red-400">gavel</span>
                                <div>
                                    <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Agente 1</p>
                                    <h3 className="text-sm font-black text-white">Impacto de Multa</h3>
                                </div>
                            </div>
                            <AgentStatusBadge analyzing={analyzing} />
                        </div>

                        <div className="p-5 flex flex-col gap-5">
                            {/* Budget bar before */}
                            <div>
                                <div className="flex justify-between text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1.5">
                                    <span>Presupuesto Actual</span>
                                    <span className="text-white">{fmt(budget.totalBudget)}</span>
                                </div>
                                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-sky-500 rounded-full transition-all duration-700"
                                        style={{ width: `${(budget.spent / budget.totalBudget) * 100}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-[9px] text-text-secondary/60 mt-1">
                                    <span>Ejecutado: {fmt(budget.spent)}</span>
                                    <span>Disponible: {fmt(remaining)}</span>
                                </div>
                            </div>

                            {/* Budget bar after fine */}
                            {fineAmount > 0 && (
                                <div>
                                    <div className="flex justify-between text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1.5">
                                        <span>Tras Multa ({fmt(fineAmount)})</span>
                                        <span className={remainingAfterFine < 0 ? 'text-red-400' : 'text-orange-400'}>
                                            {remainingAfterFine < 0 ? `Déficit ${fmt(Math.abs(remainingAfterFine))}` : `Disponible ${fmt(remainingAfterFine)}`}
                                        </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full flex rounded-full overflow-hidden transition-all duration-700">
                                            <div className="h-full bg-sky-500" style={{ width: `${(budget.spent / budget.totalBudget) * 100}%` }} />
                                            <div className="h-full bg-red-500" style={{ width: `${Math.min(100 - (budget.spent / budget.totalBudget) * 100, (fineAmount / budget.totalBudget) * 100)}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-[9px] text-text-secondary/60 mt-1">
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-sky-500 inline-block" /> Ejecutado</span>
                                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Multa</span>
                                    </div>
                                </div>
                            )}

                            {/* KPI chips */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-800/60 rounded-lg p-3 flex flex-col gap-0.5">
                                    <p className="text-[9px] text-text-secondary/60 font-black uppercase tracking-widest">Impacto %</p>
                                    <p className={`text-xl font-black tabular-nums ${fineAmount > 0 ? 'text-red-400' : 'text-text-secondary/30'}`}>
                                        {fineImpactPercent}%
                                    </p>
                                </div>
                                <div className="bg-slate-800/60 rounded-lg p-3 flex flex-col gap-0.5">
                                    <p className="text-[9px] text-text-secondary/60 font-black uppercase tracking-widest">Retraso Est.</p>
                                    <p className={`text-xl font-black tabular-nums ${fineAmount > 0 ? 'text-orange-400' : 'text-text-secondary/30'}`}>
                                        {monthsDelayed} mes{monthsDelayed !== 1 ? 'es' : ''}
                                    </p>
                                </div>
                                <div className="bg-slate-800/60 rounded-lg p-3 flex flex-col gap-0.5">
                                    <p className="text-[9px] text-text-secondary/60 font-black uppercase tracking-widest">Déficit</p>
                                    <p className={`text-xl font-black tabular-nums ${remainingAfterFine < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                        {remainingAfterFine < 0 ? '⚠️ Sí' : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── AGENT 2 — Projection Curve ── */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm flex flex-col overflow-hidden">
                        <div className="p-5 border-b border-border-dark flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-sky-400">trending_up</span>
                                <div>
                                    <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Agente 2</p>
                                    <h3 className="text-sm font-black text-white">Proyección de Cierre</h3>
                                </div>
                            </div>
                            <AgentStatusBadge analyzing={analyzing} />
                        </div>

                        <div className="p-5 flex-1 min-h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={projectionCurve} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="mes" stroke="#94a3b8" fontSize={10} tickMargin={8} />
                                    <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                                        formatter={(v: any) => `$${(v / 1000).toFixed(1)}K`}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                                    <ReferenceLine x="Jun" stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Hoy', fill: '#f59e0b', fontSize: 10 }} />
                                    <Line type="monotone" dataKey="Planificado" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="Real" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 3 }} />
                                    <Line type="monotone" dataKey="Proyección" stroke="#a855f7" strokeWidth={2} strokeDasharray="6 3" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="text-[9px] text-text-secondary/50 font-bold uppercase tracking-widest mt-2 text-center">
                                Línea punteada = proyección IA con multa incorporada
                            </p>
                        </div>
                    </div>
                </div>

                <hr className="border-border-dark" />

                {/* ── AGENT 3 — Risk Alerts ── */}
                <div className="bg-surface-dark border border-border-dark rounded-xl shadow-sm flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-border-dark flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-orange-400">warning</span>
                            <div>
                                <p className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Agente 3</p>
                                <h3 className="text-sm font-black text-white">Alertas de Riesgo — Permisos Próximos a Vencer (≤ 30 días)</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {criticalCount > 0 && (
                                <span className="bg-red-500/15 border border-red-500/30 text-red-400 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    {criticalCount} Crítico{criticalCount !== 1 ? 's' : ''}
                                </span>
                            )}
                            {highCount > 0 && (
                                <span className="bg-orange-500/15 border border-orange-500/30 text-orange-400 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    {highCount} Alto{highCount !== 1 ? 's' : ''}
                                </span>
                            )}
                            <AgentStatusBadge analyzing={analyzing} />
                        </div>
                    </div>

                    {filteredRisks.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#0f172a] text-[9px] font-black text-text-secondary uppercase tracking-widest border-b border-border-dark">
                                    <tr>
                                        <th className="px-5 py-3">Días</th>
                                        <th className="px-5 py-3">Código</th>
                                        <th className="px-5 py-3">Permiso</th>
                                        <th className="px-5 py-3">Autoridad</th>
                                        <th className="px-5 py-3">Riesgo</th>
                                        <th className="px-5 py-3">Recomendación IA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark text-xs">
                                    {filteredRisks
                                        .sort((a, b) => a.diasRestantes - b.diasRestantes)
                                        .map(permit => (
                                            <tr key={permit.id} className={`transition-colors hover:bg-white/5 ${permit.riesgo === 'Crítico' ? 'bg-red-500/5' : ''}`}>
                                                <td className="px-5 py-3">
                                                    <span className={`text-lg font-black tabular-nums ${permit.riesgo === 'Crítico' ? 'text-red-400' : permit.riesgo === 'Alto' ? 'text-orange-400' : 'text-yellow-400'}`}>
                                                        {permit.diasRestantes}d
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 font-mono text-[10px] text-primary/80">{permit.codigo}</td>
                                                <td className="px-5 py-3 font-bold text-white max-w-[180px]">{permit.nombre}</td>
                                                <td className="px-5 py-3 text-text-secondary">{permit.autoridad}</td>
                                                <td className="px-5 py-3"><RiskBadge riesgo={permit.riesgo} /></td>
                                                <td className="px-5 py-3 text-text-secondary/80 text-[10px] max-w-[260px]">{permit.recomendacion}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-12 text-center text-text-secondary/50 text-sm font-bold uppercase tracking-widest">
                            Sin permisos críticos para esta gerencia
                        </div>
                    )}
                </div>

                {/* ── Consolidated Recommendation ── */}
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6 flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-violet-400 text-[22px]">psychology</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[9px] font-black text-violet-400/70 uppercase tracking-widest mb-2">
                            Recomendación Consolidada — IA
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed transition-all duration-500">
                            {analyzing ? (
                                <span className="text-text-secondary/50 animate-pulse">Procesando escenario...</span>
                            ) : recommendation}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PredictiveAnalysis;
