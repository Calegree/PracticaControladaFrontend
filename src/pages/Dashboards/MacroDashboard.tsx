import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const MacroDashboard = () => {
    // Mock Data for Donuts
    const dataRCA = [{ name: 'Cumplidos', value: 450 }, { name: 'En Proceso', value: 204 }, { name: 'Atrasados', value: 100 }];
    const dataGestiones = [{ name: 'Cumplidos', value: 60 }, { name: 'En Proceso', value: 25 }, { name: 'Atrasados', value: 15 }];
    const dataTotal = [{ name: 'Cumplidos', value: 510 }, { name: 'En Proceso', value: 229 }, { name: 'Atrasados', value: 115 }];

    const COLORS = ['#22c55e', '#facc15', '#ef4444']; // Green, Yellow, Red
    const COLORS_GESTIONES = ['#22c55e', '#facc15', '#ef4444']; // Green, Yellow, Red

    // Mock Data for Bar Chart
    const barData = [
        { name: 'Permiso 1', days: 20, plan: 15 },
        { name: 'Permiso 2', days: 45, plan: 30 },
        { name: 'Permiso 3', days: 12, plan: 12 },
        { name: 'Permiso 4', days: 60, plan: 45 },
        { name: 'Permiso 5', days: 5, plan: 10 },
    ];

    const actions = [
        'Reunión con evaluador',
        'Reunión Lobby y nivel gerencial',
        'Mantener seguimiento semanal',
        'Reunión con evaluador',
        'Mantener seguimiento semanal',
    ];

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
            {/* Donuts Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardDonut
                    title={
                        <div className="flex flex-col items-center justify-center leading-tight">
                            <span className="text-[9px] text-text-secondary/70 uppercase tracking-widest mb-1">Permisos requeridos por</span>
                            <span>Resolución de Calificación Ambiental</span>
                        </div>
                    }
                    data={dataRCA} colors={COLORS} total={854}
                />
                <DashboardDonut
                    title={
                        <div className="flex flex-col items-center justify-center leading-tight">
                            <span className="text-[9px] text-text-secondary/70 uppercase tracking-widest mb-1">Permisos para</span>
                            <span>Gestiones de Cambio</span>
                        </div>
                    }
                    data={dataGestiones} colors={COLORS_GESTIONES} total={100}
                />
                <DashboardDonut
                    title={
                        <div className="flex flex-col items-center justify-center leading-tight">
                            <span>Total de Permisos en el Proyecto</span>
                        </div>
                    }
                    data={dataTotal} colors={COLORS} total={974}
                />
            </div>

            {/* Bar Chart Row */}
            <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-4">Permisos en trámite vs Días Hábiles</h3>
                <div className="flex flex-col lg:flex-row gap-6 h-[400px]">
                    <div className="flex-1 min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#324467" opacity={0.3} />
                                <XAxis type="number" stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} width={80} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="days" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} name="Días Tramitación" />
                                <Bar dataKey="plan" fill="#94a3b8" radius={[0, 4, 4, 0]} barSize={20} name="Plan Original" opacity={0.5} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Actions Panel */}
                    <div className="lg:w-72 bg-slate-800/30 rounded-lg p-4 overflow-y-auto">
                        <h4 className="text-xs font-black text-text-secondary uppercase mb-3">Acciones Sugeridas</h4>
                        <div className="flex flex-col gap-3">
                            {barData.map((item, index) => (
                                <div key={index} className="flex flex-col pb-3 border-b border-slate-700 last:border-0 last:pb-0">
                                    <span className="text-white text-xs font-bold">{item.name}</span>
                                    <span className="text-[#3b82f6] text-[10px] font-bold cursor-pointer hover:underline mt-1 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">add</span>
                                        {actions[index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for the Donuts
const DashboardDonut = ({ title, data, colors, total }: { title: React.ReactNode, data: any[], colors: string[], total: number }) => {
    return (
        <div className="flex flex-col items-center bg-surface-dark border border-border-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 text-center min-h-[40px] flex items-center justify-center">{title}</h3>
            <div className="h-[200px] w-[200px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((_entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px', fontSize: '12px', color: '#fff', fontWeight: 'bold' }} />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl font-black text-white">{total}</span>
                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest mt-1">Total</span>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 w-full">
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.4)]"></div>
                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Cumplidos</span>
                    </div>
                    <span className="text-white font-black text-xs leading-none">{data[0]?.value || 0}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm bg-amber-400 shadow-[0_0_4px_rgba(251,191,36,0.4)]"></div>
                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">En Proceso</span>
                    </div>
                    <span className="text-white font-black text-xs leading-none">{data[1]?.value || 0}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-sm bg-red-500 shadow-[0_0_4px_rgba(239,68,68,0.4)]"></div>
                        <span className="text-[8px] font-bold text-text-secondary uppercase tracking-widest leading-none">Atrasados</span>
                    </div>
                    <span className="text-white font-black text-xs leading-none">{data[2]?.value || 0}</span>
                </div>
            </div>

            <button className="text-[10px] font-black text-[#3b82f6] hover:text-blue-400 mt-4 hover:underline uppercase tracking-wide">
                Ver más
            </button>
        </div>
    );
};
