import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EventCategory = 'permiso' | 'proyecto' | 'compromiso';

interface CalendarEvent {
    id: string;
    date: string;
    label: string;
    sub: string;
    category: EventCategory;
}

const catStyle: Record<EventCategory, { dot: string; badge: string; icon: string }> = {
    permiso: { dot: 'bg-blue-500', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30', icon: 'verified_user' },
    proyecto: { dot: 'bg-green-500', badge: 'bg-green-500/10 text-green-400 border-green-500/30', icon: 'folder_open' },
    compromiso: { dot: 'bg-orange-500', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30', icon: 'assignment' },
};

const catLabel: Record<EventCategory, string> = {
    permiso: 'Permiso', proyecto: 'Proyecto', compromiso: 'Compromiso',
};

const EVENTS: CalendarEvent[] = [
    // Permisos – históricos
    { id: 'E01', date: '2024-10-12', label: 'Vencimiento RCA-001', sub: 'Control de emisiones de polvo', category: 'permiso' },
    { id: 'E02', date: '2024-10-15', label: 'Vencimiento C-204', sub: 'Control Emisiones Material Particulado', category: 'permiso' },
    { id: 'E03', date: '2024-11-30', label: 'Vencimiento BIO-09', sub: 'Monitoreo de fauna altoandina', category: 'permiso' },
    { id: 'E04', date: '2024-12-02', label: 'Vencimiento WAT-55', sub: 'Medición niveles freáticos pozo 4', category: 'permiso' },
    { id: 'E05', date: '2025-01-15', label: 'Vencimiento SOC-12', sub: 'Programa becas escolares Colla', category: 'permiso' },
    // Permisos – 2026
    { id: 'E15', date: '2026-03-07', label: 'Entrega Evidencia RCA-001', sub: 'Informe Q1 — Control de Polvo', category: 'permiso' },
    { id: 'E16', date: '2026-03-12', label: 'Renovación C-204', sub: 'Tramitar renovación ante SERNAGEOMIN', category: 'permiso' },
    { id: 'E17', date: '2026-03-20', label: 'Vencimiento WAT-55', sub: 'Reporte trimestral DGA', category: 'permiso' },
    { id: 'E18', date: '2026-04-05', label: 'Entrega Evidencia BIO-09', sub: 'Monitoreo fauna Q1 2026', category: 'permiso' },
    { id: 'E19', date: '2026-04-30', label: 'Renovación SOC-12', sub: 'Acuerdo Social — Municipalidad', category: 'permiso' },
    { id: 'E20', date: '2026-05-15', label: 'Vencimiento RCA-008', sub: 'Plan manejo residuos peligrosos', category: 'permiso' },
    // Proyectos – históricos
    { id: 'E06', date: '2024-01-10', label: 'Inicio PRY-001', sub: 'Expansión Planta de Filtros Norte', category: 'proyecto' },
    { id: 'E07', date: '2025-06-30', label: 'Término PRY-001', sub: 'Expansión Planta de Filtros Norte', category: 'proyecto' },
    { id: 'E08', date: '2024-01-10', label: 'Inicio PRY-002', sub: 'Instalación Sistema Monitoreo Hídrico', category: 'proyecto' },
    { id: 'E09', date: '2024-11-15', label: 'Término PRY-002', sub: 'Instalación Sistema Monitoreo Hídrico', category: 'proyecto' },
    { id: 'E10', date: '2025-09-15', label: 'Término PRY-005', sub: 'Automatización Control Emisiones MP10', category: 'proyecto' },
    // Proyectos – 2026
    { id: 'E21', date: '2026-03-01', label: 'Inicio PRY-007', sub: 'Mejora sistema ventilación Nivel 4', category: 'proyecto' },
    { id: 'E22', date: '2026-03-15', label: 'Hito Fase 1 — PRY-006', sub: 'Auditoría ambiental Sector Norte', category: 'proyecto' },
    { id: 'E23', date: '2026-03-28', label: 'Entrega Informe PRY-003', sub: 'Reforestación Zona Sur — avance 80%', category: 'proyecto' },
    { id: 'E24', date: '2026-04-10', label: 'Inicio PRY-008', sub: 'Instalación colectores solares faena', category: 'proyecto' },
    { id: 'E25', date: '2026-04-30', label: 'Término PRY-004', sub: 'Mejora infraestructura vial acceso', category: 'proyecto' },
    { id: 'E26', date: '2026-05-20', label: 'Hito Fase 2 — PRY-007', sub: 'Mejora sistema ventilación Nivel 4', category: 'proyecto' },
    // Compromisos – históricos
    { id: 'E11', date: '2024-10-01', label: 'Entrega Informe Trimestral', sub: 'Reporte Q3 2024 – Sostenibilidad', category: 'compromiso' },
    { id: 'E12', date: '2024-12-15', label: 'Auditoría Interna', sub: 'Revisión sistema gestión ambiental', category: 'compromiso' },
    { id: 'E13', date: '2025-02-28', label: 'Entrega Reporte Anual', sub: 'Informe de Sustentabilidad 2024', category: 'compromiso' },
    { id: 'E14', date: '2025-03-31', label: 'Renovación Plan Hídrico', sub: 'Actualización plan gestión hídrica DGA', category: 'compromiso' },
    // Compromisos – 2026
    { id: 'E27', date: '2026-03-05', label: 'Reunión Comité Ambiental', sub: 'Revisión KPIs ambientales Q1 2026', category: 'compromiso' },
    { id: 'E28', date: '2026-03-10', label: 'Entrega Reporte Q4 2025', sub: 'Informe sostenibilidad anual', category: 'compromiso' },
    { id: 'E29', date: '2026-03-14', label: 'Capacitación Comunidades', sub: 'Taller informativo comunidad Colla', category: 'compromiso' },
    { id: 'E30', date: '2026-03-24', label: 'Comité SSO Mensual', sub: 'Seguridad y Salud Ocupacional — Marzo', category: 'compromiso' },
    { id: 'E31', date: '2026-04-01', label: 'Entrega Informe Trimestral', sub: 'Reporte Q1 2026 – Medio Ambiente', category: 'compromiso' },
    { id: 'E32', date: '2026-04-15', label: 'Auditoría Sernageomin', sub: 'Inspección anual seguridad operacional', category: 'compromiso' },
    { id: 'E33', date: '2026-04-22', label: 'Día de la Tierra', sub: 'Actividades comunitarias comprometidas', category: 'compromiso' },
    { id: 'E34', date: '2026-05-06', label: 'Revisión Plan Cierre', sub: 'Actualización plan de cierre de faena', category: 'compromiso' },
];

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfWeek(year: number, month: number) { return new Date(year, month, 1).getDay(); }
function toISO(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const Calendar = () => {
    const navigate = useNavigate();
    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());
    const [filterCat, setFilterCat] = useState<EventCategory | 'all'>('all');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
    const todayISO = toISO(now.getFullYear(), now.getMonth(), now.getDate());

    const visibleEvents = EVENTS.filter(e => filterCat === 'all' || e.category === filterCat);

    const eventsThisMonth = visibleEvents.filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
    });

    const byDay: Record<string, CalendarEvent[]> = {};
    eventsThisMonth.forEach(e => {
        if (!byDay[e.date]) byDay[e.date] = [];
        byDay[e.date].push(e);
    });

    const soon = visibleEvents
        .filter(e => e.date >= todayISO)
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 8);

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    };

    const selectedEvents = selectedDate ? (byDay[selectedDate] || []) : [];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/')}>Inicio</span>
                    <span className="mx-2">/</span>
                    <span className="text-white">Calendario de Hitos</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">Calendario de Hitos</h2>
                        <p className="text-text-secondary text-sm italic mt-1">Fechas clave: vencimientos, entregas y etapas de proyectos.</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {(['all', 'permiso', 'proyecto', 'compromiso'] as const).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilterCat(cat)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${filterCat === cat
                                    ? cat === 'all' ? 'bg-primary text-white border-primary' : `${catStyle[cat as EventCategory].badge} border-transparent`
                                    : 'text-text-secondary border-border-dark hover:text-white hover:border-white/20'
                                    }`}
                            >
                                {cat !== 'all' && <span className="material-symbols-outlined text-[12px]">{catStyle[cat as EventCategory].icon}</span>}
                                {cat === 'all' ? 'Todos' : catLabel[cat as EventCategory]}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 grid grid-cols-1 xl:grid-cols-3 gap-6 pb-8">
                {/* Calendar grid */}
                <div className="xl:col-span-2 flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-visible">
                    <div className="flex items-center justify-between p-4 border-b border-border-dark">
                        <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                        <h3 className="text-sm font-black text-white uppercase tracking-widest">{MONTH_NAMES[viewMonth]} {viewYear}</h3>
                        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-7 bg-background-dark/60 border-b border-border-dark">
                        {DAYS_OF_WEEK.map(d => (
                            <div key={d} className="py-2 text-center text-[9px] font-black text-text-secondary uppercase tracking-widest">{d}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 flex-1 overflow-visible">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`e-${i}`} className="min-h-[80px] border-b border-r border-border-dark/50 bg-background-dark/20" />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const iso = toISO(viewYear, viewMonth, day);
                            const dayEvents = byDay[iso] || [];
                            const isToday = iso === todayISO;
                            const isSelected = iso === selectedDate;
                            return (
                                <div
                                    key={iso}
                                    onClick={() => setSelectedDate(isSelected ? null : iso)}
                                    className={`min-h-[80px] border-b border-r border-border-dark/50 p-1.5 cursor-pointer transition-colors group ${isSelected ? 'bg-primary/10' : 'hover:bg-white/3'}`}
                                >
                                    <div className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-black mb-1 ${isToday ? 'bg-primary text-white' : 'text-text-secondary group-hover:text-white'}`}>
                                        {day}
                                    </div>
                                    <div className="space-y-0.5">
                                        {dayEvents.slice(0, 2).map(ev => (
                                            <div key={ev.id} className="relative group/tip">
                                                {/* Pill */}
                                                <div className={`flex items-center gap-1 rounded px-1 py-0.5 ${catStyle[ev.category].badge} cursor-default`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${catStyle[ev.category].dot}`} />
                                                    <span className="text-sm font-bold truncate">{ev.label}</span>
                                                </div>
                                                {/* Tooltip */}
                                                <div className="absolute bottom-full left-0 mb-2 z-[999] w-64 pointer-events-none
                                                    opacity-0 group-hover/tip:opacity-100 translate-y-1 group-hover/tip:translate-y-0
                                                    transition-all duration-150">
                                                    <div className={`rounded-xl border shadow-2xl p-4 ${catStyle[ev.category].badge} bg-[#0f172a] backdrop-blur-sm`}>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="material-symbols-outlined icon-fill text-[18px]">{catStyle[ev.category].icon}</span>
                                                            <span className="text-xs font-black uppercase tracking-widest opacity-80">{catLabel[ev.category]}</span>
                                                        </div>
                                                        <p className="text-sm font-black leading-snug">{ev.label}</p>
                                                        <p className="text-xs opacity-70 mt-1.5 leading-snug">{ev.sub}</p>
                                                        <p className="text-[11px] font-black mt-2.5 opacity-50">
                                                            {new Date(ev.date + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
                                                        </p>
                                                    </div>
                                                    {/* Arrow */}
                                                    <div className={`w-2.5 h-2.5 rotate-45 border-b border-r ml-4 -mt-1.5 bg-[#0f172a] ${catStyle[ev.category].badge.split(' ').find(c => c.startsWith('border-'))}`} />
                                                </div>
                                            </div>
                                        ))}
                                        {dayEvents.length > 2 && (
                                            <p className="text-[10px] text-text-secondary pl-1">+{dayEvents.length - 2} más</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="p-3 border-t border-border-dark flex items-center gap-5 flex-wrap">
                        {(['permiso', 'proyecto', 'compromiso'] as EventCategory[]).map(cat => (
                            <div key={cat} className="flex items-center gap-1.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${catStyle[cat].dot}`} />
                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest">{catLabel[cat]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right panel */}
                <div className="flex flex-col gap-4">
                    {selectedDate && (
                        <div className="flex flex-col rounded-xl bg-surface-dark border border-primary/30 overflow-hidden">
                            <div className="p-4 border-b border-border-dark flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[18px]">event</span>
                                <h4 className="text-sm font-black uppercase tracking-widest text-white flex-1">
                                    {new Date(selectedDate + 'T12:00:00').toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </h4>
                                <button onClick={() => setSelectedDate(null)} className="text-text-secondary hover:text-white">
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            </div>
                            <div className="p-4 space-y-3">
                                {selectedEvents.length === 0
                                    ? <p className="text-sm text-text-secondary italic">Sin eventos este día.</p>
                                    : selectedEvents.map(ev => (
                                        <div key={ev.id} className={`flex items-start gap-3 p-3 rounded-lg border ${catStyle[ev.category].badge}`}>
                                            <span className="material-symbols-outlined icon-fill text-[24px] shrink-0 mt-0.5">{catStyle[ev.category].icon}</span>
                                            <div>
                                                <p className="text-sm font-black">{ev.label}</p>
                                                <p className="text-xs opacity-70 mt-0.5">{ev.sub}</p>
                                                <span className="text-[11px] font-black uppercase opacity-60 tracking-widest">{catLabel[ev.category]}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark overflow-hidden">
                        <div className="p-4 border-b border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">upcoming</span>
                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Próximos Hitos</h4>
                        </div>
                        <div className="divide-y divide-border-dark">
                            {soon.length === 0
                                ? <p className="p-4 text-xs text-text-secondary italic">Sin hitos próximos.</p>
                                : soon.map(ev => {
                                    const d = new Date(ev.date + 'T12:00:00');
                                    const diffDays = Math.ceil((d.getTime() - Date.now()) / 86400000);
                                    const urgency = diffDays <= 7 ? 'text-red-400' : diffDays <= 30 ? 'text-yellow-400' : 'text-text-secondary';
                                    return (
                                        <div key={ev.id} className="flex items-start gap-3 p-3 hover:bg-white/3 transition-colors">
                                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-2 ${catStyle[ev.category].dot}`} />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-white truncate">{ev.label}</p>
                                                <p className="text-xs text-text-secondary truncate">{ev.sub}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-xs font-black text-white">{d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })}</p>
                                                <p className={`text-xs font-black ${urgency}`}>
                                                    {diffDays === 0 ? 'Hoy' : diffDays < 0 ? `Hace ${Math.abs(diffDays)}d` : `en ${diffDays}d`}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
