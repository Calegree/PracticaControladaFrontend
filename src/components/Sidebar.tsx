import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Sidebar = () => {
    const links = [
        { to: "/", icon: "space_dashboard", label: "Dashboard" },
        { to: "/tracker", icon: "route", label: "Seguimiento Permisos" },
        { to: "/gantt", icon: "list_alt", label: "Planificación" },
        { to: "/commitments", icon: "assignment", label: "Compromisos" }
    ];

    const [showLogout, setShowLogout] = useState(false);

    return (
        <div className="w-64 bg-background-dark h-full text-white flex flex-col transition-all duration-300 border-r border-border-dark">
            <div className="h-16 flex items-center px-6 border-b border-border-dark">
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary/20 text-primary">
                        <span className="material-symbols-outlined text-[20px]">diamond</span>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">PMO Permisos</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                ? "bg-primary text-white font-medium shadow-sm"
                                : "text-text-secondary hover:bg-surface-dark-lighter hover:text-white"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">{link.icon}</span>
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto p-6 border-t border-border-dark space-y-4">
                <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-surface-dark-lighter border border-border-dark hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px] text-text-secondary">language</span>
                        <span className="text-xs font-medium text-white">Idioma</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                        ES
                    </span>
                </button>
                <div className="relative">
                    <div
                        className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <div className="size-10 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://picsum.photos/seed/user/100/100")' }}></div>
                        <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-medium truncate text-white">Roberto Díaz</p>
                            <p className="text-[10px] text-text-secondary truncate">Director de Medio Ambiente</p>
                        </div>
                    </div>

                    {showLogout && (
                        <div className="absolute bottom-full left-0 mb-4 w-full bg-background-dark border border-border-dark rounded-xl shadow-xl overflow-hidden z-20 animate-in slide-in-from-bottom-2 duration-200">
                            <button className="w-full text-left px-4 py-3 hover:bg-white/5 text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">logout</span>
                                Cerrar Sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
