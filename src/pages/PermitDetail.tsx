import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { mockPermits } from '../data/mockPermits';

const statusStyles: Record<string, string> = {
    'Pendiente': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'En Curso': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'Validado': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Crítico': 'bg-red-500/10 text-red-400 border-red-500/30',
    'Vencido': 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

const typeStyles: Record<string, string> = {
    'Ambiental': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    'Social': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    'Operacional': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    'Hídrico': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Fauna': 'bg-green-500/10 text-green-400 border-green-500/30',
};

const PermitDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fileRef = useRef<HTMLInputElement>(null);

    const permit = mockPermits.find(p => p.id === id);

    if (!permit) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-white gap-4">
                <span className="material-symbols-outlined text-[80px] text-text-secondary">description_off</span>
                <h2 className="text-2xl font-black uppercase">Permiso no encontrado</h2>
                <button onClick={() => navigate('/tracker')} className="text-primary hover:underline text-sm font-bold">
                    ← Volver a la tabla
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            <div className="px-4 md:px-8 pt-6 pb-2">
                {/* Breadcrumb */}
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-6">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/tracker')}>Permisos</span>
                    <span className="mx-2">›</span>
                    <span className="text-white">Ficha {permit.id}</span>
                </nav>

                {/* Header: tags + title + edit */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${statusStyles[permit.status]}`}>
                                {permit.status}
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${typeStyles[permit.type]}`}>
                                {permit.type}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                            {permit.id}: {permit.name}
                        </h1>
                        <p className="text-text-secondary text-sm mt-1">{permit.reference}</p>
                    </div>
                    <button className="flex items-center gap-2 h-10 px-5 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 shrink-0">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Editar Ficha
                    </button>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                        { label: 'Responsable', value: permit.responsible, icon: 'person', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                        { label: 'Vencimiento', value: permit.expiration, icon: 'event', color: 'text-red-400', bg: 'bg-red-500/10' },
                        { label: 'Autoridad', value: permit.authority, icon: 'account_balance', color: 'text-green-400', bg: 'bg-green-500/10' },
                        { label: 'Vigencia', value: permit.validity, icon: 'verified_user', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    ].map(card => (
                        <div key={card.label} className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`${card.bg} p-1.5 rounded-lg`}>
                                    <span className={`material-symbols-outlined text-[18px] ${card.color}`}>{card.icon}</span>
                                </span>
                                <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary">{card.label}</p>
                            </div>
                            <p className="text-lg font-black text-white">{card.value}</p>
                        </div>
                    ))}
                </div>

                {/* Two-column: Tracking + Info+Docs */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-8">
                    {/* Tracking Timeline */}
                    <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-border-dark flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px]">route</span>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Ruta del Permiso</h3>
                        </div>
                        <div className="p-6 relative">
                            <div className="absolute left-[42px] top-6 bottom-6 w-0.5 bg-border-dark" />
                            <div className="space-y-8 relative">
                                {permit.tracking.map((step, idx) => (
                                    <div key={idx} className="flex gap-5">
                                        <div className="relative z-10 w-10 flex justify-center bg-surface-dark py-1 shrink-0">
                                            {step.status === 'completed' && (
                                                <span className="material-symbols-outlined text-[28px] text-green-500 icon-fill bg-surface-dark rounded-full">check_circle</span>
                                            )}
                                            {step.status === 'current' && (
                                                <span className="material-symbols-outlined text-[28px] text-yellow-500 icon-fill bg-surface-dark rounded-full animate-pulse shadow-[0_0_12px_rgba(234,179,8,0.3)]">schedule</span>
                                            )}
                                            {step.status === 'pending' && (
                                                <div className="w-7 h-7 rounded-full border-2 border-dashed border-border-dark bg-surface-dark relative z-10" />
                                            )}
                                        </div>
                                        <div className="pt-1 flex-1">
                                            <h4 className={`font-black text-sm uppercase tracking-tight ${step.status === 'pending' ? 'text-text-secondary/50' : 'text-white'}`}>
                                                {step.title}
                                            </h4>
                                            <p className={`text-[10px] mt-0.5 font-bold tracking-widest uppercase ${step.status === 'pending' ? 'text-text-secondary/40' : step.status === 'current' ? 'text-yellow-500' : 'text-primary'}`}>
                                                {step.date}
                                            </p>
                                            <p className={`text-xs mt-1.5 ${step.status === 'pending' ? 'text-text-secondary/30' : 'text-text-secondary'}`}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Info General + Docs */}
                    <div className="flex flex-col gap-4">
                        {/* Info General */}
                        <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border-dark">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Información General</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1">Gerencia</p>
                                        <p className="text-sm font-bold text-white">{permit.management}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1">Período</p>
                                        <p className="text-sm font-bold text-white">{permit.period}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1">Contratista</p>
                                        <p className="text-sm font-bold text-white">{permit.contractor}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1">Estado Actual</p>
                                        <p className={`text-sm font-black uppercase ${statusStyles[permit.status]?.split(' ')[1] || 'text-white'}`}>{permit.status}</p>
                                    </div>
                                </div>
                                {permit.description && (
                                    <div className="bg-background-dark border border-border-dark rounded-xl p-4 mt-2">
                                        <p className="text-xs text-text-secondary italic leading-relaxed">{permit.description}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Documentación / Evidencia */}
                        <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-border-dark">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Documentación / Evidencia</h3>
                            </div>
                            <div className="p-5 space-y-3">
                                {/* Upload Zone */}
                                <div
                                    onClick={() => fileRef.current?.click()}
                                    className="border-2 border-dashed border-border-dark hover:border-primary/40 rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-colors group"
                                >
                                    <span className="material-symbols-outlined text-[40px] text-primary/50 group-hover:text-primary transition-colors">cloud_upload</span>
                                    <p className="text-xs font-black text-text-secondary uppercase tracking-widest group-hover:text-white transition-colors">Subir Documento</p>
                                    <p className="text-[10px] text-text-secondary">PDF o imágenes (máx 20MB)</p>
                                    <input ref={fileRef} type="file" accept=".pdf,image/*" className="hidden" />
                                </div>

                                {/* Recent Files */}
                                {permit.documents.length > 0 && (
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-text-secondary mb-2">Archivos Recientes</p>
                                        {permit.documents.map((doc, i) => (
                                            <div key={i} className="flex items-center justify-between bg-background-dark border border-border-dark rounded-lg px-4 py-2.5 group hover:border-primary/30 transition-colors">
                                                <div className="flex items-center gap-2.5">
                                                    <span className="material-symbols-outlined text-red-400 text-[18px]">picture_as_pdf</span>
                                                    <div>
                                                        <p className="text-xs font-medium text-white">{doc.name}</p>
                                                        <p className="text-[10px] text-text-secondary">{doc.size}</p>
                                                    </div>
                                                </div>
                                                <button className="text-text-secondary hover:text-white transition-colors p-1">
                                                    <span className="material-symbols-outlined text-[18px]">download</span>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermitDetail;
