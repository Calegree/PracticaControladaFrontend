const Gantt = () => {
    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <div className="flex flex-col gap-4 md:gap-6">
                    <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest">
                        <span className="hover:text-primary transition-colors cursor-pointer">Inicio</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">Planificación Gantt</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase">Planificación de Carteras</h2>
                            <p className="text-text-secondary text-sm md:text-base italic">Visualización y control de dependencias e hitos en Ruta Crítica</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center gap-2 h-10 px-4 rounded-lg bg-surface-dark border border-border-dark hover:bg-background-dark text-white text-xs font-bold transition-all uppercase tracking-widest w-full sm:w-auto">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                <span>Filtros Avanzados</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
                <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden min-h-[600px] p-6">
                    <div className="flex items-center gap-6 mb-8 border-b border-border-dark pb-4">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-text-secondary">En plazo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-text-secondary">Ruta Crítica / Riesgo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                            <span className="text-[10px] uppercase font-black tracking-widest text-text-secondary">Completado</span>
                        </div>
                    </div>

                    <div className="flex-1 rounded-xl bg-background-dark border border-border-dark flex items-center justify-center p-8 text-center bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAzdjI3SDBWM3ptMyAwaDI3di0zSDN2M3oiIGZpbGw9IiMzMjQ0NjciIGZpbGwtb3BhY2l0eT0iMC4yIgogZmlsbC1ydWxlPSJldmVub2RkIj48L3BhdGg+Cjwvc3ZnPg==')]">
                        <div className="max-w-md flex flex-col items-center">
                            <span className="material-symbols-outlined text-border-dark text-[100px] mb-4 drop-shadow-md">account_tree</span>
                            <h3 className="text-xl font-black text-white uppercase tracking-tight">Visualizador Gantt</h3>
                            <p className="text-text-secondary mt-3 text-sm italic font-medium">
                                Aquí se montará el componente interactivo de diagrama Gantt
                                conectado a la base de datos de PostgreSQL.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gantt;
