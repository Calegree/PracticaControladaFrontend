import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPermits } from '../services/permits';
import type { PermitTramitacion, PermitEstado } from '../types/permit';

const estadoStyles: Record<PermitEstado, string> = {
    'NO INICIADO': 'bg-slate-500/10 text-slate-400 border-slate-500/30',
    'EN ELABORACIÓN': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'EN REVISIÓN': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'APROBADO': 'bg-green-500/10 text-green-400 border-green-500/30',
    'RECHAZADO': 'bg-red-500/10 text-red-400 border-red-500/30',
};

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [permits, setPermits] = useState<PermitTramitacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [projectName, setProjectName] = useState('Cargando...');

    useEffect(() => {
        fetchPermits()
            .then(data => {
                setPermits(data);
                if (id) {
                    const found = data.find(p => p.codigoAconex === decodeURIComponent(id));
                    if (found) setProjectName(found.obraActividad);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [id]);

    const [wbsFilter, setWbsFilter] = useState('Todos');

    const filteredPermits = permits.filter(p => wbsFilter === 'Todos' || p.wbs === wbsFilter);

    if (loading) return (
        <div className="flex-1 flex items-center justify-center text-text-secondary text-sm">
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span> Cargando proyecto...
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white animate-fade-in">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-4 border-b border-border-dark">
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/')}>Inicio</span>
                    <span className="mx-2">/</span>
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/tracker')}>Proyectos</span>
                    <span className="mx-2">/</span>
                    <span className="text-white">{projectName}</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary border border-primary/20 rounded-xl">
                            <span className="material-symbols-outlined text-[28px]">account_tree</span>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">{projectName}</h2>
                            <p className="text-text-secondary text-sm italic mt-1">Control integral de actividades, planificación (Gantt) y tramitación vinculada.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-end">
                        <div>
                            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1 block mb-1">Filtrar por Área WBS</label>
                            <select
                                value={wbsFilter}
                                onChange={e => setWbsFilter(e.target.value)}
                                className="bg-surface-dark border border-border-dark text-white rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none h-10 w-48 shadow-sm"
                            >
                                <option value="Todos" className="bg-surface-dark">Todas las Áreas</option>
                                <option value="WBS 100 - Planta" className="bg-surface-dark">WBS 100 - Planta</option>
                                <option value="WBS 200 - Mina" className="bg-surface-dark">WBS 200 - Mina</option>
                            </select>
                        </div>
                        <button className="h-10 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">print</span>
                            Exportar Reporte
                        </button>
                    </div>
                </div>
            </header>

            <div className="p-4 md:p-8 flex flex-col gap-8 w-full">

                {/* 1. GANTT VISUALIZER SECTION */}
                <section className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-[20px]">view_timeline</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Planificación Integral (Carta Gantt) - {wbsFilter}</h3>
                    </div>
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-4 shadow-sm h-[300px] flex flex-col">
                        <p className="text-xs text-text-secondary italic mb-4">Esta vista simulará la incrustación del componente Gantt filtrado por el área seleccionada, indicando la ruta crítica.</p>
                        <div className="flex-1 bg-background-dark/50 border border-slate-700/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                            {/* Simulated Gantt Placeholder */}
                            <div className="absolute left-0 top-0 bottom-0 w-48 border-r border-slate-700/50 bg-slate-800/30 p-4">
                                <div className="space-y-4">
                                    <div className="h-2 w-3/4 bg-slate-600 rounded"></div>
                                    <div className="h-2 w-full bg-slate-600 rounded"></div>
                                    <div className="h-2 w-1/2 bg-slate-600 rounded pl-4 border-l-2 border-primary/50"></div>
                                    <div className="h-2 w-2/3 bg-slate-600 rounded"></div>
                                </div>
                            </div>
                            <div className="pl-52 w-full h-full p-4 relative flex flex-col justify-center">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 grid grid-cols-4 border-b border-slate-700/30 opacity-20">
                                    <div className="border-r border-slate-700/50"></div>
                                    <div className="border-r border-slate-700/50"></div>
                                    <div className="border-r border-slate-700/50"></div>
                                    <div className="border-r border-slate-700/50"></div>
                                </div>
                                {/* Gantt Bars */}
                                <div className="space-y-4 relative z-10 w-3/4">
                                    <div className="h-4 bg-primary/60 rounded border border-primary/80" style={{ width: '40%', marginLeft: '10%' }}></div>
                                    <div className="h-4 bg-orange-500/60 rounded border border-orange-500/80" style={{ width: '30%', marginLeft: '50%' }}></div>
                                    <div className="h-4 bg-[#8b5cf6]/60 rounded border border-[#8b5cf6]/80 flex items-center" style={{ width: '25%', marginLeft: '65%' }}>
                                        <div className="h-1 bg-white/50 w-full mx-1 rounded-full"></div>
                                    </div>
                                    <div className="h-4 bg-green-500/60 rounded border border-green-500/80" style={{ width: '20%', marginLeft: '80%' }}></div>
                                </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                                <span className="px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg text-[10px] font-black tracking-widest text-[#3b82f6] shadow-xl backdrop-blur-sm">COMPONENTE GANTT INTERACTIVO LISTO EN PRÓXIMO SPRINT</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. TRACKER MATRIX SECTION */}
                <section className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-[20px]">table_chart</span>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Matriz de Tramitación de Permisos Vinculados - {wbsFilter}</h3>
                    </div>
                    <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-display">
                                <thead className="bg-[#1e293b] text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                    <tr>
                                        <th className="px-4 py-3 w-24">WBS</th>
                                        <th className="px-4 py-3 w-32">Código Aconex</th>
                                        <th className="px-4 py-3">Obra / Actividad</th>
                                        <th className="px-4 py-3 text-center">Entregables (Calidad)</th>
                                        <th className="px-4 py-3 text-center">Estado General</th>
                                        <th className="px-4 py-3 text-center w-14">Detalle</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-dark">
                                    {filteredPermits.map(permit => (
                                        <tr
                                            key={permit.id}
                                            className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                                            onClick={() => navigate(`/tracker/${permit.id}`)}
                                        >
                                            <td className="px-4 py-3">
                                                <span className="text-[10px] font-bold text-[#8b5cf6] bg-[#8b5cf6]/10 px-2 py-1 rounded border border-[#8b5cf6]/20 font-mono">
                                                    {permit.wbs?.split(' - ')[0]}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-[11px] font-mono font-medium text-slate-300 whitespace-nowrap">{permit.codigoAconex}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-xs font-bold text-white leading-snug truncate">{permit.obraActividad}</p>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                {permit.estado === 'NO INICIADO' ? (
                                                    <span className="text-[10px] text-slate-500 font-bold">-</span>
                                                ) : permit.estado === 'EN REVISIÓN' ? (
                                                    <span className="text-[10px] text-orange-400 font-bold flex flex-col gap-0.5 items-center">
                                                        <span>Faltan 2 Docs</span>
                                                        <span className="text-[8px] uppercase">Riesgo Retraso</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-green-500 font-bold flex flex-col gap-0.5 items-center">
                                                        <span>100% OK</span>
                                                        <span className="text-[8px] uppercase tracking-widest">Validado (Bot)</span>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase border whitespace-nowrap ${estadoStyles[permit.estado]}`}>
                                                    {permit.estado}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-[20px]">
                                                    open_in_new
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPermits.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-text-secondary text-xs italic">
                                                No hay permisos vinculados a esta área WBS.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default ProjectDetail;
