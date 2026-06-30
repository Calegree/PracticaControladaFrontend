// Campos de un permiso, reutilizados en "Crear obra" (multi-permiso) y en el
// modal "Agregar permiso" del listado de obras. Mantiene inputs consistentes.

export interface PermitFieldsValue {
    codigo_aconex: string;
    tipo_permiso: string;
    permiso_aplicable: string;
    autoridad: string;
    contratista_responsable: string;
    origen_permiso: string;
    estado: string;
    macrozona: string;
}

export const EMPTY_PERMIT: PermitFieldsValue = {
    codigo_aconex: '', tipo_permiso: '', permiso_aplicable: '', autoridad: '',
    contratista_responsable: '', origen_permiso: '', estado: 'NO INICIADO', macrozona: '',
};

const inputCls = "bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none focus:border-primary/60 placeholder:text-text-secondary/40 w-full";
const lblCls = "text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1";

// Macrozonas válidas de la faena (valores fijos del dato real).
const MACROZONAS = ['Faena Salares Norte', 'Mina-Planta', 'Campamento', 'Off-Site', 'Suministro hídrico'];

const PermitFields = ({ value, onChange, autoridadOptions, contratistaOptions }: {
    value: PermitFieldsValue;
    onChange: (v: PermitFieldsValue) => void;
    autoridadOptions: string[];
    contratistaOptions: string[];
}) => {
    const set = (patch: Partial<PermitFieldsValue>) => onChange({ ...value, ...patch });
    const autoridades = autoridadOptions.filter(a => a !== 'Todas');
    const contratistas = contratistaOptions.filter(c => c !== 'Todos');
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
                <label className={lblCls}>Código Aconex *</label>
                <input value={value.codigo_aconex} onChange={e => set({ codigo_aconex: e.target.value })} placeholder="GFSN01-DD-LE-..." className={`${inputCls} font-mono`} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className={lblCls}>Autoridad</label>
                    <select value={value.autoridad} onChange={e => set({ autoridad: e.target.value })} className={inputCls}>
                        <option value="" className="bg-[#1e293b]">—</option>
                        {autoridades.map(a => <option key={a} value={a} className="bg-[#1e293b]">{a}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className={lblCls}>Contratista</label>
                    <select value={value.contratista_responsable} onChange={e => set({ contratista_responsable: e.target.value })} className={inputCls}>
                        <option value="" className="bg-[#1e293b]">—</option>
                        {contratistas.map(c => <option key={c} value={c} className="bg-[#1e293b]">{c}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className={lblCls}>Origen</label>
                    <select value={value.origen_permiso} onChange={e => set({ origen_permiso: e.target.value })} className={inputCls}>
                        <option value="" className="bg-[#1e293b]">—</option>
                        <option value="RCA" className="bg-[#1e293b]">RCA</option>
                        <option value="GDC" className="bg-[#1e293b]">GDC</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className={lblCls}>Estado</label>
                    <select value={value.estado} onChange={e => set({ estado: e.target.value })} className={inputCls}>
                        {['NO INICIADO', 'EN ELABORACIÓN', 'EN REVISIÓN', 'APROBADO', 'RECHAZADO'].map(s => <option key={s} value={s} className="bg-[#1e293b]">{s}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className={lblCls}>Macrozona</label>
                    <select value={value.macrozona} onChange={e => set({ macrozona: e.target.value })} className={inputCls}>
                        <option value="" className="bg-[#1e293b]">—</option>
                        {MACROZONAS.map(m => <option key={m} value={m} className="bg-[#1e293b]">{m}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PermitFields;
