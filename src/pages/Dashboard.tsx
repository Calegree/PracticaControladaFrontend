import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [selectedGerencia, setSelectedGerencia] = useState('Todas');
    const [selectedAnual, setSelectedAnual] = useState('2024');

    const dynamicChartData = [
        { name: 'Ene', findings: 2.1 },
        { name: 'Feb', findings: 1.8 },
        { name: 'Mar', findings: 2.5 },
        { name: 'Abr', findings: 1.5 },
        { name: 'May', findings: 1.3 },
        { name: 'Jun', findings: 1.2 },
        { name: 'Jul', findings: 1.1 },
        { name: 'Ago', findings: 1.4 },
        { name: 'Sep', findings: 1.0 },
        { name: 'Oct', findings: 0.9 },
        { name: 'Nov', findings: 0.8 },
        { name: 'Dic', findings: 0.7 },
    ];

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <div className="flex flex-col gap-4 md:gap-6">
                    <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest">
                        <span className="hover:text-primary transition-colors cursor-pointer">Inicio</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">Dashboard Estratégico</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase">Dashboard Estratégico</h2>
                            <p className="text-text-secondary text-sm md:text-base italic">Visión general del cumplimiento normativo y permisos críticos</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                            <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
                                <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Gerencia</label>
                                <select
                                    value={selectedGerencia}
                                    onChange={(e) => setSelectedGerencia(e.target.value)}
                                    className="bg-surface-dark border border-border-dark text-white rounded-lg px-3 py-1.5 text-xs focus:ring-primary focus:border-primary outline-none transition-all h-10 shadow-sm custom-select"
                                >
                                    <option value="Todas" className="bg-surface-dark">Todas</option>
                                    <option value="Mina" className="bg-surface-dark">Mina</option>
                                    <option value="Planta P." className="bg-surface-dark">Planta de Procesos</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 flex-1 min-w-[80px]">
                                <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Anual</label>
                                <select
                                    value={selectedAnual}
                                    onChange={(e) => setSelectedAnual(e.target.value)}
                                    className="bg-surface-dark border border-border-dark text-white rounded-lg px-3 py-1.5 text-xs focus:ring-primary focus:border-primary outline-none transition-all h-10 shadow-sm custom-select"
                                >
                                    <option value="2023" className="bg-surface-dark">2023</option>
                                    <option value="2024" className="bg-surface-dark">2024</option>
                                    <option value="2025" className="bg-surface-dark">2025</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full sm:w-auto">
                                <label className="text-[9px] font-black text-transparent uppercase tracking-widest hidden sm:block">Acción</label>
                                <button
                                    className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all uppercase tracking-widest w-full sm:w-auto"
                                >
                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                    <span>Exportar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Tasa Cumplimiento RCA</p>
                            <span className="p-1.5 rounded-lg bg-green-500/10"><span className="material-symbols-outlined text-[20px] text-green-500">trending_up</span></span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <h3 className="text-2xl md:text-3xl font-black text-white">90.0%</h3>
                            <span className="text-[10px] font-black uppercase text-green-500">+4.5% vs mes ant.</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-4 overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: '90%' }}></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Índice Hallazgos</p>
                            <span className="p-1.5 rounded-lg bg-green-500/10"><span className="material-symbols-outlined text-[20px] text-green-500">trending_down</span></span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <h3 className="text-2xl md:text-3xl font-black text-white">1.4</h3>
                            <span className="text-[10px] font-black uppercase text-green-500">-0.9 vs mes ant.</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5 mt-4 overflow-hidden">
                            <div className="bg-green-500 h-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tight">Hallazgos por inspección</p>
                    </div>

                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Promedio Tramitación</p>
                            <span className="p-1.5 rounded-lg bg-green-500/10"><span className="material-symbols-outlined text-[20px] text-green-500">timer_off</span></span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <h3 className="text-2xl md:text-3xl font-black text-white">48 Días</h3>
                            <span className="text-[10px] font-black uppercase text-green-500">-12% vs mes ant.</span>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 mt-6 uppercase tracking-tight">Meta: 50 Días</p>
                    </div>

                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Permisos Críticos</p>
                            <span className="p-1.5 rounded-lg bg-orange-500/10"><span className="material-symbols-outlined text-[20px] text-orange-500">warning</span></span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-2">
                            <h3 className="text-2xl md:text-3xl font-black text-white">19</h3>
                            <span className="text-[10px] font-black uppercase text-orange-500">3 En Riesgo</span>
                        </div>
                        <div className="flex gap-1 mt-4">
                            <div className="h-1.5 flex-[0.7] rounded-full bg-green-500"></div>
                            <div className="h-1.5 flex-[0.2] rounded-full bg-yellow-500"></div>
                            <div className="h-1.5 flex-[0.1] rounded-full bg-red-500"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm h-[350px] md:h-[450px]">
                        <div className="p-4 md:p-6 border-b border-border-dark">
                            <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tight">Tendencia de Hallazgos</h3>
                            <p className="text-xs text-text-secondary">Evolución Anual - Fiscalizaciones Consolidadas</p>
                        </div>
                        <div className="p-2 md:p-4 flex-1 w-full overflow-hidden">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={dynamicChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorFindings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#135bec" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#135bec" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#324467" opacity={0.3} />
                                    <XAxis dataKey="name" stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                    <YAxis stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                        labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}
                                    />
                                    <Area type="monotone" dataKey="findings" stroke="#135bec" fillOpacity={1} fill="url(#colorFindings)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden h-[400px] md:h-[450px]">
                        <div className="p-4 md:p-6 border-b border-border-dark">
                            <h3 className="text-base md:text-lg font-black text-white uppercase tracking-tight">Alertas de Permisos</h3>
                            <p className="text-xs text-text-secondary">Próximos vencimientos críticos</p>
                        </div>
                        <div className="flex-1 overflow-y-auto w-full">
                            <table className="w-full text-left text-sm">
                                <thead className="sticky top-0 bg-slate-800/80 backdrop-blur-sm text-[10px] font-black text-text-secondary z-10 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-4 py-3">Permiso</th>
                                        <th className="px-4 py-3 text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-white leading-tight">Extracción Aguas</span>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase mt-1">DGA - Pozo Norte</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase border bg-red-500/10 text-red-500 border-red-500/20">
                                                Critico
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-white leading-tight">Botadero Estéril</span>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase mt-1">Sernageomin</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase border bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                                Atención
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-white leading-tight">Planta Chancado</span>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase mt-1">Seremi Salud</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase border bg-green-500/10 text-green-500 border-green-500/20">
                                                Vigente
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-border-dark text-center bg-slate-800/50">
                            <Link to="/tracker" className="text-[10px] font-black text-primary hover:text-primary-hover transition-colors uppercase tracking-[0.2em]">Ver Todos Los Permisos</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
