import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPermits } from '../services/permits';
import type { PermitTramitacion, PermitEstado } from '../types/permit';

const estadoStyles: Record<PermitEstado, string> = {
    'NO INICIADO': 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    'EN ELABORACIÓN': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'EN REVISIÓN': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'APROBADO': 'bg-green-500/10 text-green-400 border-green-500/30',
    'RECHAZADO': 'bg-red-500/10 text-red-400 border-red-500/30',
};

const Tracker = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterEstado, setFilterEstado] = useState<string>('Todos');
    const [permits, setPermits] = useState<PermitTramitacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPermits()
            .then(setPermits)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const filtered = permits.filter(p => {
        const matchesSearch =
            p.obraActividad.toLowerCase().includes(search.toLowerCase()) ||
            p.tipoPermiso.toLowerCase().includes(search.toLowerCase()) ||
            p.codigoAconex.toLowerCase().includes(search.toLowerCase()) ||
            String(p.id).includes(search);
        const matchesEstado = filterEstado === 'Todos' || p.estado === filterEstado;
        return matchesSearch && matchesEstado;
    });

    const totals = {
        total: permits.length,
        aprobados: permits.filter(p => p.estado === 'APROBADO').length,
        enProceso: permits.filter(p => p.estado === 'EN ELABORACIÓN' || p.estado === 'EN REVISIÓN').length,
        noIniciados: permits.filter(p => p.estado === 'NO INICIADO').length,
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando permisos...
        </div>
    );
    if (error) return (
        <div className="flex-1 flex items-center justify-center text-red-400 text-sm">
            <span className="material-symbols-outlined mr-2">error</span> Error al cargar datos: {error}
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/')}>Inicio</span>
                    <span className="mx-2">/</span>
                    <span className="text-white">Tramitación de Permisos</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">Tramitación de Permisos</h2>
                        <p className="text-text-secondary text-sm italic mt-1">Matriz de seguimiento y control de permisología sectorial — PLAN / ACTUAL / FORECAST</p>
                    </div>
                    <div className="flex flex-wrap gap-3 items-end">
                        <div>
                            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1 block mb-1">Estado</label>
                            <select
                                value={filterEstado}
                                onChange={e => setFilterEstado(e.target.value)}
                                className="bg-surface-dark border border-border-dark text-white rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none h-9"
                            >
                                {['Todos', 'NO INICIADO', 'EN ELABORACIÓN', 'EN REVISIÓN', 'APROBADO', 'RECHAZADO'].map(s => (
                                    <option key={s} value={s} className="bg-surface-dark">{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6 w-full">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Permisos', value: totals.total, color: 'text-white' },
                        { label: 'Aprobados', value: totals.aprobados, color: 'text-green-400' },
                        { label: 'En Tramitación', value: totals.enProceso, color: 'text-yellow-400' },
                        { label: 'No Iniciados', value: totals.noIniciados, color: 'text-slate-400' },
                    ].map(kpi => (
                        <div key={kpi.label} className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{kpi.label}</p>
                            <p className={`text-3xl font-black mt-2 ${kpi.color}`}>{kpi.value}</p>
                            <p className="text-[9px] text-text-secondary mt-1 uppercase">Permisos</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px]">table_chart</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex-1">Matriz de Tramitación</h3>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[16px]">search</span>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar obra, tipo o código Aconex..."
                                className="bg-background-dark border border-border-dark text-white pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary w-72"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-display">
                            <thead className="bg-background-dark/60 text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                <tr>
                                    <th className="px-4 py-4 w-14">ID</th>
                                    <th className="px-4 py-4 w-48">Código Aconex</th>
                                    <th className="px-4 py-4">Obra / Actividad</th>
                                    <th className="px-4 py-4">Tipo de Permiso</th>
                                    <th className="px-4 py-4">Autoridad</th>
                                    <th className="px-4 py-4">Contratista</th>
                                    <th className="px-4 py-4 text-center">Aprobación Forecast</th>
                                    <th className="px-4 py-4 text-center">Estado</th>
                                    <th className="px-4 py-4 text-center w-14">Ficha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {filtered.map(permit => (
                                    <tr
                                        key={permit.id}
                                        className="hover:bg-background-dark/50 transition-colors cursor-pointer group"
                                        onClick={() => navigate(`/tracker/${encodeURIComponent(permit.codigoAconex)}`)}
                                    >
                                        <td className="px-4 py-4">
                                            <span className="text-xs font-black text-primary tracking-wider">{permit.id}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-xs font-mono font-medium text-slate-300 whitespace-nowrap">{permit.codigoAconex}</span>
                                        </td>
                                        <td className="px-4 py-4 max-w-[260px]">
                                            <p className="text-xs font-bold text-white leading-snug line-clamp-2">{permit.obraActividad}</p>
                                        </td>
                                        <td className="px-4 py-4 max-w-[220px]">
                                            <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">{permit.tipoPermiso}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-xs font-bold text-primary/80">{permit.autoridad}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-xs text-slate-400">{permit.contratistaResponsable}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="text-[11px] font-bold tracking-widest text-text-secondary">
                                                {permit.aprobacion.forecast ?? permit.aprobacion.plan ?? '—'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase border whitespace-nowrap ${estadoStyles[permit.estado]}`}>
                                                {permit.estado}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-[22px]">
                                                chevron_right
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="px-6 py-16 text-center text-text-secondary text-xs italic">
                                            No se encontraron permisos con los filtros aplicados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
