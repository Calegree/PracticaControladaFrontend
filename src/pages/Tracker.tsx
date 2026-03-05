import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPermits } from '../data/mockPermits';
import type { Permit, PermitStatus, PermitType } from '../types/permit';

const statusStyles: Record<PermitStatus, string> = {
    'Pendiente': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'En Curso': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    'Validado': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Crítico': 'bg-red-500/10 text-red-400 border-red-500/30',
    'Vencido': 'bg-slate-500/10 text-slate-400 border-slate-500/30',
};

const emptyForm: Omit<Permit, 'tracking' | 'documents'> = {
    id: '',
    name: '',
    reference: '',
    status: 'Pendiente',
    type: 'Ambiental',
    responsible: '',
    responsibleInitials: '',
    responsibleColor: 'bg-blue-600',
    period: '2025',
    expiration: '',
    authority: '',
    validity: 'Acotada',
    management: 'Mina',
    contractor: 'GESTIONA',
    description: '',
};

const NewPermitModal = ({ onClose }: { onClose: () => void }) => {
    const [form, setForm] = useState(emptyForm);
    const [isAutoFilling, setIsAutoFilling] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileRef = useRef<HTMLInputElement>(null);

    const handleAutoFill = () => {
        if (!fileName) return;
        setIsAutoFilling(true);
        // Simulated AI fill - in production this hits the goldfieldsAgentes RAG endpoint
        setTimeout(() => {
            setForm(prev => ({
                ...prev,
                name: 'Monitoreo de Calidad de Aire Fase I',
                reference: 'RCA 241/2019',
                status: 'Pendiente',
                type: 'Ambiental',
                authority: 'SEREMI SALUD',
                management: 'Mina',
                contractor: 'GESTIONA',
                responsible: 'Juan Pérez',
                period: '2025',
                expiration: '15 Dic 2025',
                validity: 'Acotada',
                description: 'Permiso de monitoreo de calidad de aire asociado a las obligaciones de la RCA 241/2019, Fase I de operación.',
            }));
            setIsAutoFilling(false);
        }, 2200);
    };

    const handleField = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const inputCls = 'w-full bg-background-dark border border-border-dark text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary placeholder-text-secondary transition-all';
    const selectCls = `${inputCls} cursor-pointer`;
    const labelCls = 'text-[9px] font-black uppercase tracking-widest text-text-secondary mb-1 block';

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-surface-dark border border-border-dark rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border-dark">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white uppercase tracking-wider">Ingresar Nuevo Permiso</h2>
                            <p className="text-[10px] text-text-secondary">Formulario de Registro Centralizado</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-6 space-y-5">
                    {/* AI Banner */}
                    <div className="flex items-center gap-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                            <span className="material-symbols-outlined text-yellow-400 icon-fill text-[22px]">auto_awesome</span>
                            <div>
                                <p className="text-xs font-bold text-yellow-400">Auto-completar</p>
                                <p className="text-[10px] text-text-secondary">
                                    {fileName ? `"${fileName}" listo para análisis` : 'Sube una RCA, Resolución o EIA para auto-completar este formulario.'}
                                </p>
                            </div>
                        </div>
                        <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={e => setFileName(e.target.files?.[0]?.name || '')} />
                        <button
                            onClick={() => fileName ? handleAutoFill() : fileRef.current?.click()}
                            disabled={isAutoFilling}
                            className="flex items-center gap-2 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10 px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-60"
                        >
                            {isAutoFilling
                                ? <><span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span> Analizando...</>
                                : fileName
                                    ? <><span className="material-symbols-outlined text-[14px]">auto_fix_high</span> Auto-Completar</>
                                    : <><span className="material-symbols-outlined text-[14px]">upload_file</span> Subir PDF</>
                            }
                        </button>
                    </div>

                    {/* Row: Name */}
                    <div>
                        <label className={labelCls}>Nombre del Permiso *</label>
                        <input className={inputCls} placeholder="Ej: Monitoreo de Calidad de Aire Fase I" value={form.name} onChange={e => handleField('name', e.target.value)} />
                    </div>

                    {/* Row: Reference + Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Referencia Legal / RCA</label>
                            <input className={inputCls} placeholder="Ej: RCA 241/2019" value={form.reference} onChange={e => handleField('reference', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>Estado Gestión</label>
                            <select className={selectCls} value={form.status} onChange={e => handleField('status', e.target.value)}>
                                {(['Pendiente', 'En Curso', 'Validado', 'Crítico', 'Vencido'] as PermitStatus[]).map(s => <option key={s} value={s} className="bg-surface-dark">{s}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Row: Authority + Contractor */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Autoridad Competente</label>
                            <select className={selectCls} value={form.authority} onChange={e => handleField('authority', e.target.value)}>
                                {['SEREMI SALUD', 'SERNAGEOMIN', 'DGA', 'SAG', 'SMA', 'MUNICIPALIDAD', 'CONAF'].map(a => <option key={a} value={a} className="bg-surface-dark">{a}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Empresa / Contratista</label>
                            <input className={inputCls} placeholder="GESTIONA" value={form.contractor} onChange={e => handleField('contractor', e.target.value)} />
                        </div>
                    </div>

                    {/* Row: Management + Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Gerencia</label>
                            <select className={selectCls} value={form.management} onChange={e => handleField('management', e.target.value)}>
                                {['Mina', 'Planta de Procesos', 'Servicios Generales', 'Sostenibilidad'].map(g => <option key={g} value={g} className="bg-surface-dark">{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Tipo de Permiso</label>
                            <select className={selectCls} value={form.type} onChange={e => handleField('type', e.target.value)}>
                                {(['Ambiental', 'Social', 'Operacional', 'Hídrico', 'Fauna'] as PermitType[]).map(t => <option key={t} value={t} className="bg-surface-dark">{t}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Row: Responsible + Period */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Responsable</label>
                            <input className={inputCls} placeholder="Nombre Completo" value={form.responsible} onChange={e => handleField('responsible', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>Período</label>
                            <select className={selectCls} value={form.period} onChange={e => handleField('period', e.target.value)}>
                                {['2023', '2024', '2025', '2026'].map(p => <option key={p} value={p} className="bg-surface-dark">{p}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Row: Expiration + Validity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelCls}>Vencimiento</label>
                            <input className={inputCls} placeholder="Ej: 15 Dic 2024" value={form.expiration} onChange={e => handleField('expiration', e.target.value)} />
                        </div>
                        <div>
                            <label className={labelCls}>Vigencia</label>
                            <select className={selectCls} value={form.validity} onChange={e => handleField('validity', e.target.value)}>
                                <option value="Acotada" className="bg-surface-dark">Acotada</option>
                                <option value="Indefinida" className="bg-surface-dark">Indefinida</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border-dark flex justify-between">
                    <button onClick={onClose} className="px-6 py-2.5 text-text-secondary hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                        Cancelar
                    </button>
                    <button className="px-8 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/20 transition-all">
                        Guardar Permiso
                    </button>
                </div>
            </div>
        </div>
    );
};

const Tracker = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');

    const filtered = mockPermits.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase()) ||
            p.reference.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === 'Todos' || p.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const totals = {
        total: mockPermits.length,
        validated: mockPermits.filter(p => p.status === 'Validado').length,
        inProgress: mockPermits.filter(p => p.status === 'En Curso').length,
        critical: mockPermits.filter(p => p.status === 'Pendiente' || p.status === 'Crítico').length,
    };

    return (
        <div className="flex-1 flex flex-col h-full overflow-y-auto w-full text-white">
            {showModal && <NewPermitModal onClose={() => setShowModal(false)} />}

            <header className="px-4 md:px-8 py-4 md:py-6 pb-2">
                <nav className="flex items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4">
                    <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/')}>Inicio</span>
                    <span className="mx-2">/</span>
                    <span className="text-white">Estatus Gestión de Permisos</span>
                </nav>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase">Estatus Gestión de Permisos</h2>
                        <p className="text-text-secondary text-sm italic mt-1">Matriz de seguimiento y control de permisología sectorial.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 items-end">
                        <div>
                            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1 block mb-1">Estado</label>
                            <select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className="bg-surface-dark border border-border-dark text-white rounded-lg px-3 py-2 text-xs focus:ring-primary focus:border-primary outline-none h-9"
                            >
                                {['Todos', 'Pendiente', 'En Curso', 'Validado', 'Crítico', 'Vencido'].map(s => <option key={s} value={s} className="bg-surface-dark">{s}</option>)}
                            </select>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            <span>Nuevo Permiso</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="px-4 md:px-8 py-4 flex flex-col gap-6 w-full">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Permisos', value: totals.total, color: 'text-white' },
                        { label: 'Aprobados', value: totals.validated, color: 'text-green-400' },
                        { label: 'En Trámite', value: totals.inProgress, color: 'text-yellow-400' },
                        { label: 'Críticos/Pendientes', value: totals.critical, color: 'text-orange-400' },
                    ].map((kpi) => (
                        <div key={kpi.label} className="p-5 rounded-xl bg-surface-dark border border-border-dark">
                            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">{kpi.label}</p>
                            <p className={`text-3xl font-black mt-2 ${kpi.color}`}>{kpi.value}</p>
                            <p className="text-[9px] text-text-secondary mt-1 uppercase">Unidades</p>
                        </div>
                    ))}
                </div>

                {/* Search + Table */}
                <div className="flex flex-col rounded-xl bg-surface-dark border border-border-dark shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-border-dark flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px]">table_chart</span>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white flex-1">Acciones: Estatus Gestión de Permisos</h3>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-[16px]">search</span>
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Buscar permiso, ID o referencia..."
                                className="bg-background-dark border border-border-dark text-white pl-9 pr-4 py-2 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-primary w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-display">
                            <thead className="bg-background-dark/60 text-[10px] font-black text-text-secondary uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4 w-24">ID</th>
                                    <th className="px-6 py-4">Descripción / Referencia</th>
                                    <th className="px-6 py-4">Responsable</th>
                                    <th className="px-6 py-4 text-center">Período</th>
                                    <th className="px-6 py-4">Vencimiento</th>
                                    <th className="px-6 py-4 text-center">Estado</th>
                                    <th className="px-6 py-4 text-center w-16">Ficha</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-dark">
                                {filtered.map((permit) => (
                                    <tr
                                        key={permit.id}
                                        className="hover:bg-background-dark/50 transition-colors cursor-pointer group"
                                        onClick={() => navigate(`/tracker/${permit.id}`)}
                                    >
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-black text-primary tracking-wider">{permit.id}</span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-xs font-bold text-white">{permit.name}</p>
                                            <p className="text-[10px] font-black text-primary/70 uppercase tracking-wider mt-0.5">{permit.reference}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2.5">
                                                <div className={`w-8 h-8 rounded-full ${permit.responsibleColor} flex items-center justify-center text-white text-[10px] font-black shrink-0`}>
                                                    {permit.responsibleInitials}
                                                </div>
                                                <span className="text-xs text-white font-medium">{permit.responsible}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="text-xs font-black text-white bg-background-dark border border-border-dark px-2.5 py-1 rounded-lg">
                                                {permit.period}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-xs font-medium text-slate-300">{permit.expiration}</span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${statusStyles[permit.status]}`}>
                                                {permit.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-[22px]">
                                                chevron_right
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-16 text-center text-text-secondary text-xs italic">
                                            No se encontraron permisos con los filtros aplicados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracker;
