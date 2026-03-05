import type { Permit } from '../types/permit';

export const mockPermits: Permit[] = [
    {
        id: 'RCA-001',
        name: 'Control de emisiones de polvo',
        reference: 'RCA 245/2018',
        status: 'Pendiente',
        type: 'Ambiental',
        responsible: 'Juan Pérez',
        responsibleInitials: 'JP',
        responsibleColor: 'bg-blue-600',
        period: '2024',
        expiration: '12 Oct 2024',
        authority: 'SEREMI SALUD',
        validity: 'Acotada',
        management: 'Mina',
        contractor: 'GESTIONA',
        description: 'Este permiso corresponde a las obligaciones establecidas en la RCA 245/2018. El responsable Juan Pérez debe asegurar el cumplimiento de todas las medidas descritas antes del 12 Oct 2024.',
        tracking: [
            { title: 'Generación Request For Information', status: 'completed', date: '10 Ene 2024', desc: 'Información técnica solicitada al área de ingeniería.' },
            { title: 'Revisión B', status: 'completed', date: '20 Ene 2024', desc: 'Borrador inicial elaborado y enviado a revisión interna.' },
            { title: 'Revisión 0', status: 'current', date: 'Estimado: 15 Feb 2024', desc: 'Corrección de observaciones para emisión de versión final.' },
            { title: 'Ingreso Autoridad', status: 'pending', date: '--', desc: 'Presentación de expediente a SEREMI SALUD.' },
            { title: 'Obtención', status: 'pending', date: '--', desc: 'Aprobación y resolución oficial de la autoridad.' }
        ],
        documents: [{ name: 'RCA_245_Firmada.pdf', size: '2.4 MB' }]
    },
    {
        id: 'C-204',
        name: 'Control de Emisiones Material Particulado',
        reference: 'RCA 254 - EXPANSIÓN FASE II',
        status: 'En Curso',
        type: 'Ambiental',
        responsible: 'María Silva',
        responsibleInitials: 'MS',
        responsibleColor: 'bg-purple-600',
        period: '2024',
        expiration: '15 Oct 2024',
        authority: 'SERNAGEOMIN',
        validity: 'Indefinida',
        management: 'Planta de Procesos',
        contractor: 'GESTIONA',
        description: 'Permiso de control de emisiones para la expansión fase II, relacionado a la RCA 254.',
        tracking: [
            { title: 'Generación Request For Information', status: 'completed', date: '5 Feb 2024', desc: 'Solicitud técnica completada.' },
            { title: 'Revisión B', status: 'completed', date: '20 Feb 2024', desc: 'Borrador revisado y aprobado internamente.' },
            { title: 'Revisión 0', status: 'completed', date: '5 Mar 2024', desc: 'Versión final lista para ingreso.' },
            { title: 'Ingreso Autoridad', status: 'current', date: 'Estimado: 01 Abr 2024', desc: 'Expediente enviado a Sernageomin.' },
            { title: 'Obtención', status: 'pending', date: '--', desc: 'Pendiente de resolución oficial.' }
        ],
        documents: []
    },
    {
        id: 'BIO-09',
        name: 'Monitoreo de fauna altoandina',
        reference: 'EIA FAENA NORTE',
        status: 'Validado',
        type: 'Fauna',
        responsible: 'Carlos Ruiz',
        responsibleInitials: 'CR',
        responsibleColor: 'bg-green-600',
        period: '2024',
        expiration: '30 Nov 2024',
        authority: 'SAG',
        validity: 'Acotada',
        management: 'Mina',
        contractor: 'BIOAMBIENTAL',
        description: 'Monitoreo trimestral de especies altoandinas según las condiciones del EIA Faena Norte.',
        tracking: [
            { title: 'Generación Request For Information', status: 'completed', date: '10 Mar 2024', desc: 'Documentación técnica entregada.' },
            { title: 'Revisión B', status: 'completed', date: '25 Mar 2024', desc: 'Revisión aprobada.' },
            { title: 'Revisión 0', status: 'completed', date: '10 Abr 2024', desc: 'Versión final aprobada.' },
            { title: 'Ingreso Autoridad', status: 'completed', date: '20 Abr 2024', desc: 'Ingresado al SAG.' },
            { title: 'Obtención', status: 'completed', date: '05 May 2024', desc: 'Permiso obtenido y validado.' }
        ],
        documents: [{ name: 'EIA_Faena_Norte.pdf', size: '8.1 MB' }, { name: 'Monitoreo_Q1_2024.pdf', size: '1.2 MB' }]
    },
    {
        id: 'WAT-55',
        name: 'Medición niveles freáticos pozo 4',
        reference: 'RCA 112/2015',
        status: 'Pendiente',
        type: 'Hídrico',
        responsible: 'Ana Morales',
        responsibleInitials: 'AM',
        responsibleColor: 'bg-cyan-600',
        period: '2024',
        expiration: '02 Dic 2024',
        authority: 'DGA',
        validity: 'Acotada',
        management: 'Servicios Generales',
        contractor: 'HIDROGEA',
        description: 'Medición y reporte de niveles freáticos en el pozo 4, sector norte, bajo los estándares establecidos por la RCA 112/2015.',
        tracking: [
            { title: 'Generación Request For Information', status: 'completed', date: '15 Abr 2024', desc: 'Solicitud de datos hidrológicos completada.' },
            { title: 'Revisión B', status: 'current', date: 'Estimado: 30 Abr 2024', desc: 'En revisión interna.' },
            { title: 'Revisión 0', status: 'pending', date: '--', desc: 'Pendiente.' },
            { title: 'Ingreso Autoridad', status: 'pending', date: '--', desc: 'Pendiente ingreso a DGA.' },
            { title: 'Obtención', status: 'pending', date: '--', desc: 'Pendiente.' }
        ],
        documents: []
    },
    {
        id: 'SOC-12',
        name: 'Programa becas escolares Colla',
        reference: 'ACUERDO SOCIAL 2023',
        status: 'En Curso',
        type: 'Social',
        responsible: 'Roberto Díaz',
        responsibleInitials: 'RD',
        responsibleColor: 'bg-orange-600',
        period: '2025',
        expiration: '15 Ene 2025',
        authority: 'MUNICIPALIDAD',
        validity: 'Indefinida',
        management: 'Sostenibilidad',
        contractor: 'UCSC',
        description: 'Programa de becas educacionales para niños de la comunidad Colla, comprometido en el Acuerdo Social 2023.',
        tracking: [
            { title: 'Generación Request For Information', status: 'completed', date: '01 Ene 2024', desc: 'Levantamiento de beneficiarios.' },
            { title: 'Revisión B', status: 'completed', date: '15 Ene 2024', desc: 'Lista de beneficiarios aprobada.' },
            { title: 'Revisión 0', status: 'completed', date: '01 Feb 2024', desc: 'Convenio elaborado.' },
            { title: 'Ingreso Autoridad', status: 'current', date: 'Estimado: 01 Mar 2024', desc: 'Firmando acuerdo con municipalidad.' },
            { title: 'Obtención', status: 'pending', date: '--', desc: 'Pendiente de firma definitiva.' }
        ],
        documents: [{ name: 'Acuerdo_Social_2023.pdf', size: '0.8 MB' }]
    }
];
