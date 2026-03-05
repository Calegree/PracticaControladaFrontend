import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProjects } from '../data/mockProjects';
import type { ProjectStatus } from '../types/project';

const statusStyles: Record<ProjectStatus, string> = {
    'Al Día': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Adelantado': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Atrasado': 'bg-red-500/10 text-red-400 border-red-500/30',
};

const statusIcon: Record<ProjectStatus, string> = {
    'Al Día': 'check_circle',
    'Adelantado': 'trending_up',
    'Atrasado': 'warning',
};

const Gantt = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');

    const filtered = mockProjects.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase()) ||
            p.reference.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === 'Todos' || p.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totals = {
        total: mockProjects.length,
        alDia: mockProjects.filter(p => p.status === 'Al Día').length,
        adelantado: mockProjects.filter(p => p.status === 'Adelantado').length,
        atrasado: mockProjects.filter(p => p.status === 'Atrasado').length,
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/')}>Inicio</span>
                    <span className="mx-2">/</span>
                    <span className="text-white">Planificación de Proyectos</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">Planificación de Proyectos</h2>
                        <p className="text-text-secondary text-sm italic mt-1">Seguimiento y control de avance de carteras activas.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 items-end">
                        <div>
                            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1 block mb-1">Estado</label>
                            <select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className="bg-surface-dark border border-border-dark text-white rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none h-9"
                            >
                                {['Todos', 'Al Día', 'Adelantado', 'Atrasado'].map(s =>
                                    <option key={s} value={s} className="bg-surface-dark">{s}</option>
                                )}
                            </select>
                        </div>
                        <button className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all">
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            Nuevo Proyecto
                        </button>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6 w-full">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Proyectos', value: totals.total, color: 'text-white', icon: 'folder_open' },
                        { label: 'Al Día', value: totals.alDia, color: 'text-green-400', icon: 'check_circle' },
                        { label: 'Adelantados', value: totals.adelantado, color: 'text-blue-400', icon: 'trending_up' },
                        { label: 'Atrasados', value: totals.atrasado, color: 'text-red-400', icon: 'warning' },
                    ].map(kpi => (
                        <div key={kpi.label} className="p-5 rounded-xl bg-surface-dark border border-border-dark flex items-start justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{kpi.label}</p>
                                <p className={`text-3xl font-black mt-2 ${kpi.color}`}>{kpi.value}</p>
                                <p className="text-[9px] text-text-secondary mt-1 uppercase">Proyectos</p>
                            </div>
                            <span className={`material-symbols-outlined icon-fill text-[28px] ${kpi.color} opacity-40`}>{kpi.icon}</span>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px]">table_chart</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex-1">Cartera de Proyectos Activos</h3>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[16px]">search</span>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar proyecto, ID o referencia..."
                                className="bg-background-dark border border-border-dark text-white pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-background-dark/60 text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4 w-28">ID</th>
                                    <th className="px-6 py-4">Descripción / Referencia</th>
                                    <th className="px-6 py-4">Responsable</th>
                                    <th className="px-6 py-4 text-center">Período</th>
                                    <th className="px-6 py-4">Fecha Término</th>
                                    <th className="px-6 py-4">Avance</th>
                                    <th className="px-6 py-4 text-center">Estado</th>
                                    <th className="px-6 py-4 text-center w-16">Gantt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {filtered.map(project => {
                                    const deviation = project.progress - project.plannedProgress;
                                    return (
                                        <tr key={project.id} onClick={() => navigate(`/gantt/${project.id}`)} className="hover:bg-background-dark/50 transition-colors cursor-pointer group">
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-black text-primary tracking-wider">{project.id}</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-xs font-bold text-white">{project.name}</p>
                                                <p className="text-[10px] font-black text-primary/70 uppercase tracking-wider mt-0.5">{project.reference}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-8 h-8 rounded-full ${project.responsibleColor} flex items-center justify-center text-white text-[10px] font-black shrink-0`}>
                                                        {project.responsibleInitials}
                                                    </div>
                                                    <span className="text-xs text-white font-medium">{project.responsible}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-xs font-black text-white bg-background-dark border border-border-dark px-2.5 py-1 rounded-lg">
                                                    {project.period}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="text-xs font-medium text-slate-300">{project.endDate}</span>
                                            </td>
                                            <td className="px-6 py-5 min-w-[140px]">
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-black text-text-secondary">Real: {project.progress}%</span>
                                                        <span className={`text-[10px] font-black ${deviation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                            {deviation >= 0 ? '+' : ''}{deviation}% vs plan
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-border-dark rounded-full overflow-hidden relative">
                                                        {/* Planned baseline */}
                                                        <div
                                                            className="absolute top-0 left-0 h-full bg-text-secondary/30 rounded-full"
                                                            style={{ width: `${project.plannedProgress}%` }}
                                                        />
                                                        {/* Actual progress */}
                                                        <div
                                                            className={`absolute top-0 left-0 h-full rounded-full transition-all ${project.status === 'Atrasado' ? 'bg-red-500' :
                                                                project.status === 'Adelantado' ? 'bg-blue-500' : 'bg-green-500'
                                                                }`}
                                                            style={{ width: `${project.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${statusStyles[project.status]}`}>
                                                    <span className="material-symbols-outlined icon-fill text-[12px]">{statusIcon[project.status]}</span>
                                                    {project.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-[22px]">chevron_right</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center text-text-secondary text-xs italic">
                                            No se encontraron proyectos con los filtros aplicados.
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

export default Gantt;
