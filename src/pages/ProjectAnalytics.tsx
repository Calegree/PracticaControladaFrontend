import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPermitDetail } from '../services/permits';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';

// Data colors mapping
const COLORS = {
    darkBlue: '#1e3a8a',  // No iniciado / Total
    beige: '#d4c19c',     // En elaboración / Entregado
    green: '#22c55e',     // En trámite
    yellow: '#facc15',    // Auxiliar (donut)
    red: '#ef4444'        // Auxiliar (donut)
};

// MOCK DATA PARA LOS GRÁFICOS (Simulando lo pedido)

const mockMacrozonaData = {
    campamento: { total: 754, pct: 16.7 },
    mina: { total: 100, pct: 16.7 },
    hidrico: { total: 854, pct: 16.7 }
};

const mockPendingByGerencia = [
    { name: 'Sustentabilidad', noIniciado: 6, enElaboracion: 8, enTramite: 2 },
    { name: 'Mina', noIniciado: 5, enElaboracion: 6, enTramite: 4 },
    { name: 'Planta de Procesos', noIniciado: 4, enElaboracion: 3, enTramite: 6 },
    { name: 'Mantenimiento', noIniciado: 5, enElaboracion: 3, enTramite: 5 },
    { name: 'Infraestructura', noIniciado: 8, enElaboracion: 6, enTramite: 2 },
];

const mockReqsByGerencia = [
    { name: 'Sustentabilidad', total: 6, entregados: 8 },
    { name: 'Mina', total: 5, entregados: 6 },
    { name: 'Planta de Procesos', total: 4, entregados: 3 },
    { name: 'Mantenimiento', total: 5, entregados: 3 },
    { name: 'Infraestructura', total: 8, entregados: 6 },
];

const mockPendingByContratista = [
    { name: 'TechMining', noIniciado: 6, enElaboracion: 8, enTramite: 2 },
    { name: 'Cumplimiento Lean', noIniciado: 5, enElaboracion: 6, enTramite: 4 },
    { name: 'EnviroCorp', noIniciado: 4, enElaboracion: 3, enTramite: 6 },
    { name: 'Obras Civil', noIniciado: 5, enElaboracion: 3, enTramite: 5 },
];


