import { useState } from 'react';

const Tracker = () => {
    const [search, setSearch] = useState('PERM-1042');

    const steps = [
        { title: "Generación Request For Information", status: "completed", date: "12 Mar 2026", desc: "Información técnica base solicitada al área de ingeniería." },
        { title: "Revisión B", status: "completed", date: "28 Mar 2026", desc: "Borrador inicial elaborado y enviado a revisión interna." },
        { title: "Revisión 0", status: "current", date: "Estimado: 15 Abr", desc: "Corrección de observaciones para emisión de versión final." },
        { title: "Ingreso Autoridad", status: "pending", date: "--", desc: "Presentación de expediente a Sernageomin." },
        { title: "Obtención", status: "pending", date: "--", desc: "Aprobación y resolución oficial de la autoridad." }
    ];

    return (
        <div className="space-y-8 max-w-4xl mx-auto py-8 text-white">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">Ruta del Permiso</h1>
                <p className="text-text-secondary italic">Consulta el estado actual y los próximos hitos de tu permiso.</p>

                <div className="max-w-md mx-auto relative mt-6">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-surface-dark border-2 border-border-dark rounded-xl px-12 py-4 text-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-bold text-center shadow-sm text-white transition-all"
                        placeholder="Ej: PERM-1042"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-[24px]">search</span>
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-bold transition-colors uppercase tracking-widest text-[10px]">
                        Rastrear
                    </button>
                </div>
            </div>

            <div className="bg-surface-dark rounded-2xl border border-border-dark shadow-sm p-8 mt-12">
                <div className="flex items-center justify-between border-b border-border-dark pb-6 mb-8">
                    <div>
                        <span className="bg-primary/20 text-primary text-[10px] font-black px-2.5 py-1 rounded uppercase tracking-widest border border-primary/30">Permiso Sector Planta</span>
                        <h2 className="text-xl font-bold mt-3 text-white">Permiso de Operación Planta Relaves</h2>
                        <p className="text-text-secondary text-xs flex items-center gap-1 mt-1.5 uppercase font-bold tracking-wider">
                            <span className="material-symbols-outlined text-[14px]">location_on</span> WBS: 1200-PL-44
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Autoridad Competente</p>
                        <p className="font-bold text-white flex items-center justify-end gap-1.5 mt-1 text-sm bg-background-dark px-3 py-1.5 rounded border border-border-dark">
                            <span className="material-symbols-outlined text-[16px] text-primary">description</span> Sernageomin
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border-dark" />

                    <div className="space-y-10 relative">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="relative z-10 w-16 flex justify-center bg-surface-dark py-1">
                                    {step.status === 'completed' && <span className="material-symbols-outlined text-[32px] text-green-500 icon-fill relative z-10 bg-surface-dark rounded-full">check_circle</span>}
                                    {step.status === 'current' && <span className="material-symbols-outlined text-[32px] text-yellow-500 icon-fill relative z-10 bg-surface-dark rounded-full animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.3)]">schedule</span>}
                                    {step.status === 'pending' && <div className="w-8 h-8 rounded-full border-2 border-dashed border-border-dark bg-surface-dark relative z-10" />}
                                </div>
                                <div className="pt-1 flex-1">
                                    <h3 className={`font-black text-lg uppercase tracking-tight ${step.status === 'pending' ? 'text-text-secondary/50' : 'text-white'}`}>
                                        {step.title}
                                    </h3>
                                    <p className={`text-xs mt-1 font-bold tracking-widest uppercase ${step.status === 'pending' ? 'text-text-secondary/50' : step.status === 'current' ? 'text-yellow-500' : 'text-primary'}`}>
                                        {step.date}
                                    </p>
                                    <p className={`text-sm mt-2 ${step.status === 'pending' ? 'text-text-secondary/40' : 'text-text-secondary'}`}>
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
