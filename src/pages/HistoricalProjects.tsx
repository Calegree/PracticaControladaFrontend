import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPermits } from '../services/permits';
import type { ApiWBSItem } from '../services/permits';
import type { PermitTramitacion } from '../types/permit';
import { apiFetch } from '../services/api';
import GenericDropdown from '../components/GenericDropdown';

// ─── HistoricalProjects (Obras Finalizadas) ───────────────────────────────────
// Mismo estilo estético que "Obras Activas": filtros con GenericDropdown y
// acordeón por obra. La diferencia es el estado: aquí solo aparecen las obras
// cuyos permisos están TODOS aprobados.

const HistoricalProjects = () => {
    const navigate = useNavigate();
    const [permits, setPermits] = useState<PermitTramitacion[]>([]);
    const [wbsOptions, setWbsOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    useEffect(() => {
        Promise.all([
            fetchPermits(),
            apiFetch<ApiWBSItem[]>('/wbs'),
        ])
            .then(([p, wbs]) => {
                setPermits(p);
                setWbsOptions(wbs.map(i => i.nombre_wbs ?? i.wbs_name).sort());
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const [selectedGerencia, setSelectedGerencia] = useState('Todas');
    const [selectedWBS, setSelectedWBS] = useState('Todos');
    const [selectedAutoridad, setSelectedAutoridad] = useState('Todas');
    const [selectedContratista, setSelectedContratista] = useState('Todos');
    const [searchText, setSearchText] = useState('');

    // Obras totalmente aprobadas (todos sus permisos en estado APROBADO)
    const completedObras = useMemo(() => {
        const map = new Map<string, PermitTramitacion[]>();
        for (const p of permits) {
            const key = p.obraActividad || '(Sin obra/actividad)';
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(p);
        }
        const result: { obraActividad: string; permits: PermitTramitacion[]; first: PermitTramitacion }[] = [];
        map.forEach((perms, obraActividad) => {
            if (perms.length > 0 && perms.every(p => p.estado === 'APROBADO')) {
                result.push({ obraActividad, permits: perms, first: perms[0] });
            }
        });
        return result;
    }, [permits]);

    const gerenciaOptions = useMemo(() =>
        ['Todas', ...Array.from(new Set(completedObras.flatMap(o => o.permits.map(p => p.gerencia)).filter(Boolean))) as string[]],
        [completedObras]
    );
    const autoridadOptions = useMemo(() =>
        ['Todas', ...Array.from(new Set(completedObras.flatMap(o => o.permits.map(p => p.autoridad)).filter(Boolean))) as string[]],
        [completedObras]
    );
    const contratistaOptions = useMemo(() =>
        ['Todos', ...Array.from(new Set(completedObras.flatMap(o => o.permits.map(p => p.contratistaResponsable)).filter(Boolean))) as string[]],
        [completedObras]
    );

    const filteredObras = useMemo(() => {
        return completedObras.filter(({ obraActividad, permits: perms, first }) => {
            const matchGerencia = selectedGerencia === 'Todas' || first.gerencia === selectedGerencia;
            const matchWBS = selectedWBS === 'Todos' || first.wbs === selectedWBS;
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

    const toggleGroup = (key: string) => {
        setExpandedGroups(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando obras finalizadas...
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
                        <h1 className="text-3xl font-black uppercase tracking-tight text-white">Obras y Actividades Finalizadas</h1>
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
                    <GenericDropdown label="Gerencia" value={selectedGerencia} options={gerenciaOptions} onChange={setSelectedGerencia} />
                    <GenericDropdown label="WBS" value={selectedWBS} options={['Todos', ...wbsOptions]} onChange={setSelectedWBS} />
                    <GenericDropdown label="Autoridad" value={selectedAutoridad} options={autoridadOptions} onChange={setSelectedAutoridad} />
                    <GenericDropdown label="Contratista Resp." value={selectedContratista} options={contratistaOptions} onChange={setSelectedContratista} />
                </div>
            </header>

            <div className="px-8 pt-6 flex flex-col gap-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Obras y Actividades Finalizadas</p>
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

                {/* Acordeón agrupado por Obra/Actividad */}
                <div className="flex flex-col gap-2">
                    {filteredObras.length === 0 && (
                        <div className="bg-surface-dark border border-border-dark rounded-xl px-6 py-16 text-center text-text-secondary text-xs italic">
                            No se encontraron obras con todos sus permisos aprobados.
                        </div>
                    )}

                    {filteredObras.map(({ obraActividad, permits: groupPerms, first }) => {
                        const isExpanded = expandedGroups.has(obraActividad);

                        return (
                            <div key={obraActividad} className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm transition-all">
                                {/* ── Group Header ── */}
                                <div
                                    className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                                    onClick={() => toggleGroup(obraActividad)}
                                >
                                    <span className={`material-symbols-outlined text-[20px] text-text-secondary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>

                                    <div className="flex-1 min-w-0">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/project-dashboard/${encodeURIComponent(first.codigoAconex)}`);
                                            }}
                                            className="text-left text-sm font-bold text-white hover:text-primary transition-colors line-clamp-1 w-fit"
                                        >
                                            {obraActividad}
                                        </button>
                                        {first.wbs && (
                                            <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-0.5">{first.wbs}</p>
                                        )}
                                    </div>

                                    <span className="shrink-0 hidden md:inline text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 whitespace-nowrap">
                                        {first.gerencia || '—'}
                                    </span>

                                    {/* Completion progress bar — siempre 100% (obra finalizada) */}
                                    <div className="shrink-0 flex flex-col gap-1.5 w-44">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Cumplimiento</span>
                                            <span className="text-[11px] font-black text-green-400">100%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full rounded-full transition-all duration-500 bg-green-500" style={{ width: '100%' }} />
                                        </div>
                                        <span className="text-[9px] text-text-secondary">{groupPerms.length} de {groupPerms.length} permisos aprobados</span>
                                    </div>
                                </div>

                                {/* ── Expanded: permit rows ── */}
                                {isExpanded && (
                                    <div className="border-t border-border-dark">
                                        <table className="w-full text-left">
                                            <thead className="bg-background-dark/60">
                                                <tr>
                                                    <th className="px-6 py-2.5 text-[9px] font-black uppercase tracking-widest text-text-secondary w-52">Código Aconex</th>
                                                    <th className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-text-secondary">Permiso Aplicable</th>
                                                    <th className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-text-secondary">Origen</th>
                                                    <th className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-text-secondary">Autoridad</th>
                                                    <th className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-text-secondary">Contratista</th>
                                                    <th className="px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-text-secondary text-center">Estado</th>
                                                    <th className="px-4 py-2.5 w-10"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-dark/50">
                                                {groupPerms.map(permit => (
                                                    <tr
                                                        key={permit.codigoAconex}
                                                        className="hover:bg-primary/5 cursor-pointer transition-colors group"
                                                        onClick={() => navigate(`/project-dashboard/${encodeURIComponent(permit.codigoAconex)}`)}
                                                    >
                                                        <td className="px-6 py-3">
                                                            <span className="font-mono text-[11px] text-slate-300">{permit.codigoAconex}</span>
                                                        </td>
                                                        <td className="px-4 py-3 max-w-[220px]">
                                                            <span className="text-[11px] text-white line-clamp-2">{permit.permisoAplicable || '—'}</span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {permit.origenPermiso ? (
                                                                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border whitespace-nowrap ${
                                                                    permit.origenPermiso.toUpperCase().includes('RCA')
                                                                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                                                        : permit.origenPermiso.toUpperCase().includes('GDC')
                                                                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-400'
                                                                        : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                                                                }`}>
                                                                    {permit.origenPermiso.toUpperCase().includes('RCA') ? 'RCA' : permit.origenPermiso.toUpperCase().includes('GDC') ? 'GDC' : permit.origenPermiso}
                                                                </span>
                                                            ) : (
                                                                <span className="text-[11px] text-text-secondary/40">—</span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-[11px] font-bold text-primary/80 whitespace-nowrap">{permit.autoridad || '—'}</span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="text-[11px] text-slate-400 whitespace-nowrap">{permit.contratistaResponsable || '—'}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wide whitespace-nowrap bg-green-500/10 text-green-400 border-green-500/30">
                                                                {permit.estado}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className="material-symbols-outlined text-[18px] text-text-secondary group-hover:text-primary transition-colors">chevron_right</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HistoricalProjects;
