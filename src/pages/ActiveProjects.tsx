import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPermits } from '../services/permits';
import type { ApiWBSItem } from '../services/permits';
import type { PermitTramitacion, PermitEstado } from '../types/permit';
import { apiFetch, listObras, createObra, linkPermitToObra, deleteObra, createPermit } from '../services/api';
import type { Obra } from '../services/api';
import GenericDropdown from '../components/GenericDropdown';
import PermitFields, { EMPTY_PERMIT } from '../components/PermitFields';
import type { PermitFieldsValue } from '../components/PermitFields';

const estadoStyles: Record<PermitEstado, string> = {
    'NO INICIADO':   'bg-slate-500/10 text-slate-400 border-slate-500/30',
    'EN ELABORACIÓN':'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'EN REVISIÓN':   'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'APROBADO':      'bg-green-500/10 text-green-400 border-green-500/30',
    'RECHAZADO':     'bg-red-500/10 text-red-400 border-red-500/30',
};


const ESTADO_ORDER: Record<string, number> = {
    'EN ELABORACIÓN': 0,
    'EN REVISIÓN':    1,
    'NO INICIADO':    2,
    'RECHAZADO':      3,
    'APROBADO':       4,
};

// ─── ActiveProjects ───────────────────────────────────────────────────────────

type EstadoFilter = 'Todos' | 'CON_PARCIALES' | 'SIN_APROBADOS';

