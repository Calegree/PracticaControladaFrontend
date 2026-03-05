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