const ProjectAnalytics = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState('Cargando...');

    useEffect(() => {
        if (!id) return;
        fetchPermitDetail(decodeURIComponent(id))
            .then(p => setProjectName(p.obraActividad))
            .catch(() => setProjectName('Proyecto Desconocido'));
    }, [id]);

    // Tooltip styles for Recharts
    const tooltipStyle = { backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' };

    // Function to render a custom Donut chart based on the provided images
    const renderMacroDonut = (title: string, data: any, tooltipText?: string) => {
        // We'll simulate the ring visually using simple SVG like in the dashboard 
        // to have the exact same aesthetic (red/green/yellow segments).
        return (
            <div className="flex flex-col items-center flex-1">
                <div className="flex items-center justify-center gap-1.5 mb-6 min-h-[40px] text-center w-full">
                    <h2 className="text-[12px] font-black tracking-widest uppercase text-white leading-tight flex items-center gap-2">
                        {title}
                        {tooltipText && (
                            <div className="relative group flex items-center">
                                <span className="material-symbols-outlined text-[16px] text-text-secondary/50 hover:text-white cursor-help transition-colors">info</span>
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 bg-slate-800 text-white text-[10px] p-2.5 rounded-lg shadow-xl border border-border-dark z-50 text-center font-normal leading-relaxed">
                                    {tooltipText}
                                </div>
                            </div>
                        )}
                    </h2>
                </div>
                <div className="relative size-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" className="text-background-dark fill-none" />
                        {/* Simulation of the 3 segments (green, red, yellow) matching user image */}
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                            className="text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                            strokeDasharray={`120 251.2`} />
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                            className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                            strokeDasharray={`90 251.2`}
                            strokeDashoffset={`-120`} />
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none"
                            className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                            strokeDasharray={`41.2 251.2`}
                            strokeDashoffset={`-210`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-3xl font-black text-white leading-none">{data.total}</span>
                        <span className="text-[9px] text-text-secondary font-black uppercase tracking-widest mt-1">Total</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-background-dark overflow-y-auto w-full text-white pb-12">
            <div className="px-4 md:px-8 pt-6 pb-2 border-b border-border-dark sticky top-0 z-10 bg-background-dark">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                    <div className="flex-1 flex gap-4">
                        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-white transition-colors mt-2">
                            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                        </button>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                                Análisis Predictivo y Vistas Avanzadas
                            </h1>
                            <p className="text-primary text-sm mt-1 uppercase tracking-widest font-black">Permisos del Proyecto {projectName}</p>
                        </div>
                    </div>
                    <button className="bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-400 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm transition-colors self-start lg:self-auto h-fit">
                        Externos
                    </button>
                </div>
            </div>

            <div className="px-4 md:px-8 pt-8 flex flex-col gap-12 max-w-[1600px] mx-auto w-full">

                {/* --- SECCIÓN 1: MACROZONA --- */}
                <section className="bg-surface-dark border border-border-dark rounded-xl shadow-sm p-6 md:p-8">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-sm border-b border-border-dark pb-3 mb-8 font-black uppercase tracking-widest text-center text-white">
                                Permisos del Proyecto {projectName}, según Macrozona
                            </h2>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                {renderMacroDonut("Sector Campamento", mockMacrozonaData.campamento, "Permisos del sector de campamentos del proyecto")}
                                {renderMacroDonut("Sector Mina-Planta", mockMacrozonaData.mina, "Permisos del sector operativo de mina y planta")}
                                {renderMacroDonut("Sector Suministro Hídrico", mockMacrozonaData.hidrico)}
                            </div>
                        </div>

                        <hr className="border-border-dark my-4" />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Pendientes por gerencia responsable */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-[13px] font-black text-white text-center mb-1">
                                    Permisos del Proyecto {projectName} pendientes de obtener, según gerencia responsable
                                </h3>
                                <p className="text-[9px] text-text-secondary text-center mb-6">
                                    Gráfico apilado de tres colores: <span className="text-blue-400">Azul oscuro: No iniciado</span> / <span className="text-[#d4c19c]">Beige plata: En elaboración</span> / <span className="text-green-500">Verde: en trámite</span>
                                </p>
                                <div className="w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={mockPendingByGerencia} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickMargin={10} />
                                            <YAxis stroke="#94a3b8" fontSize={10} />
                                            <RechartsTooltip contentStyle={tooltipStyle} cursor={{ fill: 'transparent' }} />
                                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                                            <Bar dataKey="noIniciado" name="No iniciado" stackId="a" fill={COLORS.darkBlue} />
                                            <Bar dataKey="enElaboracion" name="En elaboración" stackId="a" fill={COLORS.beige} />
                                            <Bar dataKey="enTramite" name="En trámite" stackId="a" fill={COLORS.green} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Pendientes a requerimientos */}
                            <div className="flex flex-col items-center">
                                <h3 className="text-[13px] font-black text-white text-center mb-1">
                                    Gerencias con pendientes de respuestas a requerimientos de información
                                </h3>
                                <p className="text-[9px] text-text-secondary text-center mb-6">
                                    Gráfico dos colores: <span className="text-blue-400">Azul oscuro: cantidad total de requerimientos</span> / <span className="text-[#d4c19c]">beige plata: cantidad de requerimientos entregados</span>
                                </p>
                                <div className="w-full h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={mockReqsByGerencia}
                                            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                            onClick={(data) => {
                                                if (data && data.activeLabel) {
                                                    // Simulación de navegación al tracker para ese requerimiento
                                                    alert(`Navegando al detalle de requerimientos pendientes para la gerencia de ${data.activeLabel}`);
                                                    navigate(`/project-dashboard/${id}`);
                                                }
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickMargin={10} />
                                            <YAxis stroke="#94a3b8" fontSize={10} />
                                            <RechartsTooltip contentStyle={tooltipStyle} cursor={{ fill: '#334155', opacity: 0.4 }} />
                                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                                            {/* Note: In the user image these are grouped side by side, not stacked */}
                                            <Bar dataKey="total" name="Total Req." fill={COLORS.darkBlue} />
                                            <Bar dataKey="entregados" name="Req. Entregados" fill={COLORS.beige} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- SECCIÓN 2: TIPOS Y CONTRATISTAS --- */}
                <section className="bg-surface-dark border border-border-dark rounded-xl shadow-sm p-6 md:p-8">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-sm border-b border-border-dark pb-3 mb-8 font-black uppercase tracking-widest text-center text-white">
                                Permisos del Proyecto {projectName}
                            </h2>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                {renderMacroDonut("Según autoridad", mockMacrozonaData.campamento, "Desglose de permisos agrupados por autoridad competente")}
                                {renderMacroDonut("Según tipo de permiso", mockMacrozonaData.mina, "Desglose por categoría del permiso")}
                                {renderMacroDonut("Según contratista", mockMacrozonaData.hidrico)}
                            </div>
                        </div>

                        <hr className="border-border-dark my-4" />

                        <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
                            <h3 className="text-[13px] font-black text-white text-center mb-1">
                                Permisos del Proyecto {projectName} pendientes de obtener, según contratista
                            </h3>
                            <p className="text-[9px] text-text-secondary text-center mb-6">
                                Gráfico apilado de tres colores: <span className="text-blue-400">Azul oscuro: No iniciado</span> / <span className="text-[#d4c19c]">Beige plata: En elaboración</span> / <span className="text-green-500">Verde: en trámite</span>
                            </p>
                            <div className="w-full h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockPendingByContratista} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="horizontal">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickMargin={10} />
                                        <YAxis stroke="#94a3b8" fontSize={10} />
                                        <RechartsTooltip contentStyle={tooltipStyle} cursor={{ fill: 'transparent' }} />
                                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                                        {/* Based on user image it's just side-by-side or stacked? 
                                            Image explicitly says "Gráfico apilado de tres colores" 
                                            so we use stackId="a" */}
                                        <Bar dataKey="noIniciado" name="No iniciado" stackId="a" fill={COLORS.darkBlue} />
                                        <Bar dataKey="enElaboracion" name="En elaboración" stackId="a" fill={COLORS.beige} />
                                        <Bar dataKey="enTramite" name="En trámite" stackId="a" fill={COLORS.green} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </section>


                {/* --- SECCIÓN 3: CADUCIDAD --- */}
                <section className="bg-surface-dark border border-border-dark rounded-xl shadow-sm p-6 md:p-8">
                    <div className="flex flex-col gap-8">
                        <div>
                            <h2 className="text-sm border-b border-border-dark pb-3 mb-8 font-black uppercase tracking-widest text-center text-white flex items-center justify-center gap-2">
                                Análisis de Caducidad <span className="text-text-secondary font-normal text-xs normal-case tracking-normal">({projectName})</span>
                            </h2>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                {renderMacroDonut("Caducidad", mockMacrozonaData.campamento, "Muestra la cantidad que tienen caducidad y los permisos que no tienen caducidad")}
                                {renderMacroDonut("Tipo de permisos que requieren renovación", mockMacrozonaData.mina, "Para aquellos permisos que tienen caducidad, esta grafica muestra el numero de cada tipo de permisos que requieren renovación")}
                                {renderMacroDonut("Permisos críticos que requieren renovación", mockMacrozonaData.hidrico, "Para aquellos permisos que tienen caducidad, esta gráfica muestra el numero de tipo de permisos que requieren renovación filtrando por aquellos que son críticos")}
                            </div>
                        </div>

                        <hr className="border-border-dark my-4" />

                        <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
                            <h3 className="text-[13px] font-black text-white text-center mb-1">
                                Permisos del Proyecto {projectName} que requieren renovación por gerencia responsable
                            </h3>
                            <p className="text-[9px] text-text-secondary text-center mb-6">
                                Gráfico apilado de tres colores: <span className="text-blue-400">Azul oscuro: No iniciado</span> / <span className="text-[#d4c19c]">Beige plata: En elaboración</span> / <span className="text-green-500">Verde: en trámite</span>
                            </p>
                            <div className="w-full h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockPendingByGerencia} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="horizontal">
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickMargin={10} />
                                        <YAxis stroke="#94a3b8" fontSize={10} />
                                        <RechartsTooltip contentStyle={tooltipStyle} cursor={{ fill: 'transparent' }} />
                                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                                        <Bar dataKey="noIniciado" name="No iniciado" stackId="a" fill={COLORS.darkBlue} />
                                        <Bar dataKey="enElaboracion" name="En elaboración" stackId="a" fill={COLORS.beige} />
                                        <Bar dataKey="enTramite" name="En trámite" stackId="a" fill={COLORS.green} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};

export default ProjectAnalytics;