const ActiveProjects = () => {
    const navigate = useNavigate();
    const [permits, setPermits] = useState<PermitTramitacion[]>([]);
    const [wbsOptions, setWbsOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    // Obras creadas manualmente sin permisos aún
    const [obrasVacias, setObrasVacias] = useState<Obra[]>([]);
    const [showCreateObra, setShowCreateObra] = useState(false);
    const [nuevaObra, setNuevaObra] = useState({ nombre: '', gerencia: '', wbs_label: '' });
    const [creandoObra, setCreandoObra] = useState(false);
    const [crearMsg, setCrearMsg] = useState<string | null>(null);
    // Crear permisos dentro de la obra (opcional, varios)
    const [crearConPermiso, setCrearConPermiso] = useState(false);
    const [permisosNuevos, setPermisosNuevos] = useState<PermitFieldsValue[]>([]);
    // Modal "Agregar permiso" a una obra del listado
    const [addPermitTo, setAddPermitTo] = useState<{ obra_actividad: string; gerencia?: string; wbs_label?: string } | null>(null);
    const [addPermitValue, setAddPermitValue] = useState<PermitFieldsValue>(EMPTY_PERMIT);
    const [addingPermit, setAddingPermit] = useState(false);
    const [addPermitMsg, setAddPermitMsg] = useState<string | null>(null);
    const [linkObra, setLinkObra] = useState<Obra | null>(null);
    const [linkCodigo, setLinkCodigo] = useState('');
    const [linkMsg, setLinkMsg] = useState<string | null>(null);

    const refreshDatos = () => {
        return Promise.all([fetchPermits(), listObras(true)])
            .then(([p, obras]) => { setPermits(p); setObrasVacias(obras); });
    };

    useEffect(() => {
        Promise.all([
            fetchPermits(),
            apiFetch<ApiWBSItem[]>('/wbs'),
            listObras(true),
        ])
            .then(([p, wbs, obras]) => {
                setPermits(p);
                setWbsOptions(wbs.map(i => i.nombre_wbs ?? i.wbs_name).sort());
                setObrasVacias(obras);
            })
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const resetCrearObra = () => {
        setNuevaObra({ nombre: '', gerencia: '', wbs_label: '' });
        setPermisosNuevos([]);
        setCrearConPermiso(false);
        setCrearMsg(null);
    };

    const permitPayload = (p: PermitFieldsValue, obra: { nombre: string; gerencia?: string; wbs_label?: string }) => ({
        codigo_aconex: p.codigo_aconex.trim(),
        obra_actividad: obra.nombre,
        gerencia: obra.gerencia || undefined,
        wbs_label: obra.wbs_label || undefined,
        tipo_permiso: p.tipo_permiso.trim() || undefined,
        permiso_aplicable: p.permiso_aplicable.trim() || undefined,
        autoridad: p.autoridad || undefined,
        contratista_responsable: p.contratista_responsable || undefined,
        origen_permiso: p.origen_permiso || undefined,
        estado: p.estado || undefined,
        macrozona: p.macrozona.trim() || undefined,
    });

    const handleCreateObra = async () => {
        if (!nuevaObra.nombre.trim()) return;
        const permisos = crearConPermiso ? permisosNuevos.filter(p => p.codigo_aconex.trim()) : [];
        if (crearConPermiso && permisosNuevos.length > 0 && permisos.length === 0) {
            setCrearMsg('Cada permiso necesita un código Aconex.');
            return;
        }
        setCreandoObra(true);
        setCrearMsg(null);
        try {
            const obra = await createObra({
                nombre: nuevaObra.nombre.trim(),
                gerencia: nuevaObra.gerencia.trim() || undefined,
                wbs_label: nuevaObra.wbs_label.trim() || undefined,
            });
            for (const p of permisos) {
                await createPermit(permitPayload(p, { nombre: obra.nombre, gerencia: obra.gerencia ?? undefined, wbs_label: obra.wbs_label ?? undefined }));
            }
            await refreshDatos();
            setShowCreateObra(false);
            resetCrearObra();
        } catch (e: unknown) {
            setCrearMsg(e instanceof Error ? e.message : String(e));
        } finally {
            setCreandoObra(false);
        }
    };

    const handleAddPermitToObra = async () => {
        if (!addPermitTo) return;
        if (!addPermitValue.codigo_aconex.trim()) {
            setAddPermitMsg('El código Aconex es obligatorio.');
            return;
        }
        setAddingPermit(true);
        setAddPermitMsg(null);
        try {
            await createPermit(permitPayload(addPermitValue, { nombre: addPermitTo.obra_actividad, gerencia: addPermitTo.gerencia, wbs_label: addPermitTo.wbs_label }));
            await refreshDatos();
            setAddPermitTo(null);
            setAddPermitValue(EMPTY_PERMIT);
        } catch (e: unknown) {
            setAddPermitMsg(e instanceof Error ? e.message : String(e));
        } finally {
            setAddingPermit(false);
        }
    };

    const handleLinkPermit = async () => {
        if (!linkObra || !linkCodigo.trim()) return;
        setLinkMsg(null);
        try {
            await linkPermitToObra(linkObra.id, linkCodigo.trim());
            await refreshDatos();
            setLinkObra(null);
            setLinkCodigo('');
        } catch (e: unknown) {
            setLinkMsg(e instanceof Error ? e.message : String(e));
        }
    };

    const handleDeleteObra = async (id: number) => {
        try {
            await deleteObra(id);
            setObrasVacias(prev => prev.filter(o => o.id !== id));
        } catch (e) {
            console.error('Error al eliminar obra', e);
        }
    };

    const [selectedGerencia, setSelectedGerencia] = useState('Todas');
    const [selectedWBS, setSelectedWBS] = useState('Todos');
    const [selectedAutoridad, setSelectedAutoridad] = useState('Todas');
    const [selectedContratista, setSelectedContratista] = useState('Todos');
    const [searchText, setSearchText] = useState('');
    const [selectedEstado, setSelectedEstado] = useState<EstadoFilter>('Todos');

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

    // Base permits: exclude APROBADO + apply all filters except estado card
    const basePermits = useMemo(() => {
        return permits
            .filter(p => p.estado !== 'APROBADO')
            .filter(p => {
                const matchGerencia = selectedGerencia === 'Todas' || p.gerencia === selectedGerencia;
                const matchWBS = selectedWBS === 'Todos' || p.wbs === selectedWBS;
                const matchAutoridad = selectedAutoridad === 'Todas' || p.autoridad === selectedAutoridad;
                const matchContratista = selectedContratista === 'Todos' || p.contratistaResponsable === selectedContratista;
                const matchSearch = searchText === '' ||
                    p.obraActividad.toLowerCase().includes(searchText.toLowerCase()) ||
                    p.codigoAconex.toLowerCase().includes(searchText.toLowerCase());
                return matchGerencia && matchWBS && matchAutoridad && matchContratista && matchSearch;
            });
    }, [permits, selectedGerencia, selectedWBS, selectedAutoridad, selectedContratista, searchText]);

    // All permits (including APROBADO) grouped by obra — for expanded table rows
    const allPermitsByObra = useMemo(() => {
        const map = new Map<string, PermitTramitacion[]>();
        for (const p of permits) {
            const key = p.obraActividad || '(Sin obra/actividad)';
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(p);
        }
        return map;
    }, [permits]);

    // Completion % per obra using ALL permits (including APROBADO)
    const obraCompletionMap = useMemo(() => {
        const map = new Map<string, { total: number; aprobados: number }>();
        for (const p of permits) {
            const key = p.obraActividad || '(Sin obra/actividad)';
            if (!map.has(key)) map.set(key, { total: 0, aprobados: 0 });
            const entry = map.get(key)!;
            entry.total++;
            if (p.estado === 'APROBADO') entry.aprobados++;
        }
        return map;
    }, [permits]);

    // Group ALL basePermits by obra (before obra-level filter)
    const allGroupedPermits = useMemo(() => {
        const groups = new Map<string, PermitTramitacion[]>();
        for (const p of basePermits) {
            const key = p.obraActividad || '(Sin obra/actividad)';
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key)!.push(p);
        }
        return Array.from(groups.entries()).map(([obraActividad, perms]) => ({
            obraActividad,
            permits: [...perms].sort((a, b) => (ESTADO_ORDER[a.estado] ?? 99) - (ESTADO_ORDER[b.estado] ?? 99)),
            first: perms[0],
        }));
    }, [basePermits]);

    // KPI counts at obra level
    const obraKpis = useMemo(() => {
        let porCompletar = 0, conParciales = 0, sinAprobados = 0;
        for (const { obraActividad } of allGroupedPermits) {
            const c = obraCompletionMap.get(obraActividad) ?? { total: 1, aprobados: 0 };
            const pct = c.total > 0 ? c.aprobados / c.total : 0;
            if (pct < 1) porCompletar++;
            if (c.aprobados > 0 && pct < 1) conParciales++;
            if (c.aprobados === 0) sinAprobados++;
        }
        return { porCompletar, conParciales, sinAprobados };
    }, [allGroupedPermits, obraCompletionMap]);

    // Apply obra-level filter + sort: CON_PARCIALES first, then SIN_APROBADOS
    const groupedPermits = useMemo(() => {
        const filtered = allGroupedPermits.filter(({ obraActividad }) => {
            if (selectedEstado === 'Todos') return true;
            const c = obraCompletionMap.get(obraActividad) ?? { total: 1, aprobados: 0 };
            const pct = c.total > 0 ? c.aprobados / c.total : 0;
            if (selectedEstado === 'CON_PARCIALES') return c.aprobados > 0 && pct < 1;
            if (selectedEstado === 'SIN_APROBADOS') return c.aprobados === 0;
            return true;
        });
        return [...filtered].sort((a, b) => {
            const ca = obraCompletionMap.get(a.obraActividad) ?? { total: 1, aprobados: 0 };
            const cb = obraCompletionMap.get(b.obraActividad) ?? { total: 1, aprobados: 0 };
            const isPartialA = ca.aprobados > 0 && ca.aprobados < ca.total ? 0 : 1;
            const isPartialB = cb.aprobados > 0 && cb.aprobados < cb.total ? 0 : 1;
            return isPartialA - isPartialB;
        });
    }, [allGroupedPermits, obraCompletionMap, selectedEstado]);

    const toggleGroup = (key: string) => {
        setExpandedGroups(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const handleEstadoCard = (estado: EstadoFilter) => {
        setSelectedEstado(prev => prev === estado ? 'Todos' : estado);
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando permisos...
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
                <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[32px] text-primary">folder_open</span>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tight text-white">Obras y Actividades con Permisos Activos</h1>
                            <p className="text-text-secondary text-xs uppercase tracking-widest mt-1">Seguimiento de obras y actividades con permisos en tramitación — en proceso y no iniciados.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setShowCreateObra(true); setCrearMsg(null); }}
                        className="shrink-0 flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-white border border-primary/30 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                    >
                        <span className="material-symbols-outlined text-[16px]">add_business</span> Crear obra
                    </button>
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
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Obras y Actividades por Completar</p>
                        <p className="text-3xl font-black mt-2 text-white">{obraKpis.porCompletar}</p>
                        <p className="text-[9px] text-text-secondary mt-1 uppercase">Obras con al menos un permiso pendiente</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => handleEstadoCard('CON_PARCIALES')}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer group
                            ${selectedEstado === 'CON_PARCIALES'
                                ? 'bg-yellow-500/15 border-yellow-500/60 ring-1 ring-yellow-500/40'
                                : 'bg-surface-dark border-border-dark hover:bg-yellow-500/10 hover:border-yellow-500/40'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-yellow-400/80 transition-colors">Obras y Actividades con Permisos Aprobados Parcialmente</p>
                            <span className={`material-symbols-outlined text-[16px] transition-colors ${selectedEstado === 'CON_PARCIALES' ? 'text-yellow-400' : 'text-text-secondary/40 group-hover:text-yellow-400/60'}`}>
                                {selectedEstado === 'CON_PARCIALES' ? 'filter_alt_off' : 'filter_alt'}
                            </span>
                        </div>
                        <p className={`text-3xl font-black mt-2 transition-colors ${selectedEstado === 'CON_PARCIALES' ? 'text-yellow-400' : 'text-yellow-500 group-hover:text-yellow-400'}`}>
                            {obraKpis.conParciales}
                        </p>
                        <p className={`text-[9px] mt-1 uppercase transition-colors ${selectedEstado === 'CON_PARCIALES' ? 'text-yellow-400/70' : 'text-text-secondary group-hover:text-yellow-400/60'}`}>
                            {selectedEstado === 'CON_PARCIALES' ? 'Filtro activo — clic para quitar' : 'Obras que tienen permisos aprobados pero les faltan más por aprobar'}
                        </p>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleEstadoCard('SIN_APROBADOS')}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer group
                            ${selectedEstado === 'SIN_APROBADOS'
                                ? 'bg-slate-500/15 border-slate-400/60 ring-1 ring-slate-400/40'
                                : 'bg-surface-dark border-border-dark hover:bg-slate-500/10 hover:border-slate-400/40'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary group-hover:text-slate-300/80 transition-colors">Obras y Actividades sin Ningún Permiso Completado</p>
                            <span className={`material-symbols-outlined text-[16px] transition-colors ${selectedEstado === 'SIN_APROBADOS' ? 'text-slate-300' : 'text-text-secondary/40 group-hover:text-slate-400/60'}`}>
                                {selectedEstado === 'SIN_APROBADOS' ? 'filter_alt_off' : 'filter_alt'}
                            </span>
                        </div>
                        <p className={`text-3xl font-black mt-2 transition-colors ${selectedEstado === 'SIN_APROBADOS' ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-300'}`}>
                            {obraKpis.sinAprobados}
                        </p>
                        <p className={`text-[9px] mt-1 uppercase transition-colors ${selectedEstado === 'SIN_APROBADOS' ? 'text-slate-300/70' : 'text-text-secondary group-hover:text-slate-300/60'}`}>
                            {selectedEstado === 'SIN_APROBADOS' ? 'Filtro activo — clic para quitar' : 'Obras que no tienen ningún permiso aprobado'}
                        </p>
                    </button>
                </div>

                {/* Acordeón agrupado por Obra/Actividad */}
                <div className="flex flex-col gap-2">
                    {/* Obras creadas manualmente sin permisos aún */}
                    {obrasVacias.map(obra => (
                        <div key={`obra-${obra.id}`} className="bg-surface-dark border border-amber-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm">
                            <span className="material-symbols-outlined text-[20px] text-amber-400">warning</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white line-clamp-1">{obra.nombre}</p>
                                <p className="text-[10px] text-amber-400/90 uppercase tracking-widest mt-0.5">
                                    Sin permisos asignados todavía{obra.gerencia ? ` · ${obra.gerencia}` : ''}{obra.wbs_label ? ` · ${obra.wbs_label}` : ''}
                                </p>
                            </div>
                            <button
                                onClick={() => { setAddPermitTo({ obra_actividad: obra.nombre, gerencia: obra.gerencia ?? undefined, wbs_label: obra.wbs_label ?? undefined }); setAddPermitValue({ ...EMPTY_PERMIT }); setAddPermitMsg(null); }}
                                className="shrink-0 flex items-center gap-1.5 bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors"
                            >
                                <span className="material-symbols-outlined text-[15px]">add</span> Agregar permiso
                            </button>
                            <button
                                onClick={() => { setLinkObra(obra); setLinkCodigo(''); setLinkMsg(null); }}
                                className="shrink-0 flex items-center gap-1.5 bg-slate-700/40 hover:bg-slate-700/60 text-white border border-border-dark px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-colors"
                            >
                                <span className="material-symbols-outlined text-[15px]">link</span> Enlazar
                            </button>
                            <button onClick={() => handleDeleteObra(obra.id)} title="Eliminar obra" className="shrink-0 p-1.5 rounded-lg hover:bg-white/5 text-text-secondary/60 hover:text-red-400 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                        </div>
                    ))}

                    {groupedPermits.length === 0 && obrasVacias.length === 0 && (
                        <div className="bg-surface-dark border border-border-dark rounded-xl px-6 py-16 text-center text-text-secondary text-xs italic">
                            No se encontraron permisos con los filtros seleccionados.
                        </div>
                    )}

                    {groupedPermits.map(({ obraActividad, permits: groupPerms, first }) => {
                        const isExpanded = expandedGroups.has(obraActividad);

                        return (
                            <div key={obraActividad} className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden shadow-sm transition-all">
                                {/* ── Group Header ── */}
                                <div
                                    className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                                    onClick={() => toggleGroup(obraActividad)}
                                >
                                    {/* Expand icon */}
                                    <span className={`material-symbols-outlined text-[20px] text-text-secondary transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>

                                    {/* Obra/Actividad name — click navigates to detail */}
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

                                    {/* Gerencia */}
                                    <span className="shrink-0 hidden md:inline text-xs text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 whitespace-nowrap">
                                        {first.gerencia || '—'}
                                    </span>

                                    {/* Completion progress bar */}
                                    {(() => {
                                        const c = obraCompletionMap.get(obraActividad) ?? { total: groupPerms.length, aprobados: 0 };
                                        const pct = c.total > 0 ? Math.round((c.aprobados / c.total) * 100) : 0;
                                        const barColor = pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : pct > 0 ? 'bg-blue-500' : 'bg-slate-600';
                                        const pctColor = pct === 100 ? 'text-green-400' : pct >= 50 ? 'text-amber-400' : pct > 0 ? 'text-blue-400' : 'text-slate-400';
                                        return (
                                            <div className="shrink-0 flex flex-col gap-1.5 w-44">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">Cumplimiento</span>
                                                    <span className={`text-[11px] font-black ${pctColor}`}>{pct}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                                                        style={{ width: `${Math.max(pct, pct > 0 ? 3 : 0)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[9px] text-text-secondary">{c.aprobados} de {c.total} permisos aprobados</span>
                                            </div>
                                        );
                                    })()}
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setAddPermitTo({ obra_actividad: obraActividad, gerencia: first.gerencia, wbs_label: first.wbs }); setAddPermitValue({ ...EMPTY_PERMIT }); setAddPermitMsg(null); }}
                                        title="Agregar permiso a esta obra"
                                        className="shrink-0 flex items-center gap-1.5 bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[15px]">add</span> Permiso
                                    </button>
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
                                                {(allPermitsByObra.get(obraActividad) ?? groupPerms)
                                                    .sort((a, b) => (ESTADO_ORDER[a.estado] ?? 99) - (ESTADO_ORDER[b.estado] ?? 99))
                                                    .map(permit => (
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
                                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wide whitespace-nowrap ${estadoStyles[permit.estado]}`}>
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

            {/* Modal: Crear obra */}
            {showCreateObra && (() => {
                const inputCls = "bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-primary/60 placeholder:text-text-secondary/40 w-full";
                const lblCls = "text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1";
                const gerencias = gerenciaOptions.filter(g => g !== 'Todas');
                const PH = '— Selecciona —';
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-300">
                            <div className="px-6 py-5 border-b border-border-dark flex items-center justify-between bg-slate-800/20 sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary text-[24px]">add_business</span>
                                    <h2 className="text-[11px] font-black uppercase tracking-widest text-white">Crear nueva obra</h2>
                                </div>
                                <button onClick={() => { setShowCreateObra(false); resetCrearObra(); }} className="text-text-secondary hover:text-white transition-colors bg-background-dark/50 p-1.5 rounded-lg border border-border-dark hover:border-slate-600">
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>
                            <div className="p-6 flex flex-col gap-4">
                                <p className="text-xs text-text-secondary leading-relaxed">Define los atributos de la obra. Puede quedar <span className="text-white font-bold">sin permisos</span> (los enlazas luego), o crear ya <span className="text-white font-bold">uno o varios permisos</span> activando la opción de abajo.</p>

                                <div className="flex flex-col gap-1.5">
                                    <label className={lblCls}>Nombre de la obra *</label>
                                    <input value={nuevaObra.nombre} onChange={e => setNuevaObra({ ...nuevaObra, nombre: e.target.value })} placeholder="Ej: BOTADERO DE ESTÉRILES NORTE (PAS 156 VP-0301-45)" className={inputCls} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <GenericDropdown label="Gerencia" value={nuevaObra.gerencia || PH} options={[PH, ...gerencias]} onChange={v => setNuevaObra({ ...nuevaObra, gerencia: v === PH ? '' : v })} />
                                    <GenericDropdown label="WBS o Área de Trabajo" value={nuevaObra.wbs_label || PH} options={[PH, ...wbsOptions]} onChange={v => setNuevaObra({ ...nuevaObra, wbs_label: v === PH ? '' : v })} />
                                </div>

                                {/* Opción: crear permisos dentro de la obra */}
                                <label className="flex items-center gap-2.5 cursor-pointer bg-background-dark/50 border border-border-dark rounded-lg px-3 py-2.5 hover:border-primary/40 transition-colors">
                                    <input type="checkbox" checked={crearConPermiso} onChange={e => { setCrearConPermiso(e.target.checked); if (e.target.checked && permisosNuevos.length === 0) setPermisosNuevos([{ ...EMPTY_PERMIT }]); }} className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary focus:ring-offset-background-dark" />
                                    <span className="text-[11px] font-bold text-white">Crear permisos en esta obra</span>
                                </label>

                                {crearConPermiso && (
                                    <div className="flex flex-col gap-3">
                                        {permisosNuevos.map((p, i) => (
                                            <div key={i} className="border border-primary/20 rounded-lg p-3 bg-background-dark/40 flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[9px] font-black uppercase tracking-widest text-primary/80">Permiso {i + 1} (hereda gerencia y WBS de la obra)</p>
                                                    {permisosNuevos.length > 1 && (
                                                        <button onClick={() => setPermisosNuevos(permisosNuevos.filter((_, j) => j !== i))} className="text-text-secondary/60 hover:text-red-400 transition-colors" title="Quitar permiso">
                                                            <span className="material-symbols-outlined text-[16px]">delete</span>
                                                        </button>
                                                    )}
                                                </div>
                                                <PermitFields value={p} onChange={v => setPermisosNuevos(permisosNuevos.map((x, j) => j === i ? v : x))} autoridadOptions={autoridadOptions} contratistaOptions={contratistaOptions} />
                                            </div>
                                        ))}
                                        <button onClick={() => setPermisosNuevos([...permisosNuevos, { ...EMPTY_PERMIT }])} className="self-start flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
                                            <span className="material-symbols-outlined text-[15px]">add_circle</span> Agregar otro permiso
                                        </button>
                                    </div>
                                )}

                                {crearMsg && <p className="text-[11px] text-red-400">{crearMsg}</p>}
                                <div className="flex gap-3 justify-end sticky bottom-0 bg-surface-dark pt-2">
                                    <button onClick={() => { setShowCreateObra(false); resetCrearObra(); }} className="text-[11px] text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">Cancelar</button>
                                    <button onClick={handleCreateObra} disabled={!nuevaObra.nombre.trim() || creandoObra} className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/30 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors">
                                        {creandoObra ? 'Creando...' : (crearConPermiso ? `Crear obra + ${permisosNuevos.filter(p => p.codigo_aconex.trim()).length} permiso(s)` : 'Crear obra')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Modal: Agregar permiso a una obra */}
            {addPermitTo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto flex flex-col animate-in zoom-in-95 duration-300">
                        <div className="px-6 py-5 border-b border-border-dark flex items-center justify-between bg-slate-800/20 sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[24px]">add</span>
                                <h2 className="text-[11px] font-black uppercase tracking-widest text-white">Agregar permiso</h2>
                            </div>
                            <button onClick={() => setAddPermitTo(null)} className="text-text-secondary hover:text-white transition-colors bg-background-dark/50 p-1.5 rounded-lg border border-border-dark hover:border-slate-600">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <p className="text-xs text-text-secondary leading-relaxed">Nuevo permiso en la obra <span className="text-white font-bold">{addPermitTo.obra_actividad}</span>. Hereda gerencia{addPermitTo.gerencia ? ` (${addPermitTo.gerencia})` : ''} y WBS{addPermitTo.wbs_label ? ` (${addPermitTo.wbs_label})` : ''} de la obra.</p>
                            <PermitFields value={addPermitValue} onChange={setAddPermitValue} autoridadOptions={autoridadOptions} contratistaOptions={contratistaOptions} />
                            {addPermitMsg && <p className="text-[11px] text-red-400">{addPermitMsg}</p>}
                            <div className="flex gap-3 justify-end sticky bottom-0 bg-surface-dark pt-2">
                                <button onClick={() => setAddPermitTo(null)} className="text-[11px] text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">Cancelar</button>
                                <button onClick={handleAddPermitToObra} disabled={!addPermitValue.codigo_aconex.trim() || addingPermit} className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/30 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors">
                                    {addingPermit ? 'Agregando...' : 'Agregar permiso'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Enlazar permiso a obra */}
            {linkObra && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        <div className="px-6 py-5 border-b border-border-dark flex items-center justify-between bg-slate-800/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-[24px]">link</span>
                                <h2 className="text-[11px] font-black uppercase tracking-widest text-white">Enlazar permiso</h2>
                            </div>
                            <button onClick={() => setLinkObra(null)} className="text-text-secondary hover:text-white transition-colors bg-background-dark/50 p-1.5 rounded-lg border border-border-dark hover:border-slate-600">
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <p className="text-xs text-text-secondary leading-relaxed">Enlazar un permiso a la obra <span className="text-white font-bold">{linkObra.nombre}</span>. El permiso quedará asignado a esta obra y aparecerá agrupado bajo ella.</p>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Código Aconex del permiso</label>
                                <input value={linkCodigo} onChange={e => { setLinkCodigo(e.target.value); setLinkMsg(null); }} list="permit-codes-list" placeholder="Escribe o selecciona un código..." className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-primary/60 placeholder:text-text-secondary/40 font-mono" />
                                <datalist id="permit-codes-list">{permits.map(p => <option key={p.codigoAconex} value={p.codigoAconex}>{p.obraActividad}</option>)}</datalist>
                            </div>
                            {linkMsg && <p className="text-[11px] text-red-400">{linkMsg}</p>}
                            <div className="flex gap-3 justify-end">
                                <button onClick={() => setLinkObra(null)} className="text-[11px] text-text-secondary border border-border-dark px-4 py-2.5 rounded-xl hover:border-slate-500 hover:text-white transition-colors font-bold uppercase tracking-widest">Cancelar</button>
                                <button onClick={handleLinkPermit} disabled={!linkCodigo.trim()} className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-primary/30 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors">
                                    <span className="material-symbols-outlined text-[15px]">link</span> Enlazar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveProjects;
