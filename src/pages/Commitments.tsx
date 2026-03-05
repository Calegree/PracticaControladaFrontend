const Commitments = () => {
    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <div className="flex flex-col gap-4 md:gap-6">
                    <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest">
                        <span className="hover:text-primary transition-colors cursor-pointer">Inicio</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">Compromisos RCA</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase">Compromisos RCA</h2>
                            <p className="text-text-secondary text-sm md:text-base italic">Gestión de cumplimiento e ingreso de evidencia (Sostenibilidad)</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all uppercase tracking-widest w-full sm:w-auto">
                                <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                                <span>Cargar Evidencia Múltiple</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
                {/* KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm">
                        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Compromisos Activos</p>
                        <h3 className="text-2xl md:text-3xl font-black text-white mt-1">153</h3>
                    </div>
                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm">
                        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Cumplimiento en Riesgo</p>
                        <h3 className="text-2xl md:text-3xl font-black text-white mt-1">12</h3>
                    </div>
                    <div className="flex flex-col gap-1 p-5 rounded-xl bg-surface-dark border border-border-dark shadow-sm">
                        <p className="text-text-secondary text-[10px] font-black uppercase tracking-widest">Inversión YTD</p>
                        <h3 className="text-2xl md:text-3xl font-black text-white mt-1">$450K</h3>
                    </div>
                </div>

                {/* Table Module */}
                <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden min-h-[500px]">
                    <div className="p-4 md:p-6 border-b border-border-dark flex gap-2 items-center text-primary">
                        <span className="material-symbols-outlined text-[18px]">list_alt</span>
                        <h3 className="text-xs font-black uppercase tracking-widest">Compromisos Recientes Válidos</h3>
                    </div>
                    <div className="flex-1 overflow-x-auto w-full">
                        <table className="w-full text-left font-display">
                            <thead className="bg-slate-800/80 text-[10px] font-black text-text-secondary uppercase tracking-widest sticky top-0">
                                <tr>
                                    <th className="px-6 py-4">ID Compromiso</th>
                                    <th className="px-6 py-4">Descripción</th>
                                    <th className="px-6 py-4 text-center">Vencimiento</th>
                                    <th className="px-6 py-4 text-center">Estado</th>
                                    <th className="px-6 py-4 text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark text-xs text-white bg-surface-dark">
                                <tr className="hover:bg-background-dark/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-primary">RCA-153-C01</td>
                                    <td className="px-6 py-4 font-medium text-slate-300">Monitoreo Trimestral de Polvo Sedimentable en Campamento</td>
                                    <td className="px-6 py-4 text-center font-bold tracking-widest text-[10px] text-text-secondary">OCT 2026</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase border bg-red-500/10 text-red-500 border-red-500/20 w-24">
                                            Pendiente
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-text-secondary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-background-dark/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-primary">RCA-153-C02</td>
                                    <td className="px-6 py-4 font-medium text-slate-300">Instalación Señalética Fauna Sector Norte</td>
                                    <td className="px-6 py-4 text-center font-bold tracking-widest text-[10px] text-text-secondary">SEP 2026</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase border bg-green-500/10 text-green-500 border-green-500/20 w-24">
                                            Al Día
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="text-text-secondary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Commitments;
