import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPermits } from '../services/permits';
import type { PermitTramitacion } from '../types/permit';

const WBS_GROUPS = [
    { value: 'Todos', label: 'Todos', area: null, subItems: [] },
    { value: 'Operación Mina', label: 'Operación Mina', area: 'Área 1', subItems: ['Perforación', 'Tronadura', 'Carguío', 'Transporte'] },
    { value: 'Planta de Procesos', label: 'Planta de Procesos', area: 'Área 2', subItems: ['Chancado', 'Molienda', 'Flotación', 'Espesamiento'] },
    { value: 'Infraestructura', label: 'Infraestructura', area: 'Área 3', subItems: ['Sistema eléctrico', 'Sistema de agua'] },
    { value: 'Sustentabilidad', label: 'Sustentabilidad', area: 'Área 4', subItems: ['Manejo de relaves', 'Monitoreo ambiental'] },
    { value: 'Mantenimiento', label: 'Mantenimiento', area: 'Área 5', subItems: ['Mantención equipos'] },
];

const WbsDropdown = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selected = WBS_GROUPS.find(g => g.value === value) ?? WBS_GROUPS[0];

    return (
        <div className="flex flex-col gap-1 relative" ref={containerRef}>
            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">WBS</label>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                onBlur={(e) => { if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
                className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none transition-all shadow-sm w-full flex items-center justify-between gap-2 hover:border-primary/60"
            >
                <span className="truncate">{selected.label}</span>
                <span className="material-symbols-outlined text-[14px] text-text-secondary">expand_more</span>
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-[#1a1f2e] border border-border-dark rounded-xl shadow-2xl z-50 overflow-visible">
                    {WBS_GROUPS.map((group) => (
                        <div key={group.value} className="relative">
                            <button
                                type="button"
                                className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors flex items-center justify-between gap-2
                                    ${value === group.value ? 'bg-primary/20 text-primary' : 'text-white hover:bg-white/5'}`}
                                onClick={() => { onChange(group.value); setOpen(false); }}
                            >
                                <span>{group.label}</span>
                                {group.subItems.length > 0 && (
                                    <span className="relative group/info flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                        <span className="material-symbols-outlined text-[14px] text-text-secondary/60 hover:text-primary cursor-help transition-colors">info</span>
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-52 bg-[#131826] border border-primary/20 rounded-xl shadow-2xl z-50 p-3 pointer-events-none
                                            opacity-0 group-hover/info:opacity-100 transition-opacity duration-150">
                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-0.5">{group.area} — {group.label}</p>
                                            <p className="text-[8px] font-black text-text-secondary/50 uppercase tracking-widest mb-2">(WBS)</p>
                                            <ul className="flex flex-col gap-1">
                                                {group.subItems.map(item => (
                                                    <li key={item} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                                                        <span className="w-1 h-1 rounded-full bg-primary/50 inline-block flex-shrink-0"></span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </span>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const selectClass = "bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none transition-all shadow-sm w-full";
const optClass = "bg-[#1e293b] text-white";

const HistoricalProjects = () => {
    const navigate = useNavigate();
    const [permits, setPermits] = useState<PermitTramitacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedObras, setExpandedObras] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchPermits()
            .then(setPermits)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const [selectedGerencia, setSelectedGerencia] = useState('Todas');
    const [selectedWBS, setSelectedWBS] = useState('Todos');
    const [selectedAutoridad, setSelectedAutoridad] = useState('Todas');
    const [selectedContratista, setSelectedContratista] = useState('Todos');
    const [searchText, setSearchText] = useState('');

    const autoridadOptions = useMemo(() => ['Todas', ...Array.from(new Set(permits.map(p => p.autoridad).filter(Boolean)))], [permits]);
    const contratistaOptions = useMemo(() => ['Todos', ...Array.from(new Set(permits.map(p => p.contratistaResponsable).filter(Boolean)))], [permits]);

    // Group ALL permits by obraActividad
    const allPermitsByObra = useMemo(() => {
        const map = new Map<string, PermitTramitacion[]>();
        for (const p of permits) {
            const arr = map.get(p.obraActividad) ?? [];
            arr.push(p);
            map.set(p.obraActividad, arr);
        }
        return map;
    }, [permits]);

    // Only obras where every permit is APROBADO
    const completedObras = useMemo(() => {
        const result: { obraActividad: string; permits: PermitTramitacion[] }[] = [];
        allPermitsByObra.forEach((perms, obraActividad) => {
            if (perms.length > 0 && perms.every(p => p.estado === 'APROBADO')) {
                result.push({ obraActividad, permits: perms });
            }
        });
        return result;
    }, [allPermitsByObra]);

    // Apply filters at obra level
    const filteredObras = useMemo(() => {
        return completedObras.filter(({ obraActividad, permits: perms }) => {
            const rep = perms[0];
            const matchGerencia = selectedGerencia === 'Todas' || rep.gerencia === selectedGerencia;
            const matchWBS = selectedWBS === 'Todos' || rep.wbs === selectedWBS;
            const matchAutoridad = selectedAutoridad === 'Todas' || perms.some(p => p.autoridad === selectedAutoridad);
            const matchContratista = selectedContratista === 'Todos' || perms.some(p => p.contratistaResponsable === selectedContratista);
            const matchSearch = searchText === '' ||
                obraActividad.toLowerCase().includes(searchText.toLowerCase()) ||
                perms.some(p => p.codigoAconex.toLowerCase().includes(searchText.toLowerCase()));
            return matchGerencia && matchWBS && matchAutoridad && matchContratista && matchSearch;
        });
    }, [completedObras, selectedGerencia, selectedWBS, selectedAutoridad, selectedContratista, searchText]);

    const totalPermisosAprobados = useMemo(() =>
        filteredObras.reduce((sum, o) => sum + o.permits.length, 0),
        [filteredObras]
    );

    const toggleObra = (obraActividad: string) => {
        setExpandedObras(prev => {
            const next = new Set(prev);
            if (next.has(obraActividad)) next.delete(obraActividad);
            else next.add(obraActividad);
            return next;
        });
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando obras aprobadas...
        </div>
    );
    if (error) return (
        <div className="flex-1 flex items-center justify-center text-red-400 text-sm">
            <span className="material-symbols-outlined mr-2">error</span> Error: {error}
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full bg-background-dark overflow-y-auto text-white pb-12">
            <header className="px-8 py-6 pb-4 border-b border-border-dark bg-background-dark sticky top-0 z-10">
                <div className="flex items-center gap-3 mb-5">
                    <span className="material-symbols-outlined text-[32px] text-green-400">verified</span>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white">Obras y Actividades Aprobadas</h1>
                        <p className="text-text-secondary text-xs uppercase tracking-widest mt-1">Obras y actividades que tienen todos sus permisos aprobados.</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    <div className="flex flex-col gap-1 md:col-span-1">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Buscar</label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[15px] text-text-secondary/50">search</span>
                            <input
                                type="text"
                                placeholder="Obra o código..."
                                value={searchText}
                                onChange={e => setSearchText(e.target.value)}
                                className="bg-surface border border-border-dark text-white rounded-lg pl-8 pr-3 py-2 text-xs outline-none transition-all shadow-sm w-full focus:border-primary/60 placeholder:text-text-secondary/40"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Gerencia</label>
                        <select value={selectedGerencia} onChange={e => setSelectedGerencia(e.target.value)} className={selectClass}>
                            <option value="Todas" className={optClass}>Todas</option>
                            <option value="Mina" className={optClass}>Mina</option>
                            <option value="Planta de Procesos" className={optClass}>Planta de Procesos</option>
                            <option value="Sustentabilidad" className={optClass}>Sustentabilidad</option>
                        </select>
                    </div>

                    <WbsDropdown value={selectedWBS} onChange={setSelectedWBS} />

                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Autoridad</label>
                        <select value={selectedAutoridad} onChange={e => setSelectedAutoridad(e.target.value)} className={selectClass}>
                            {autoridadOptions.map(a => (
                                <option key={a} value={a} className={optClass}>{a}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Contratista Resp.</label>
                        <select value={selectedContratista} onChange={e => setSelectedContratista(e.target.value)} className={selectClass}>
                            {contratistaOptions.map(c => (
                                <option key={c} value={c} className={optClass}>{c}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            <div className="px-8 pt-6 flex flex-col gap-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Obras y Actividades Aprobadas</p>
                        <p className="text-3xl font-black mt-2 text-green-400">{filteredObras.length}</p>
                        <p className="text-[9px] text-text-secondary mt-1 uppercase">100% de permisos aprobados</p>
                    </div>
                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Total Permisos Aprobados</p>
                        <p className="text-3xl font-black mt-2 text-white">{totalPermisosAprobados}</p>
                        <p className="text-[9px] text-text-secondary mt-1 uppercase">Permisos</p>
                    </div>
                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Promedio Permisos / Obra</p>
                        <p className="text-3xl font-black mt-2 text-slate-300">
                            {filteredObras.length > 0 ? (totalPermisosAprobados / filteredObras.length).toFixed(1) : '—'}
                        </p>
                        <p className="text-[9px] text-text-secondary mt-1 uppercase">Permisos por obra</p>
                    </div>
                </div>

                {/* Obras Table */}
                <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-display">
                            <thead className="bg-[#1e293b] text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Obra / Actividad</th>
                                    <th className="px-6 py-4">Gerencia</th>
                                    <th className="px-6 py-4">WBS</th>
                                    <th className="px-6 py-4 text-center">Permisos</th>
                                    <th className="px-6 py-4 text-center">Cumplimiento</th>
                                    <th className="px-6 py-4 text-center w-14"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {filteredObras.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center text-text-secondary text-xs italic">
                                            No se encontraron obras con todos sus permisos aprobados.
                                        </td>
                                    </tr>
                                )}
                                {filteredObras.map(({ obraActividad, permits: obraPerms }) => {
                                    const isExpanded = expandedObras.has(obraActividad);
                                    const rep = obraPerms[0];
                                    return (
                                        <>
                                            {/* Obra header row */}
                                            <tr
                                                key={obraActividad}
                                                className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                                                onClick={() => toggleObra(obraActividad)}
                                            >
                                                <td className="px-6 py-4 max-w-[300px]">
                                                    <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug line-clamp-2">{obraActividad}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 whitespace-nowrap">{rep.gerencia || '—'}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[10px] text-text-secondary uppercase tracking-widest">{rep.wbs || '—'}</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="text-sm font-black text-green-400">{obraPerms.length}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 min-w-[120px]">
                                                        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                            <div className="h-full rounded-full bg-green-500" style={{ width: '100%' }} />
                                                        </div>
                                                        <span className="text-[10px] font-black text-green-400 whitespace-nowrap">100%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`material-symbols-outlined text-text-secondary group-hover:text-white transition-all text-[20px] ${isExpanded ? 'rotate-90' : ''}`}>
                                                        chevron_right
                                                    </span>
                                                </td>
                                            </tr>

                                            {/* Expanded permits */}
                                            {isExpanded && obraPerms.map(permit => (
                                                <tr
                                                    key={permit.id}
                                                    className="bg-[#0f1624] hover:bg-slate-800/30 transition-colors cursor-pointer group/permit"
                                                    onClick={() => navigate(`/project-dashboard/${encodeURIComponent(permit.codigoAconex)}`)}
                                                >
                                                    <td className="pl-14 pr-6 py-3" colSpan={1}>
                                                        <span className="text-xs font-mono font-medium text-slate-400 whitespace-nowrap">{permit.codigoAconex}</span>
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap">{permit.autoridad}</span>
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <span className="text-[11px] text-slate-500 whitespace-nowrap">{permit.contratistaResponsable}</span>
                                                    </td>
                                                    <td className="px-6 py-3 text-center">
                                                        <span className="text-[11px] font-bold tracking-widest text-text-secondary whitespace-nowrap">
                                                            {permit.aprobacion.forecast ?? permit.aprobacion.plan ?? '—'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 text-center">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase border whitespace-nowrap bg-green-500/10 text-green-400 border-green-500/30">
                                                            APROBADO
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 text-center">
                                                        <span className="material-symbols-outlined text-text-secondary group-hover/permit:text-white transition-colors text-[18px]">
                                                            chevron_right
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoricalProjects;
