import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, type UserRole } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState<UserRole>('tecnico');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setLoading(true);
        try {
            await registerUser(name, email, password, rol);
            navigate('/login');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la cuenta.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#244158] px-4 font-display py-12">
            {/* Logo area */}
            <div className="mb-6 flex items-center justify-center bg-[#244158] w-28 h-28 rounded-lg shadow-inner">
                {/* SVG mock of the lion logo */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/20 bg-white/10">
                    <span className="material-symbols-outlined text-white text-[48px]">pets</span>
                </div>
            </div>

            {/* Register Card flex container */}
            <div className="w-full max-w-[400px] bg-[#1a2130] rounded-2xl shadow-2xl p-8 border border-white/5">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h1>
                    <p className="text-sm text-slate-400">Regístrate en la plataforma PMO Permisos</p>
                </div>

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    {/* Name Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-white">Nombre completo</label>
                        <input
                            type="text"
                            required
                            placeholder="Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-[#131924] border border-[#263145] text-white rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-[#1a2130]"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-white">Correo electrónico</label>
                        <input
                            type="email"
                            required
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#131924] border border-[#263145] text-white rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-[#1a2130]"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-white">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#131924] border border-[#263145] text-white rounded-lg pl-4 pr-11 py-3 text-sm outline-none transition-all w-full placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-[#1a2130]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors flex items-center"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-white">Confirmar contraseña</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="bg-[#131924] border border-[#263145] text-white rounded-lg pl-4 pr-11 py-3 text-sm outline-none transition-all w-full placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-[#1a2130]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors flex items-center"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Role Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-white">Tipo de usuario</label>
                        <select
                            value={rol}
                            onChange={(e) => setRol(e.target.value as UserRole)}
                            className="bg-[#131924] border border-[#263145] text-white rounded-lg px-4 py-3 text-sm outline-none transition-all focus:border-blue-500/50 focus:bg-[#1a2130]"
                        >
                            <option value="tecnico" className="bg-[#1a2130]">Técnico</option>
                            <option value="gerente" className="bg-[#1a2130]">Gerente</option>
                            <option value="administrador" className="bg-[#1a2130]">Administrador</option>
                        </select>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg px-3 py-2.5 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px]">error</span>
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)]"
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-8 text-center text-xs text-slate-400">
                    ¿Ya tienes una cuenta? <Link to="/login" className="font-bold text-[#3b82f6] hover:text-[#60a5fa] hover:underline transition-colors">Inicia sesión</Link>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-[10px] text-white/40">
                © 2026 PMO Permisos. Todos los derechos reservados.
            </div>
        </div>
    );
};

export default Register;
