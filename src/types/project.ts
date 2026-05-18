export type ProjectStatus = 'Al Día' | 'Adelantado' | 'Atrasado';

export interface Project {
    id: string;
    name: string;
    reference: string;
    responsible: string;
    responsibleInitials: string;
    responsibleColor: string;
    period: string;
    endDate: string;
    status: ProjectStatus;
    management: string;
    progress: number; // 0-100
    plannedProgress: number; // 0-100 what was expected
}

export type ProjectCategory = 'Activo' | 'Inactivo';
export type DashboardProjectStatus = 'Finalizado' | 'En Proceso' | 'Atrasado';

export interface BudgetPoint {
    month: string;
    plan: number;
    actual: number | null;
}

export interface ContractDeliverable {
    id: string;
    contratista: string;
    contrato: string;
    codigo: string;
    mesAno: string; // MM-AA
    plan: number;
    actual: number | null;
    acumulado: number | null;
}

export interface ProjectData {
    id: string;
    name: string;
    category: ProjectCategory;
    dashboardStatus: DashboardProjectStatus;
    gerencia: string;
    wbs: string;
    autoridad?: string;
    contratistaResponsable?: string;

    // For Internal Dashboard
    budgetProgressPlan: number;
    budgetProgressActual: number;
    budgetCurve: BudgetPoint[];
    deliverables: ContractDeliverable[];
}
