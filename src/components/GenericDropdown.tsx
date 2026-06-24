import { useState, useRef } from 'react';

// Dropdown reutilizable usado por las vistas de Obras (Activas y Finalizadas)
// para mantener un estilo estético consistente entre ambas.
const GenericDropdown = ({ label, value, options, onChange }: {
    label: string; value: string; options: string[]; onChange: (v: string) => void
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col gap-1 relative" ref={containerRef}>
            <label className="text-[9px] font-black text-text-secondary uppercase tracking-widest ml-1">{label}</label>
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                onBlur={(e) => { if (!containerRef.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
                className="bg-surface border border-border-dark text-white rounded-lg px-3 py-2 text-xs outline-none transition-all shadow-sm w-full flex items-center justify-between gap-2 hover:border-primary/60"
            >
                <span className="truncate">{value}</span>
                <span className="material-symbols-outlined text-[14px] text-text-secondary">expand_more</span>
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-[#1a1f2e] border border-border-dark rounded-xl shadow-2xl z-50 overflow-hidden max-h-[300px] overflow-y-auto">
                    {options.map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors
                                ${value === opt ? 'bg-primary/20 text-primary' : 'text-white hover:bg-white/5'}`}
                            onClick={() => { onChange(opt); setOpen(false); }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GenericDropdown;
