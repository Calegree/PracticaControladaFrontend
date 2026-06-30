import { useEffect, useState } from 'react';
import { fetchUsers, setUserActive, type User, type UserRole } from '../services/api';

const ROLE_STYLES: Record<UserRole, { label: string; cls: string; icon: string }> = {
    administrador: { label: 'Administrador', cls: 'bg-purple-500/15 text-purple-300 border-purple-500/30', icon: 'shield_person' },
    gerente: { label: 'Gerente', cls: 'bg-blue-500/15 text-blue-300 border-blue-500/30', icon: 'badge' },
    tecnico: { label: 'Técnico', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', icon: 'engineering' },
};

function formatDate(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(iso: string | null): string {
    if (!iso) return 'Nunca';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return 'Nunca';
    return d.toLocaleString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<number | null>(null);

    useEffect(() => {
        fetchUsers()
            .then(setUsers)
            .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar usuarios.'))
            .finally(() => setLoading(false));
    }, []);

    const handleToggle = async (user: User) => {
        setTogglingId(user.id);
        try {
            const updated = await setUserActive(user.id, !user.is_active);
            setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error al actualizar el usuario.');
        } finally {
            setTogglingId(null);
        }
    };

    const activos = users.filter((u) => u.is_active).length;

    return (
        <div className="flex-1 flex flex-col h-full bg-background-dark overflow-y-auto w-full text-white">
            <div className="px-4 md:px-8 pt-6 pb-10">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-[30px]">manage_accounts</span>
                        Administración de Usuarios
                    </h1>
                    <p className="text-text-secondary text-sm mt-1">
                        Gestiona las cuentas del sistema: roles, estado y actividad. Vista exclusiva del administrador.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Total usuarios</p>
                        <p className="text-2xl font-black text-white mt-1">{users.length}</p>
                    </div>
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Habilitados</p>
                        <p className="text-2xl font-black text-emerald-400 mt-1">{activos}</p>
                    </div>
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Deshabilitados</p>
                        <p className="text-2xl font-black text-red-400 mt-1">{users.length - activos}</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border-dark bg-background-dark/50">
                                    {['Usuario', 'Correo', 'Tipo', 'Última conexión', 'Creación', 'Estado', 'Acción'].map((h) => (
                                        <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest text-text-secondary whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={7} className="px-4 py-10 text-center text-text-secondary">
                                        <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
                                    </td></tr>
                                ) : users.length === 0 ? (
                                    <tr><td colSpan={7} className="px-4 py-10 text-center text-text-secondary">No hay usuarios registrados.</td></tr>
                                ) : users.map((u) => {
                                    const role = ROLE_STYLES[u.rol] ?? ROLE_STYLES.tecnico;
                                    return (
                                        <tr key={u.id} className={`border-b border-border-dark/50 hover:bg-white/[0.02] transition-colors ${!u.is_active ? 'opacity-60' : ''}`}>
                                            <td className="px-4 py-3 font-bold text-white whitespace-nowrap">{u.nombre}</td>
                                            <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{u.email}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${role.cls}`}>
                                                    <span className="material-symbols-outlined text-[13px]">{role.icon}</span>
                                                    {role.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{formatDateTime(u.last_login)}</td>
                                            <td className="px-4 py-3 text-text-secondary whitespace-nowrap">{formatDate(u.created_at)}</td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                {u.is_active ? (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                                                        <span className="size-1.5 rounded-full bg-emerald-400"></span> Habilitado
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border bg-red-500/15 text-red-400 border-red-500/30">
                                                        <span className="size-1.5 rounded-full bg-red-400"></span> Deshabilitado
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleToggle(u)}
                                                    disabled={togglingId === u.id}
                                                    className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${u.is_active
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'}`}
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">{u.is_active ? 'block' : 'check_circle'}</span>
                                                    {togglingId === u.id ? '...' : (u.is_active ? 'Deshabilitar' : 'Habilitar')}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
