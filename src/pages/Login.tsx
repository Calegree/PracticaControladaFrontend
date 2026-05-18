import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Skip auth logic for UI mockup
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#244158] px-4 font-display">
            {/* Logo area */}
            <div className="mb-6 flex items-center justify-center bg-[#244158] w-28 h-28 rounded-lg shadow-inner">
                {/* SVG mock of the lion logo */}
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/20 bg-white/10">
                    <span className="material-symbols-outlined text-white text-[48px]">pets</span>
                </div>
            </div>

            {/* Login Card flex container */}
            <div className="w-full max-w-sm bg-[#1a2130] rounded-2xl shadow-2xl p-8 border border-white/5">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">Bienvenido</h1>
                    <p className="text-sm text-slate-400">Ingresa a tu cuenta de PMO Permisos</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

                    {/* Forgot Password Link */}
                    <div className="flex justify-end mt-1 mb-2">
                        <Link to="#" className="text-xs font-bold text-[#3b82f6] hover:text-[#60a5fa] hover:underline transition-colors">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.23)]"
                    >
                        Iniciar sesión
                    </button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center text-xs text-slate-400">
                    ¿No tienes una cuenta? <Link to="/register" className="font-bold text-[#3b82f6] hover:text-[#60a5fa] hover:underline transition-colors">Regístrate aquí</Link>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-[10px] text-white/40">
                © 2026 PMO Permisos. Todos los derechos reservados.
            </div>
        </div>
    );
};

export default Login;
