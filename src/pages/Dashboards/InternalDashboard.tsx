import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

export const InternalDashboard = () => {
    // Mock Data for the S-Curve (Avance Presupuestario)
    const sCurveData = [
        { month: 'Ene', plan: 10, actual: 12 },
        { month: 'Feb', plan: 25, actual: 28 },
        { month: 'Mar', plan: 45, actual: 42 },
        { month: 'Abr', plan: 65, actual: 55 },
        { month: 'May', plan: 85, actual: 70 },
        { month: 'Jun', plan: 95, actual: null }, // Example of forecast
        { month: 'Jul', plan: 100, actual: null },
    ];

    // Mock Data for the basic pie chart
    const dataContratos = [{ name: 'Activos', value: 4 }, { name: 'Cerrados', value: 2 }];
    const COLORS = ['#3b82f6', '#94a3b8'];

    // Mock Data for the Details Table
    const tableData = [
        { contractor: 'Cumplimiento Leon', contract: 'OS-1029', code: 'C-01', period: '01-2025', plan: 130, actual: 130, accumulated: 130 },
        { contractor: 'Cumplimiento Leon', contract: 'OS-1029', code: 'C-02', period: '02-2025', plan: 130, actual: 120, accumulated: 250 },
        { contractor: 'Cumplimiento Leon', contract: 'OS-1029', code: 'C-03', period: '03-2025', plan: 130, actual: null, accumulated: null },
        { contractor: 'Ingeniería Andes', contract: 'CN-8842', code: 'I-01', period: '01-2025', plan: 50, actual: 50, accumulated: 50 },
    ];

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Panel: Selector and Pie */}
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-sm flex flex-col items-center">
                    <h3 className="text-sm font-black text-white uppercase tracking-tight mb-4 text-center w-full border-b border-border-dark pb-2">Control de avance pp y contratos</h3>

                    <div className="w-full flex flex-col gap-1 mb-6 mt-4">
                        <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">Elija el contrato u Orden de servicio</label>
                        <select className="bg-slate-800/50 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none transition-all w-full custom-select">
                            <option value="all">Todos los Contratos</option>
                            <option value="os-1029">OS-1029 Cumplimiento Leon</option>
                        </select>
                    </div>

                    <div className="h-[180px] w-[180px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={dataContratos}
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {dataContratos.map((_entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px', fontSize: '12px', color: '#fff', fontWeight: 'bold' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black text-white">6</span>
                            <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest mt-1">Total</span>
                        </div>
                    </div>

                    <div className="w-full mt-6">
                        <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-3 text-center">Descargas</h4>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="text-xs text-[#3b82f6] hover:underline">Base técnica</a>
                            <a href="#" className="text-xs text-[#3b82f6] hover:underline">Consulta y respuesta</a>
                            <a href="#" className="text-xs text-[#3b82f6] hover:underline">Propuestas oferentes</a>
                            <a href="#" className="text-xs text-[#3b82f6] hover:underline">Método de evaluación</a>
                        </div>
                    </div>
                </div>

                {/* Right Panel: S-Curve and Table */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* S-Curve Chart */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-sm h-[320px]">
                        <h3 className="text-sm font-black text-white uppercase tracking-tight mb-4">Curva de Avance Presupuestario</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sCurveData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#324467" opacity={0.3} />
                                <XAxis dataKey="month" stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                <YAxis stroke="#92a4c9" fontSize={10} tickLine={false} axisLine={false} fontWeight="bold" />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#1a1d24', border: '1px solid #324467', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                <Line type="monotone" dataKey="plan" stroke="#94a3b8" strokeWidth={2} dot={false} name="Plan (Budget)" strokeDasharray="5 5" />
                                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} name="Actual" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Table View */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-sm overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#1e293b] text-[10px] font-black text-text-secondary uppercase tracking-widest border-b border-border-dark">
                                <tr>
                                    <th className="px-4 py-3">Contratista</th>
                                    <th className="px-4 py-3">Contrato</th>
                                    <th className="px-4 py-3">Código</th>
                                    <th className="px-4 py-3">MM-AA</th>
                                    <th className="px-4 py-3 text-right">Plan</th>
                                    <th className="px-4 py-3 text-right">Actual</th>
                                    <th className="px-4 py-3 text-right">Acumulado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {tableData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4 py-3 text-xs text-white">{row.contractor}</td>
                                        <td className="px-4 py-3 text-xs text-slate-400">{row.contract}</td>
                                        <td className="px-4 py-3 text-xs text-slate-400">{row.code}</td>
                                        <td className="px-4 py-3 text-xs text-white font-bold">{row.period}</td>
                                        <td className="px-4 py-3 text-xs text-white text-right font-mono">{row.plan}</td>
                                        <td className="px-4 py-3 text-right">
                                            {row.actual !== null ? (
                                                <span className="text-xs text-[#10b981] font-mono font-bold">{row.actual}</span>
                                            ) : (
                                                <span className="text-xs text-slate-600">-</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {row.accumulated !== null ? (
                                                <span className="text-xs text-white font-mono font-bold">{row.accumulated}</span>
                                            ) : (
                                                <span className="text-xs text-slate-600">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};
