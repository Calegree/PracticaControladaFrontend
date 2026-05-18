import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('parsed_data.json', 'utf8'));
const validRows = rawData.filter(r => r['Obra / Actividad*']).slice(0, 150);

const generateCurve = (months, maxBudget, delayActuals = false) => {
    const curve = [];
    let currentPlan = 0;
    let currentActual = 0;
    for (let i = 1; i <= months; i++) {
        const progress = (i / months) ** 2;
        currentPlan = Math.round(maxBudget * progress);
        let actual = null;
        if (i <= months - 2 || !delayActuals) {
            currentActual = delayActuals ? Math.round(currentPlan * 0.8) : currentPlan;
            actual = currentActual;
        }
        curve.push({
            month: "Mes " + i,
            plan: currentPlan,
            actual: actual
        });
    }
    return curve;
};

const mockProjectsHardcoded = `
export const mockProjects: Project[] = [
    { id: 'PRY-001', name: 'Expansión Planta de Filtros Norte', reference: 'PROY-2024-001 — GERENCIA MINA', responsible: 'Carlos Meneses', responsibleInitials: 'CM', responsibleColor: 'bg-blue-600', period: '2024', endDate: '30 Jun 2025', status: 'Al Día', management: 'Mina', progress: 55, plannedProgress: 50 },
    { id: 'PRY-002', name: 'Instalación Sistema de Monitoreo Hídrico', reference: 'PROY-2024-002 — RCA 245/2020', responsible: 'Ana Morales', responsibleInitials: 'AM', responsibleColor: 'bg-cyan-600', period: '2024', endDate: '15 Nov 2024', status: 'Atrasado', management: 'Servicios Generales', progress: 30, plannedProgress: 65 },
    { id: 'PRY-003', name: 'Programa de Reforestación Zona Sur', reference: 'PROY-2024-003 — EIA FAENA SUR', responsible: 'Valentina Rojas', responsibleInitials: 'VR', responsibleColor: 'bg-green-600', period: '2024', endDate: '31 Dic 2024', status: 'Adelantado', management: 'Sostenibilidad', progress: 80, plannedProgress: 60 },
    { id: 'PRY-004', name: 'Mejora Infraestructura Vial Acceso Faena', reference: 'PROY-2024-004 — MUNICIPALIDAD', responsible: 'Roberto Díaz', responsibleInitials: 'RD', responsibleColor: 'bg-orange-600', period: '2025', endDate: '28 Feb 2026', status: 'Al Día', management: 'Servicios Generales', progress: 15, plannedProgress: 12 },
    { id: 'PRY-005', name: 'Automatización Control Emisiones MP10', reference: 'PROY-2025-001 — SEREMI SALUD', responsible: 'Juan Pérez', responsibleInitials: 'JP', responsibleColor: 'bg-purple-600', period: '2025', endDate: '15 Sep 2025', status: 'Al Día', management: 'Planta de Procesos', progress: 22, plannedProgress: 20 },
    { id: 'PRY-006', name: 'Auditoría Ambiental Integrada Sector Norte', reference: 'PROY-2024-005 — SMA', responsible: 'María Silva', responsibleInitials: 'MS', responsibleColor: 'bg-red-600', period: '2024', endDate: '10 Oct 2024', status: 'Atrasado', management: 'Mina', progress: 40, plannedProgress: 90 },
];
`;

const mockProjectsData = validRows.map((row, i) => {
    let rawStatus = row['Estado*'] ? row['Estado*'].toString().toUpperCase() : '';
    let dbStatus = 'En Proceso';
    if (rawStatus.includes('APROBADO')) dbStatus = 'Finalizado';
    else if (rawStatus.includes('RECHAZADO') || rawStatus.includes('INICIADO')) dbStatus = 'Atrasado';

    const maxB = 500 + Math.random() * 1500;

    const delivs = [];
    const rndCount = Math.floor(Math.random() * 3);
    for (let j = 0; j < rndCount; j++) {
        delivs.push({
            id: i.toString() + "-" + j.toString(),
            contratista: row['Contratista Responsable*'] || 'Asignado',
            contrato: "C-" + (100 + j),
            codigo: "COD-" + j,
            mesAno: "0" + ((j + 1) % 9 + 1) + "-2025",
            plan: 100 + j * 10,
            actual: 80 + j * 10,
            acumulado: 180 + j * 20
        });
    }

    return {
        id: "proyecto-" + i,
        name: row['Obra / Actividad*'] || 'Proyecto',
        category: dbStatus === 'Finalizado' ? 'Inactivo' : 'Activo',
        dashboardStatus: dbStatus,
        gerencia: row['Gerencia'] || 'Gerencia General',
        wbs: row['WBS_Nombre'] || row['WBS homologado'] || 'General',
        autoridad: row['Autoridad*'] || 'N/A',
        contratistaResponsable: row['Contratista Responsable*'] || 'N/A',
        budgetProgressPlan: Math.round(50 + Math.random() * 50),
        budgetProgressActual: Math.round(40 + Math.random() * 50),
        budgetCurve: generateCurve(6 + Math.floor(Math.random() * 6), maxB, dbStatus === 'Atrasado'),
        deliverables: delivs
    };
});

const fileContent = "import type { Project, ProjectData } from '../types/project';\n\n" + mockProjectsHardcoded + "\n\nexport const mockProjectsData: ProjectData[] = " + JSON.stringify(mockProjectsData, null, 4) + ";\n";
fs.writeFileSync('src/data/mockProjects.ts', fileContent);
console.log('Successfully generated src/data/mockProjects.ts');
