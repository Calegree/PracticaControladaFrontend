export type PermitStatus = 'Pendiente' | 'En Curso' | 'Validado' | 'Crítico' | 'Vencido';
export type PermitType = 'Ambiental' | 'Social' | 'Operacional' | 'Hídrico' | 'Fauna';

export interface TrackingStep {
    title: string;
    status: 'completed' | 'current' | 'pending';
    date: string;
    desc: string;
}

export interface Permit {
    id: string;
    name: string;
    reference: string;          // e.g. "RCA 245/2018"
    status: PermitStatus;
    type: PermitType;
    responsible: string;
    responsibleInitials: string;
    responsibleColor: string;   // tailwind bg class
    period: string;             // e.g. "2024"
    expiration: string;         // e.g. "12 Oct 2024"
    authority: string;          // e.g. "SEREMI SALUD"
    validity: string;           // e.g. "Acotada" | "Indefinida"
    management: string;         // Gerencia, e.g. "Mina"
    contractor: string;
    description: string;        // Rich text / notes
    tracking: TrackingStep[];
    documents: { name: string; size: string }[];
}
