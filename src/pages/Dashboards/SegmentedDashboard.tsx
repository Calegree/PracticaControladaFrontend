import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export const SegmentedDashboard = () => {
    // Mock Data for Top Donuts (Macrozona)
    const dataCampamento = [{ name: 'Pendientes', value: 75 }, { name: 'En Trámite', value: 25 }];
    const dataMina = [{ name: 'Pendientes', value: 40 }, { name: 'En Trámite', value: 60 }];
    const dataAgua = [{ name: 'Pendientes', value: 10 }, { name: 'En Trámite', value: 90 }];

    // Beige, Red, Green
    const COLORS = ['#ef4444', '#10b981'];

    // Mock Data for Stacked Bar charts
    const barDataGerencias = [
        { name: 'Sustentabilidad', noIniciado: 10, enElaboracion: 20, enTramite: 15 },
        { name: 'Legal', noIniciado: 5, enElaboracion: 8, enTramite: 30 },
        { name: 'Operaciones', noIniciado: 15, enElaboracion: 5, enTramite: 10 },
        { name: 'Mantenimiento', noIniciado: 2, enElaboracion: 4, enTramite: 5 },
    ];

    const barDataContratistas = [
        { name: 'Contratista A', noIniciado: 5, enElaboracion: 10, enTramite: 20 },
        { name: 'Contratista B', noIniciado: 8, enElaboracion: 15, enTramite: 5 },
        { name: 'Contratista C', noIniciado: 12, enElaboracion: 5, enTramite: 2 },
    ];

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in">
            {/* Macrozona Donuts Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MacrozonaDonut title="Sector Campamento" data={dataCampamento} colors={COLORS} total={100} />
                <MacrozonaDonut title="Sector Mina-Planta" data={dataMina} colors={COLORS} total={100} />
                <MacrozonaDonut title="Sector Suministro Hídrico" data={dataAgua} colors={COLORS} total={100} />
            </div>

            {/* Stacked Bars Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Por Gerencia */}
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 text-center">Permisos pendientes de obtener, según gerencia responsable</h3>
                    <p className="text-[10px] text-text-secondary text-center mb-6">Gráfico apilado: Azul oscuro: No iniciado / Beige plata: En elaboración / Verde: En trámite</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barDataGerencias} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#324467" opacity={0.3} />
                                <XAxis dataKey="name" stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                <YAxis stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                <Bar dataKey="noIniciado" stackId="a" fill="#1e3a8a" name="No Iniciado" />
                                <Bar dataKey="enElaboracion" stackId="a" fill="#d6d3d1" name="En Elaboración" />
                                <Bar dataKey="enTramite" stackId="a" fill="#10b981" name="En Trámite" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Por Contratista */}
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-sm">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-2 text-center">Gerencias con pendientes de respuesta</h3>
                    <p className="text-[10px] text-text-secondary text-center mb-6">Azul oscuro: Requerimientos totales / Naranja: Entregados</p>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barDataContratistas} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#324467" opacity={0.3} />
                                <XAxis dataKey="name" stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                <YAxis stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                <Bar dataKey="noIniciado" fill="#1e3a8a" name="Total Rq." radius={[4, 4, 0, 0]} />
                                <Bar dataKey="enTramite" fill="#f97316" name="Entregados" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    );
};

// Helper Component for the Donuts
const MacrozonaDonut = ({ title, data, colors, total }: { title: string, data: any[], colors: string[], total: number }) => {
    return (
        <div className="flex flex-col items-center bg-surface-dark border border-border-dark p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-black text-white uppercase tracking-tight">{title}</h3>
                <span className="material-symbols-outlined text-text-secondary text-[14px]">info</span>
            </div>
            <div className="h-[180px] w-[180px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={50}
                            outerRadius={70}
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
                    <span className="text-2xl font-black text-white">{total}</span>
                    <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest mt-1">Total</span>
                </div>
            </div>
            <button className="text-[10px] font-black text-[#3b82f6] hover:text-blue-400 mt-2 hover:underline uppercase tracking-wide">
                Ver más
            </button>
        </div>
    );
};
