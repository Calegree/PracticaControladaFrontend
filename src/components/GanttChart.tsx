// Pure CSS Gantt Chart – no external library needed
// Dates are rendered as column-widths relative to the total project span.

interface GanttTask {
    id: string;
    label: string;
    start: string;   // ISO date yyyy-mm-dd
    end: string;     // ISO date yyyy-mm-dd
    type: 'critical' | 'normal' | 'done' | 'atrasado';
    assigned: string;
}

interface GanttChartProps {
    tasks?: GanttTask[];
    projectStart?: string;
    projectEnd?: string;
}

const DEFAULT_TASKS: GanttTask[] = [
    { id: 'T01', label: 'Levantamiento de Información', start: '2024-01-10', end: '2024-02-05', type: 'done', assigned: 'C. Meneses' },
    { id: 'T02', label: 'Ingeniería Básica', start: '2024-02-06', end: '2024-03-20', type: 'done', assigned: 'J. Pérez' },
    { id: 'T03', label: 'Elaboración de RFI', start: '2024-03-21', end: '2024-04-15', type: 'done', assigned: 'M. Silva' },
    { id: 'T04', label: 'Revisión B', start: '2024-04-16', end: '2024-05-10', type: 'done', assigned: 'A. Morales' },
    { id: 'T05', label: 'Revisión 0 – Versión Final', start: '2024-05-11', end: '2024-06-20', type: 'critical', assigned: 'C. Meneses' },
    { id: 'T06', label: 'Adquisición de Equipos', start: '2024-05-01', end: '2024-07-15', type: 'atrasado', assigned: 'R. Díaz' },
    { id: 'T07', label: 'Construcción Fase 1', start: '2024-06-21', end: '2024-09-30', type: 'critical', assigned: 'V. Rojas' },
    { id: 'T08', label: 'Construcción Fase 2', start: '2024-10-01', end: '2024-12-31', type: 'critical', assigned: 'V. Rojas' },
    { id: 'T09', label: 'Pruebas y Comisionamiento', start: '2025-01-05', end: '2025-02-28', type: 'normal', assigned: 'J. Pérez' },
    { id: 'T10', label: 'Entrega y Cierre Documental', start: '2025-03-01', end: '2025-06-30', type: 'normal', assigned: 'C. Meneses' },
];

const typeColor: Record<GanttTask['type'], string> = {
    done: 'bg-green-600/80 border-green-500/60',
    normal: 'bg-blue-600/80 border-blue-500/60',
    critical: 'bg-red-600/80 border-red-500/60',
    atrasado: 'bg-yellow-500/80 border-yellow-400/60',
};

const typeLabel: Record<GanttTask['type'], string> = {
    done: 'Completado',
    normal: 'En Plazo',
    critical: 'Ruta Crítica',
    atrasado: 'Atrasado',
};

const toDate = (s: string) => new Date(s).getTime();

function getMonths(startMs: number, endMs: number): string[] {
    const months: string[] = [];
    const d = new Date(startMs);
    d.setDate(1);
    while (d.getTime() <= endMs) {
        months.push(d.toLocaleDateString('es-CL', { month: 'short', year: '2-digit' }));
        d.setMonth(d.getMonth() + 1);
    }
    return months;
}

const GanttChart = ({ tasks = DEFAULT_TASKS, projectStart = '2024-01-01', projectEnd = '2025-06-30' }: GanttChartProps) => {
    const startMs = toDate(projectStart);
    const endMs = toDate(projectEnd);
    const totalMs = endMs - startMs;

    const pct = (dateStr: string) =>
        Math.min(100, Math.max(0, ((toDate(dateStr) - startMs) / totalMs) * 100));

    const width = (s: string, e: string) =>
        Math.max(0.5, pct(e) - pct(s));

    const months = getMonths(startMs, endMs);

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[900px]">
                {/* Legend row */}
                <div className="flex items-center gap-5 px-4 pb-3">
                    {(['done', 'normal', 'atrasado', 'critical'] as GanttTask['type'][]).map(t => (
                        <div key={t} className="flex items-center gap-1.5">
                            <span className={`w-2.5 h-2.5 rounded-sm border ${typeColor[t]}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{typeLabel[t]}</span>
                        </div>
                    ))}
                </div>

                <div className="flex">
                    {/* Left column: task names */}
                    <div className="w-52 shrink-0 flex flex-col">
                        {/* Header spacer */}
                        <div className="h-8 border-b border-border-dark border-r border-border-dark bg-background-dark" />
                        {tasks.map(task => (
                            <div key={task.id} className="flex items-center gap-2 h-12 px-3 border-b border-border-dark border-r border-border-dark bg-surface-dark">
                                <span className="text-[10px] font-black text-text-secondary w-8 shrink-0">{task.id}</span>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-white truncate leading-tight">{task.label}</p>
                                    <p className="text-[9px] text-text-secondary truncate">{task.assigned}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right column: timeline */}
                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* Month headers */}
                        <div className="h-8 flex border-b border-border-dark bg-background-dark">
                            {months.map((m, i) => (
                                <div key={i} className="flex-1 flex items-center justify-center border-r border-border-dark/40 last:border-r-0">
                                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-wider">{m}</span>
                                </div>
                            ))}
                        </div>

                        {/* Task rows */}
                        {tasks.map(task => (
                            <div key={task.id} className="relative h-12 border-b border-border-dark bg-surface-dark group">
                                {/* Month grid lines */}
                                <div className="absolute inset-0 flex pointer-events-none">
                                    {months.map((_, i) => (
                                        <div key={i} className="flex-1 border-r border-border-dark/20 last:border-r-0" />
                                    ))}
                                </div>
                                {/* Today line – approximate */}
                                <div
                                    className="absolute top-0 bottom-0 w-px bg-yellow-500/40 z-10 pointer-events-none"
                                    style={{ left: `${pct(new Date().toISOString().split('T')[0])}%` }}
                                />
                                {/* Bar */}
                                <div
                                    className={`absolute top-3 h-6 rounded border ${typeColor[task.type]} flex items-center px-2 overflow-hidden cursor-default group-hover:brightness-125 transition-all`}
                                    style={{ left: `${pct(task.start)}%`, width: `${width(task.start, task.end)}%` }}
                                    title={`${task.label}: ${task.start} → ${task.end}`}
                                >
                                    <span className="text-[9px] font-black text-white/90 truncate select-none">{task.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Today indicator legend */}
                <div className="flex items-center gap-2 px-4 pt-3">
                    <div className="w-4 h-px bg-yellow-500/60" />
                    <span className="text-[9px] text-text-secondary italic">Línea amarilla = Hoy</span>
                </div>
            </div>
        </div>
    );
};

export default GanttChart;
