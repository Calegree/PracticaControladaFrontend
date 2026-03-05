import { useNavigate, useParams } from 'react-router-dom';
import { mockProjects } from '../data/mockProjects';
import GanttChart from '../components/GanttChart';

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const project = mockProjects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white gap-4">
                <span className="material-symbols-outlined text-[80px] text-text-secondary">folder_off</span>
                <h2 className="text-2xl font-black uppercase">Proyecto no encontrado</h2>
                <button onClick={() => navigate('/gantt')} className="text-primary hover:underline text-sm font-bold">
                    ← Volver a la tabla
                </button>
            </div>
        );
    }

    const statusColors: Record<string, string> = {
        'Al Día': 'bg-green-500/10 text-green-400 border-green-500/30',
        'Adelantado': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        'Atrasado': 'bg-red-500/10 text-red-400 border-red-500/30',
    };

    const deviation = project.progress - project.plannedProgress;

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <div className="px-4 md:px-8 pt-6 pb-2">
                {/* Breadcrumb */}
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-6">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/gantt')}>Planificación</span>
                    <span className="mx-2">›</span>
                    <span className="text-white">{project.id}</span>
                </nav>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusColors[project.status]}`}>
                                {project.status}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border bg-primary/10 text-primary border-primary/30">
                                {project.management}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                            {project.id}: {project.name}
                        </h1>
                        <p className="text-text-secondary text-sm mt-1">{project.reference}</p>
                    </div>
                    <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 shrink-0">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Editar Proyecto
                    </button>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Responsable', value: project.responsible, icon: 'person', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                        { label: 'Fecha Término', value: project.endDate, icon: 'event', color: 'text-red-400', bg: 'bg-red-500/10' },
                        { label: 'Avance Real', value: `${project.progress}%`, icon: 'speed', color: 'text-green-400', bg: 'bg-green-500/10' },
                        { label: 'Desviación', value: `${deviation >= 0 ? '+' : ''}${deviation}% vs plan`, icon: 'trending_up', color: deviation >= 0 ? 'text-green-400' : 'text-red-400', bg: deviation >= 0 ? 'bg-green-500/10' : 'bg-red-500/10' },
                    ].map(card => (
                        <div key={card.label} className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`${card.bg} p-1.5 rounded-lg`}>
                                    <span className={`material-symbols-outlined text-[18px] ${card.color}`}>{card.icon}</span>
                                </span>
                                <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">{card.label}</p>
                            </div>
                            <p className={`text-lg font-black ${card.color}`}>{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Gantt Chart */}
                <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden mb-8">
                    <div className="p-5 border-b border-border-dark flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Diagrama Gantt — {project.id}</h3>
                    </div>
                    <div className="p-4">
                        <GanttChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
