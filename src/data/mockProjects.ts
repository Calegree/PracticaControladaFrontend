import type { Project, ProjectData } from '../types/project';


export const mockProjects: Project[] = [
    { id: 'PRY-001', name: 'Expansión Planta de Filtros Norte', reference: 'PROY-2024-001 — GERENCIA MINA', responsible: 'Carlos Meneses', responsibleInitials: 'CM', responsibleColor: 'bg-blue-600', period: '2024', endDate: '30 Jun 2025', status: 'Al Día', management: 'Mina', progress: 55, plannedProgress: 50 },
    { id: 'PRY-002', name: 'Instalación Sistema de Monitoreo Hídrico', reference: 'PROY-2024-002 — RCA 245/2020', responsible: 'Ana Morales', responsibleInitials: 'AM', responsibleColor: 'bg-cyan-600', period: '2024', endDate: '15 Nov 2024', status: 'Atrasado', management: 'Servicios Generales', progress: 30, plannedProgress: 65 },
    { id: 'PRY-003', name: 'Programa de Reforestación Zona Sur', reference: 'PROY-2024-003 — EIA FAENA SUR', responsible: 'Valentina Rojas', responsibleInitials: 'VR', responsibleColor: 'bg-green-600', period: '2024', endDate: '31 Dic 2024', status: 'Adelantado', management: 'Sostenibilidad', progress: 80, plannedProgress: 60 },
    { id: 'PRY-004', name: 'Mejora Infraestructura Vial Acceso Faena', reference: 'PROY-2024-004 — MUNICIPALIDAD', responsible: 'Roberto Díaz', responsibleInitials: 'RD', responsibleColor: 'bg-orange-600', period: '2025', endDate: '28 Feb 2026', status: 'Al Día', management: 'Servicios Generales', progress: 15, plannedProgress: 12 },
    { id: 'PRY-005', name: 'Automatización Control Emisiones MP10', reference: 'PROY-2025-001 — SEREMI SALUD', responsible: 'Juan Pérez', responsibleInitials: 'JP', responsibleColor: 'bg-purple-600', period: '2025', endDate: '15 Sep 2025', status: 'Al Día', management: 'Planta de Procesos', progress: 22, plannedProgress: 20 },
    { id: 'PRY-006', name: 'Auditoría Ambiental Integrada Sector Norte', reference: 'PROY-2024-005 — SMA', responsible: 'María Silva', responsibleInitials: 'MS', responsibleColor: 'bg-red-600', period: '2024', endDate: '10 Oct 2024', status: 'Atrasado', management: 'Mina', progress: 40, plannedProgress: 90 },
];


export const mockProjectsData: ProjectData[] = [
    {
        "id": "proyecto-0",
        "name": "BARRIO CIVICO (PARCIAL N°1)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Civic District",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 56,
        "budgetProgressActual": 88,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 16
            },
            {
                "month": "Mes 2",
                "plan": 80,
                "actual": 64
            },
            {
                "month": "Mes 3",
                "plan": 180,
                "actual": 144
            },
            {
                "month": "Mes 4",
                "plan": 319,
                "actual": 255
            },
            {
                "month": "Mes 5",
                "plan": 499,
                "actual": 399
            },
            {
                "month": "Mes 6",
                "plan": 719,
                "actual": 575
            },
            {
                "month": "Mes 7",
                "plan": 978,
                "actual": 782
            },
            {
                "month": "Mes 8",
                "plan": 1278,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 1617,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "0-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "0-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-1",
        "name": "BODEGA INTERNACIONAL",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 84,
        "budgetProgressActual": 42,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 47,
                "actual": 38
            },
            {
                "month": "Mes 3",
                "plan": 105,
                "actual": 84
            },
            {
                "month": "Mes 4",
                "plan": 187,
                "actual": 150
            },
            {
                "month": "Mes 5",
                "plan": 292,
                "actual": 234
            },
            {
                "month": "Mes 6",
                "plan": 420,
                "actual": 336
            },
            {
                "month": "Mes 7",
                "plan": 571,
                "actual": 457
            },
            {
                "month": "Mes 8",
                "plan": 746,
                "actual": 597
            },
            {
                "month": "Mes 9",
                "plan": 945,
                "actual": 756
            },
            {
                "month": "Mes 10",
                "plan": 1166,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 1411,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "1-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "1-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-2",
        "name": "DP.1 (PROVISIONAL)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Generación De Energía",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 63,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 34,
                "actual": 27
            },
            {
                "month": "Mes 2",
                "plan": 136,
                "actual": 109
            },
            {
                "month": "Mes 3",
                "plan": 306,
                "actual": 245
            },
            {
                "month": "Mes 4",
                "plan": 543,
                "actual": 434
            },
            {
                "month": "Mes 5",
                "plan": 849,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1223,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "2-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "2-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-3",
        "name": "DP.3",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Generación De Energía",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 82,
        "budgetProgressActual": 48,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 17,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 68,
                "actual": 54
            },
            {
                "month": "Mes 3",
                "plan": 154,
                "actual": 123
            },
            {
                "month": "Mes 4",
                "plan": 273,
                "actual": 218
            },
            {
                "month": "Mes 5",
                "plan": 427,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 614,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "3-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-4",
        "name": "PAA1",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": " Fuel System",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 51,
        "budgetProgressActual": 76,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 13,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 54,
                "actual": 43
            },
            {
                "month": "Mes 3",
                "plan": 121,
                "actual": 97
            },
            {
                "month": "Mes 4",
                "plan": 215,
                "actual": 172
            },
            {
                "month": "Mes 5",
                "plan": 335,
                "actual": 268
            },
            {
                "month": "Mes 6",
                "plan": 483,
                "actual": 386
            },
            {
                "month": "Mes 7",
                "plan": 657,
                "actual": 526
            },
            {
                "month": "Mes 8",
                "plan": 859,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 1087,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-5",
        "name": "SITIO DE EXPLOSIVOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Mina",
        "wbs": "Explosives Magazine",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 76,
        "budgetProgressActual": 42,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 10,
                "actual": 8
            },
            {
                "month": "Mes 2",
                "plan": 42,
                "actual": 34
            },
            {
                "month": "Mes 3",
                "plan": 94,
                "actual": 75
            },
            {
                "month": "Mes 4",
                "plan": 168,
                "actual": 134
            },
            {
                "month": "Mes 5",
                "plan": 262,
                "actual": 210
            },
            {
                "month": "Mes 6",
                "plan": 377,
                "actual": 302
            },
            {
                "month": "Mes 7",
                "plan": 513,
                "actual": 410
            },
            {
                "month": "Mes 8",
                "plan": 670,
                "actual": 536
            },
            {
                "month": "Mes 9",
                "plan": 848,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 1047,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "5-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "5-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-6",
        "name": "PAQUETE 4 (TALLER DE CAMIONES PERMANENTE Y DESMONTADORA DE NEUMÁTICO)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 87,
        "budgetProgressActual": 72,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 16
            },
            {
                "month": "Mes 2",
                "plan": 80,
                "actual": 64
            },
            {
                "month": "Mes 3",
                "plan": 180,
                "actual": 144
            },
            {
                "month": "Mes 4",
                "plan": 321,
                "actual": 257
            },
            {
                "month": "Mes 5",
                "plan": 501,
                "actual": 401
            },
            {
                "month": "Mes 6",
                "plan": 722,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 982,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "6-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-7",
        "name": "OPTIMIZACIÓN PLATAFORMA 17, 18",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 79,
        "budgetProgressActual": 68,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 48,
                "actual": 38
            },
            {
                "month": "Mes 3",
                "plan": 108,
                "actual": 86
            },
            {
                "month": "Mes 4",
                "plan": 192,
                "actual": 154
            },
            {
                "month": "Mes 5",
                "plan": 299,
                "actual": 239
            },
            {
                "month": "Mes 6",
                "plan": 431,
                "actual": 345
            },
            {
                "month": "Mes 7",
                "plan": 587,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 766,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "7-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-8",
        "name": "PLATAFORMA 17",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNORECURSOS",
        "budgetProgressPlan": 74,
        "budgetProgressActual": 71,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 30,
                "actual": 24
            },
            {
                "month": "Mes 2",
                "plan": 120,
                "actual": 96
            },
            {
                "month": "Mes 3",
                "plan": 270,
                "actual": 216
            },
            {
                "month": "Mes 4",
                "plan": 480,
                "actual": 384
            },
            {
                "month": "Mes 5",
                "plan": 749,
                "actual": 599
            },
            {
                "month": "Mes 6",
                "plan": 1079,
                "actual": 863
            },
            {
                "month": "Mes 7",
                "plan": 1469,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 1918,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "8-0",
                "contratista": "TECNORECURSOS",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-9",
        "name": "PLATAFORMA 18",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNORECURSOS",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 71,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 58,
                "actual": 46
            },
            {
                "month": "Mes 3",
                "plan": 131,
                "actual": 105
            },
            {
                "month": "Mes 4",
                "plan": 234,
                "actual": 187
            },
            {
                "month": "Mes 5",
                "plan": 365,
                "actual": 292
            },
            {
                "month": "Mes 6",
                "plan": 526,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 716,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "9-0",
                "contratista": "TECNORECURSOS",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-10",
        "name": "RED AGUA POTABLE - SECTOR PLANTA (INCORPORACIÓN DE ESTANQUE BARRIO CÍVICO)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Civic District",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 78,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 27,
                "actual": 22
            },
            {
                "month": "Mes 2",
                "plan": 109,
                "actual": 87
            },
            {
                "month": "Mes 3",
                "plan": 244,
                "actual": 195
            },
            {
                "month": "Mes 4",
                "plan": 434,
                "actual": 347
            },
            {
                "month": "Mes 5",
                "plan": 678,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 977,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "10-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-11",
        "name": "BOTADERO DE ESTÉRILES NORTE (PAS 156 VP-0301-45)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Waste Storage Facility",
        "autoridad": "DGA",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 93,
        "budgetProgressActual": 43,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 25,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 101,
                "actual": 81
            },
            {
                "month": "Mes 3",
                "plan": 228,
                "actual": 182
            },
            {
                "month": "Mes 4",
                "plan": 406,
                "actual": 325
            },
            {
                "month": "Mes 5",
                "plan": 634,
                "actual": 507
            },
            {
                "month": "Mes 6",
                "plan": 913,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1243,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-12",
        "name": "RAJO SALARES NORTE (PAS 156 VP-0301-37)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "DGA",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 70,
        "budgetProgressActual": 77,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 13,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 50,
                "actual": 40
            },
            {
                "month": "Mes 3",
                "plan": 113,
                "actual": 90
            },
            {
                "month": "Mes 4",
                "plan": 200,
                "actual": 160
            },
            {
                "month": "Mes 5",
                "plan": 313,
                "actual": 250
            },
            {
                "month": "Mes 6",
                "plan": 451,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 614,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-13",
        "name": "PLANTA DE PROCESOS (PAS 156 VP-0301-35)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "DGA",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 62,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 62,
                "actual": 50
            },
            {
                "month": "Mes 3",
                "plan": 141,
                "actual": 113
            },
            {
                "month": "Mes 4",
                "plan": 250,
                "actual": 200
            },
            {
                "month": "Mes 5",
                "plan": 391,
                "actual": 313
            },
            {
                "month": "Mes 6",
                "plan": 562,
                "actual": 450
            },
            {
                "month": "Mes 7",
                "plan": 766,
                "actual": 613
            },
            {
                "month": "Mes 8",
                "plan": 1000,
                "actual": 800
            },
            {
                "month": "Mes 9",
                "plan": 1266,
                "actual": 1013
            },
            {
                "month": "Mes 10",
                "plan": 1562,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 1891,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "13-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "13-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-14",
        "name": "BOTADERO DE ESTÉRILES NORTE (PAS 157 VP-0301-38)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Mina",
        "wbs": "Tailings & Waste Storage",
        "autoridad": "DGA",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 81,
        "budgetProgressActual": 55,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 39,
                "actual": 31
            },
            {
                "month": "Mes 2",
                "plan": 157,
                "actual": 126
            },
            {
                "month": "Mes 3",
                "plan": 354,
                "actual": 283
            },
            {
                "month": "Mes 4",
                "plan": 630,
                "actual": 504
            },
            {
                "month": "Mes 5",
                "plan": 984,
                "actual": 787
            },
            {
                "month": "Mes 6",
                "plan": 1417,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1928,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "14-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "14-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-15",
        "name": "CANAL DE DERIVACIÓN SUPERIOR E INFERIOR (PAS 157 VP-0301-38)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Plant Area Preparation",
        "autoridad": "DGA",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 91,
        "budgetProgressActual": 72,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 9,
                "actual": 7
            },
            {
                "month": "Mes 2",
                "plan": 38,
                "actual": 30
            },
            {
                "month": "Mes 3",
                "plan": 85,
                "actual": 68
            },
            {
                "month": "Mes 4",
                "plan": 151,
                "actual": 121
            },
            {
                "month": "Mes 5",
                "plan": 236,
                "actual": 189
            },
            {
                "month": "Mes 6",
                "plan": 340,
                "actual": 272
            },
            {
                "month": "Mes 7",
                "plan": 462,
                "actual": 370
            },
            {
                "month": "Mes 8",
                "plan": 604,
                "actual": 483
            },
            {
                "month": "Mes 9",
                "plan": 764,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 944,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "15-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "15-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-16",
        "name": "CAMP. SALARES ETAPA 2 (PT)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 93,
        "budgetProgressActual": 43,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 64,
                "actual": 51
            },
            {
                "month": "Mes 3",
                "plan": 143,
                "actual": 114
            },
            {
                "month": "Mes 4",
                "plan": 255,
                "actual": 204
            },
            {
                "month": "Mes 5",
                "plan": 398,
                "actual": 318
            },
            {
                "month": "Mes 6",
                "plan": 574,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 781,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "16-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-17",
        "name": "CAMP. SALARES EDIF. C4",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 58,
        "budgetProgressActual": 43,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 40,
                "actual": 32
            },
            {
                "month": "Mes 2",
                "plan": 159,
                "actual": 127
            },
            {
                "month": "Mes 3",
                "plan": 358,
                "actual": 286
            },
            {
                "month": "Mes 4",
                "plan": 636,
                "actual": 509
            },
            {
                "month": "Mes 5",
                "plan": 994,
                "actual": 795
            },
            {
                "month": "Mes 6",
                "plan": 1431,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1948,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-18",
        "name": "OPTIMIZACIÓN PLATAFORMA 17, 18",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 97,
        "budgetProgressActual": 75,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 9,
                "actual": 7
            },
            {
                "month": "Mes 2",
                "plan": 36,
                "actual": 29
            },
            {
                "month": "Mes 3",
                "plan": 81,
                "actual": 65
            },
            {
                "month": "Mes 4",
                "plan": 144,
                "actual": 115
            },
            {
                "month": "Mes 5",
                "plan": 225,
                "actual": 180
            },
            {
                "month": "Mes 6",
                "plan": 324,
                "actual": 259
            },
            {
                "month": "Mes 7",
                "plan": 442,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 577,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "18-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "18-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-19",
        "name": "BODEGA, TALLER DE MANTENIMIENTO Y PLANTA DE PROCESOS, EDIFICIO MOLIENDA, OFICINA CHANCADOR PRIMARIO, REFINERÍA",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 96,
        "budgetProgressActual": 84,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 33,
                "actual": 26
            },
            {
                "month": "Mes 2",
                "plan": 134,
                "actual": 107
            },
            {
                "month": "Mes 3",
                "plan": 301,
                "actual": 241
            },
            {
                "month": "Mes 4",
                "plan": 535,
                "actual": 428
            },
            {
                "month": "Mes 5",
                "plan": 836,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1203,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "19-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "19-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-20",
        "name": "CAMP. SALARES - SALA IMPULSIÓN",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 71,
        "budgetProgressActual": 58,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 5,
                "actual": 4
            },
            {
                "month": "Mes 2",
                "plan": 20,
                "actual": 16
            },
            {
                "month": "Mes 3",
                "plan": 45,
                "actual": 36
            },
            {
                "month": "Mes 4",
                "plan": 80,
                "actual": 64
            },
            {
                "month": "Mes 5",
                "plan": 124,
                "actual": 99
            },
            {
                "month": "Mes 6",
                "plan": 179,
                "actual": 143
            },
            {
                "month": "Mes 7",
                "plan": 244,
                "actual": 195
            },
            {
                "month": "Mes 8",
                "plan": 318,
                "actual": 254
            },
            {
                "month": "Mes 9",
                "plan": 403,
                "actual": 322
            },
            {
                "month": "Mes 10",
                "plan": 497,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 602,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "20-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "20-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-21",
        "name": "TALLER DE FLEXIBLES",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 47,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 19,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 78,
                "actual": 62
            },
            {
                "month": "Mes 3",
                "plan": 175,
                "actual": 140
            },
            {
                "month": "Mes 4",
                "plan": 312,
                "actual": 250
            },
            {
                "month": "Mes 5",
                "plan": 487,
                "actual": 390
            },
            {
                "month": "Mes 6",
                "plan": 702,
                "actual": 562
            },
            {
                "month": "Mes 7",
                "plan": 955,
                "actual": 764
            },
            {
                "month": "Mes 8",
                "plan": 1248,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 1579,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-22",
        "name": "EDIFICIO FILTROS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 57,
        "budgetProgressActual": 67,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 34,
                "actual": 27
            },
            {
                "month": "Mes 2",
                "plan": 136,
                "actual": 109
            },
            {
                "month": "Mes 3",
                "plan": 306,
                "actual": 245
            },
            {
                "month": "Mes 4",
                "plan": 545,
                "actual": 436
            },
            {
                "month": "Mes 5",
                "plan": 851,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1226,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-23",
        "name": "TALLER DE MANTENCIÓN DE VEHÍCULOS LIVIANOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 75,
        "budgetProgressActual": 78,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 38,
                "actual": 30
            },
            {
                "month": "Mes 2",
                "plan": 154,
                "actual": 123
            },
            {
                "month": "Mes 3",
                "plan": 346,
                "actual": 277
            },
            {
                "month": "Mes 4",
                "plan": 616,
                "actual": 493
            },
            {
                "month": "Mes 5",
                "plan": 962,
                "actual": 770
            },
            {
                "month": "Mes 6",
                "plan": 1386,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1886,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-24",
        "name": "PLATAFORMA 17",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNORECURSOS",
        "budgetProgressPlan": 60,
        "budgetProgressActual": 48,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 24,
                "actual": 19
            },
            {
                "month": "Mes 2",
                "plan": 95,
                "actual": 76
            },
            {
                "month": "Mes 3",
                "plan": 214,
                "actual": 171
            },
            {
                "month": "Mes 4",
                "plan": 380,
                "actual": 304
            },
            {
                "month": "Mes 5",
                "plan": 594,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 855,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "24-0",
                "contratista": "TECNORECURSOS",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-25",
        "name": "BODEGA INTERNACIONAL",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 75,
        "budgetProgressActual": 41,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 21,
                "actual": 17
            },
            {
                "month": "Mes 2",
                "plan": 84,
                "actual": 67
            },
            {
                "month": "Mes 3",
                "plan": 188,
                "actual": 150
            },
            {
                "month": "Mes 4",
                "plan": 335,
                "actual": 268
            },
            {
                "month": "Mes 5",
                "plan": 523,
                "actual": 418
            },
            {
                "month": "Mes 6",
                "plan": 753,
                "actual": 602
            },
            {
                "month": "Mes 7",
                "plan": 1025,
                "actual": 820
            },
            {
                "month": "Mes 8",
                "plan": 1339,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 1694,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "25-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "25-1",
                "contratista": "DISEP",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-26",
        "name": "DP.1 (BAÑO + COMEDOR)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Generación De Energía",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 59,
        "budgetProgressActual": 80,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 9,
                "actual": 7
            },
            {
                "month": "Mes 2",
                "plan": 36,
                "actual": 29
            },
            {
                "month": "Mes 3",
                "plan": 81,
                "actual": 65
            },
            {
                "month": "Mes 4",
                "plan": 144,
                "actual": 115
            },
            {
                "month": "Mes 5",
                "plan": 225,
                "actual": 180
            },
            {
                "month": "Mes 6",
                "plan": 325,
                "actual": 260
            },
            {
                "month": "Mes 7",
                "plan": 442,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 577,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "26-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "26-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-27",
        "name": "CAMP. SALARES - SALA MECÁNICAS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 67,
        "budgetProgressActual": 65,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 46,
                "actual": 37
            },
            {
                "month": "Mes 3",
                "plan": 103,
                "actual": 82
            },
            {
                "month": "Mes 4",
                "plan": 182,
                "actual": 146
            },
            {
                "month": "Mes 5",
                "plan": 285,
                "actual": 228
            },
            {
                "month": "Mes 6",
                "plan": 410,
                "actual": 328
            },
            {
                "month": "Mes 7",
                "plan": 558,
                "actual": 446
            },
            {
                "month": "Mes 8",
                "plan": 729,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 923,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "27-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-28",
        "name": "BARRIO CÍVICO - SALA MECÁNICAS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Civic District",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 97,
        "budgetProgressActual": 73,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 48,
                "actual": 38
            },
            {
                "month": "Mes 3",
                "plan": 107,
                "actual": 86
            },
            {
                "month": "Mes 4",
                "plan": 191,
                "actual": 153
            },
            {
                "month": "Mes 5",
                "plan": 298,
                "actual": 238
            },
            {
                "month": "Mes 6",
                "plan": 430,
                "actual": 344
            },
            {
                "month": "Mes 7",
                "plan": 585,
                "actual": 468
            },
            {
                "month": "Mes 8",
                "plan": 764,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 967,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "28-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "28-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-29",
        "name": "GARITA - SALA DE IMPULSIÓN",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Main Gate General",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 61,
        "budgetProgressActual": 60,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 14,
                "actual": 11
            },
            {
                "month": "Mes 2",
                "plan": 54,
                "actual": 43
            },
            {
                "month": "Mes 3",
                "plan": 122,
                "actual": 98
            },
            {
                "month": "Mes 4",
                "plan": 217,
                "actual": 174
            },
            {
                "month": "Mes 5",
                "plan": 339,
                "actual": 271
            },
            {
                "month": "Mes 6",
                "plan": 489,
                "actual": 391
            },
            {
                "month": "Mes 7",
                "plan": 665,
                "actual": 532
            },
            {
                "month": "Mes 8",
                "plan": 869,
                "actual": 695
            },
            {
                "month": "Mes 9",
                "plan": 1100,
                "actual": 880
            },
            {
                "month": "Mes 10",
                "plan": 1358,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 1643,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "29-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-30",
        "name": "POZO 1 SALA ELÉCTRICA 7200-ER-0001 (Pozos)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Water Wells",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 60,
        "budgetProgressActual": 58,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 48,
                "actual": 38
            },
            {
                "month": "Mes 2",
                "plan": 191,
                "actual": 153
            },
            {
                "month": "Mes 3",
                "plan": 429,
                "actual": 343
            },
            {
                "month": "Mes 4",
                "plan": 763,
                "actual": 610
            },
            {
                "month": "Mes 5",
                "plan": 1192,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1716,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-31",
        "name": "POZO 1 SALA ELÉCTRICA 7200-ER-0001 Y ESTACIÓN DE BOMBEO BOOSTER (Pozos)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Water Wells",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 79,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 24,
                "actual": 19
            },
            {
                "month": "Mes 2",
                "plan": 95,
                "actual": 76
            },
            {
                "month": "Mes 3",
                "plan": 214,
                "actual": 171
            },
            {
                "month": "Mes 4",
                "plan": 381,
                "actual": 305
            },
            {
                "month": "Mes 5",
                "plan": 595,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 857,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-32",
        "name": "POZO 3",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Water Wells",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 66,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 64,
                "actual": 51
            },
            {
                "month": "Mes 3",
                "plan": 143,
                "actual": 114
            },
            {
                "month": "Mes 4",
                "plan": 254,
                "actual": 203
            },
            {
                "month": "Mes 5",
                "plan": 397,
                "actual": 318
            },
            {
                "month": "Mes 6",
                "plan": 572,
                "actual": 458
            },
            {
                "month": "Mes 7",
                "plan": 779,
                "actual": 623
            },
            {
                "month": "Mes 8",
                "plan": 1017,
                "actual": 814
            },
            {
                "month": "Mes 9",
                "plan": 1288,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 1590,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-33",
        "name": "ACUEDUCTO - BOTADERO SUR (VP-0301-36)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Water Wells & Pipeline",
        "autoridad": "DGA",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 64,
        "budgetProgressActual": 74,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 28,
                "actual": 22
            },
            {
                "month": "Mes 2",
                "plan": 111,
                "actual": 89
            },
            {
                "month": "Mes 3",
                "plan": 251,
                "actual": 201
            },
            {
                "month": "Mes 4",
                "plan": 446,
                "actual": 357
            },
            {
                "month": "Mes 5",
                "plan": 697,
                "actual": 558
            },
            {
                "month": "Mes 6",
                "plan": 1003,
                "actual": 802
            },
            {
                "month": "Mes 7",
                "plan": 1365,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 1783,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "33-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "33-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-34",
        "name": "BARRIO CIVICO (PARCIAL N°2)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Civic District",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 80,
        "budgetProgressActual": 45,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 62,
                "actual": 50
            },
            {
                "month": "Mes 3",
                "plan": 140,
                "actual": 112
            },
            {
                "month": "Mes 4",
                "plan": 249,
                "actual": 199
            },
            {
                "month": "Mes 5",
                "plan": 389,
                "actual": 311
            },
            {
                "month": "Mes 6",
                "plan": 561,
                "actual": 449
            },
            {
                "month": "Mes 7",
                "plan": 763,
                "actual": 610
            },
            {
                "month": "Mes 8",
                "plan": 997,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 1261,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "34-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-35",
        "name": "PLATAFORMA 18",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNORECURSOS",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 87,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 45,
                "actual": 36
            },
            {
                "month": "Mes 3",
                "plan": 100,
                "actual": 80
            },
            {
                "month": "Mes 4",
                "plan": 178,
                "actual": 142
            },
            {
                "month": "Mes 5",
                "plan": 279,
                "actual": 223
            },
            {
                "month": "Mes 6",
                "plan": 401,
                "actual": 321
            },
            {
                "month": "Mes 7",
                "plan": 546,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 713,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "35-0",
                "contratista": "TECNORECURSOS",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "35-1",
                "contratista": "TECNORECURSOS",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-36",
        "name": "BODEGA, TALLER DE MANTENIMIENTO Y PLANTA DE PROCESOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 88,
        "budgetProgressActual": 47,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 35,
                "actual": 28
            },
            {
                "month": "Mes 2",
                "plan": 141,
                "actual": 113
            },
            {
                "month": "Mes 3",
                "plan": 318,
                "actual": 254
            },
            {
                "month": "Mes 4",
                "plan": 565,
                "actual": 452
            },
            {
                "month": "Mes 5",
                "plan": 883,
                "actual": 706
            },
            {
                "month": "Mes 6",
                "plan": 1271,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1730,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-37",
        "name": "EDIFICIO FILTROS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 92,
        "budgetProgressActual": 89,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 61,
                "actual": 49
            },
            {
                "month": "Mes 3",
                "plan": 137,
                "actual": 110
            },
            {
                "month": "Mes 4",
                "plan": 244,
                "actual": 195
            },
            {
                "month": "Mes 5",
                "plan": 382,
                "actual": 306
            },
            {
                "month": "Mes 6",
                "plan": 550,
                "actual": 440
            },
            {
                "month": "Mes 7",
                "plan": 748,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 978,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-38",
        "name": "TALLER DE MANTENCIÓN DE VEHÍCULOS LIVIANOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 62,
        "budgetProgressActual": 72,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 8,
                "actual": 6
            },
            {
                "month": "Mes 2",
                "plan": 32,
                "actual": 26
            },
            {
                "month": "Mes 3",
                "plan": 72,
                "actual": 58
            },
            {
                "month": "Mes 4",
                "plan": 127,
                "actual": 102
            },
            {
                "month": "Mes 5",
                "plan": 199,
                "actual": 159
            },
            {
                "month": "Mes 6",
                "plan": 286,
                "actual": 229
            },
            {
                "month": "Mes 7",
                "plan": 389,
                "actual": 311
            },
            {
                "month": "Mes 8",
                "plan": 508,
                "actual": 406
            },
            {
                "month": "Mes 9",
                "plan": 644,
                "actual": 515
            },
            {
                "month": "Mes 10",
                "plan": 795,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 961,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "38-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-39",
        "name": "EDIFICIO FILTROS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 84,
        "budgetProgressActual": 90,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 49,
                "actual": 39
            },
            {
                "month": "Mes 3",
                "plan": 109,
                "actual": 87
            },
            {
                "month": "Mes 4",
                "plan": 194,
                "actual": 155
            },
            {
                "month": "Mes 5",
                "plan": 303,
                "actual": 242
            },
            {
                "month": "Mes 6",
                "plan": 437,
                "actual": 350
            },
            {
                "month": "Mes 7",
                "plan": 594,
                "actual": 475
            },
            {
                "month": "Mes 8",
                "plan": 776,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 982,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "39-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-40",
        "name": "PAQUETE 4 TALLER DE CAMIONES (SALA DE COMPRESORES )",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 94,
        "budgetProgressActual": 86,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 10,
                "actual": 8
            },
            {
                "month": "Mes 2",
                "plan": 39,
                "actual": 31
            },
            {
                "month": "Mes 3",
                "plan": 87,
                "actual": 70
            },
            {
                "month": "Mes 4",
                "plan": 155,
                "actual": 124
            },
            {
                "month": "Mes 5",
                "plan": 243,
                "actual": 194
            },
            {
                "month": "Mes 6",
                "plan": 349,
                "actual": 279
            },
            {
                "month": "Mes 7",
                "plan": 475,
                "actual": 380
            },
            {
                "month": "Mes 8",
                "plan": 621,
                "actual": 497
            },
            {
                "month": "Mes 9",
                "plan": 786,
                "actual": 629
            },
            {
                "month": "Mes 10",
                "plan": 970,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 1174,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "40-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-41",
        "name": "BODEGA DE TALLER",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Services Area",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 62,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 42,
                "actual": 34
            },
            {
                "month": "Mes 3",
                "plan": 95,
                "actual": 76
            },
            {
                "month": "Mes 4",
                "plan": 169,
                "actual": 135
            },
            {
                "month": "Mes 5",
                "plan": 264,
                "actual": 211
            },
            {
                "month": "Mes 6",
                "plan": 380,
                "actual": 304
            },
            {
                "month": "Mes 7",
                "plan": 518,
                "actual": 414
            },
            {
                "month": "Mes 8",
                "plan": 676,
                "actual": 541
            },
            {
                "month": "Mes 9",
                "plan": 855,
                "actual": 684
            },
            {
                "month": "Mes 10",
                "plan": 1056,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 1278,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "41-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "41-1",
                "contratista": "DISEP",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-42",
        "name": "BODEGA DE ACEITE",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Services Area",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 81,
        "budgetProgressActual": 78,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 17,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 68,
                "actual": 54
            },
            {
                "month": "Mes 3",
                "plan": 154,
                "actual": 123
            },
            {
                "month": "Mes 4",
                "plan": 274,
                "actual": 219
            },
            {
                "month": "Mes 5",
                "plan": 427,
                "actual": 342
            },
            {
                "month": "Mes 6",
                "plan": 616,
                "actual": 493
            },
            {
                "month": "Mes 7",
                "plan": 838,
                "actual": 670
            },
            {
                "month": "Mes 8",
                "plan": 1094,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 1385,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "42-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "42-1",
                "contratista": "DISEP",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-43",
        "name": "TALLER DE MANTENCIÓN DE VEHÍCULOS LIVIANOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 87,
        "budgetProgressActual": 89,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 47,
                "actual": 38
            },
            {
                "month": "Mes 2",
                "plan": 190,
                "actual": 152
            },
            {
                "month": "Mes 3",
                "plan": 427,
                "actual": 342
            },
            {
                "month": "Mes 4",
                "plan": 759,
                "actual": 607
            },
            {
                "month": "Mes 5",
                "plan": 1186,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1707,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-44",
        "name": "BODEGA, TALLER DE MANTENIMIENTO Y PLANTA DE PROCESOS, EDIFICIO MOLIENDA, OFICINA CHANCADOR PRIMARIO, REFINERÍA",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 59,
        "budgetProgressActual": 78,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 9,
                "actual": 7
            },
            {
                "month": "Mes 2",
                "plan": 37,
                "actual": 30
            },
            {
                "month": "Mes 3",
                "plan": 84,
                "actual": 67
            },
            {
                "month": "Mes 4",
                "plan": 149,
                "actual": 119
            },
            {
                "month": "Mes 5",
                "plan": 234,
                "actual": 187
            },
            {
                "month": "Mes 6",
                "plan": 336,
                "actual": 269
            },
            {
                "month": "Mes 7",
                "plan": 458,
                "actual": 366
            },
            {
                "month": "Mes 8",
                "plan": 598,
                "actual": 478
            },
            {
                "month": "Mes 9",
                "plan": 757,
                "actual": 606
            },
            {
                "month": "Mes 10",
                "plan": 934,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 1131,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "44-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "44-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-45",
        "name": "PLATAFORMA 4B - OPERACIÓN",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 58,
        "budgetProgressActual": 77,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 27,
                "actual": 22
            },
            {
                "month": "Mes 2",
                "plan": 107,
                "actual": 86
            },
            {
                "month": "Mes 3",
                "plan": 240,
                "actual": 192
            },
            {
                "month": "Mes 4",
                "plan": 427,
                "actual": 342
            },
            {
                "month": "Mes 5",
                "plan": 668,
                "actual": 534
            },
            {
                "month": "Mes 6",
                "plan": 962,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1309,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-46",
        "name": "EDIFICIO MERRIL CROWE/ REFINERÍA/ SALA DE CAMBIO (PLANTA DE PROCESOS N°3)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 64,
        "budgetProgressActual": 79,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 61,
                "actual": 49
            },
            {
                "month": "Mes 3",
                "plan": 138,
                "actual": 110
            },
            {
                "month": "Mes 4",
                "plan": 245,
                "actual": 196
            },
            {
                "month": "Mes 5",
                "plan": 383,
                "actual": 306
            },
            {
                "month": "Mes 6",
                "plan": 552,
                "actual": 442
            },
            {
                "month": "Mes 7",
                "plan": 751,
                "actual": 601
            },
            {
                "month": "Mes 8",
                "plan": 981,
                "actual": 785
            },
            {
                "month": "Mes 9",
                "plan": 1241,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 1532,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "46-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-47",
        "name": "SALA ELÉCTRICA 1210-ER-0001 (Taller de Camiones EMP)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 64,
        "budgetProgressActual": 83,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 18,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 71,
                "actual": 57
            },
            {
                "month": "Mes 3",
                "plan": 161,
                "actual": 129
            },
            {
                "month": "Mes 4",
                "plan": 286,
                "actual": 229
            },
            {
                "month": "Mes 5",
                "plan": 446,
                "actual": 357
            },
            {
                "month": "Mes 6",
                "plan": 643,
                "actual": 514
            },
            {
                "month": "Mes 7",
                "plan": 875,
                "actual": 700
            },
            {
                "month": "Mes 8",
                "plan": 1143,
                "actual": 914
            },
            {
                "month": "Mes 9",
                "plan": 1447,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 1786,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "47-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "47-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-48",
        "name": "SALA ELÉCTRICA 1210-ER-0001 (Taller de Camiones EMP)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 52,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 42,
                "actual": 34
            },
            {
                "month": "Mes 2",
                "plan": 167,
                "actual": 134
            },
            {
                "month": "Mes 3",
                "plan": 377,
                "actual": 302
            },
            {
                "month": "Mes 4",
                "plan": 670,
                "actual": 536
            },
            {
                "month": "Mes 5",
                "plan": 1047,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1507,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-49",
        "name": "PLANTA DE OXÍGENO",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Oxígeno",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 93,
        "budgetProgressActual": 41,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 46,
                "actual": 46
            },
            {
                "month": "Mes 3",
                "plan": 104,
                "actual": 104
            },
            {
                "month": "Mes 4",
                "plan": 184,
                "actual": 184
            },
            {
                "month": "Mes 5",
                "plan": 288,
                "actual": 288
            },
            {
                "month": "Mes 6",
                "plan": 415,
                "actual": 415
            },
            {
                "month": "Mes 7",
                "plan": 565,
                "actual": 565
            }
        ],
        "deliverables": [
            {
                "id": "49-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "49-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-50",
        "name": "BODEGA, TALLER DE MANTENIMIENTO Y PLANTA DE PROCESOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia de Abastecimiento",
        "wbs": "Warehouse",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 87,
        "budgetProgressActual": 56,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 45,
                "actual": 36
            },
            {
                "month": "Mes 3",
                "plan": 100,
                "actual": 80
            },
            {
                "month": "Mes 4",
                "plan": 178,
                "actual": 142
            },
            {
                "month": "Mes 5",
                "plan": 279,
                "actual": 223
            },
            {
                "month": "Mes 6",
                "plan": 401,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 546,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-51",
        "name": "IFC PAQUETE (INSTALACIONES COMPLEMENTARIAS)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "SAG",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 44,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 23,
                "actual": 18
            },
            {
                "month": "Mes 2",
                "plan": 93,
                "actual": 74
            },
            {
                "month": "Mes 3",
                "plan": 208,
                "actual": 166
            },
            {
                "month": "Mes 4",
                "plan": 371,
                "actual": 297
            },
            {
                "month": "Mes 5",
                "plan": 579,
                "actual": 463
            },
            {
                "month": "Mes 6",
                "plan": 834,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1135,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "51-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "51-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-52",
        "name": "PUNTO DE CONTROL",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Off-Site",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 67,
        "budgetProgressActual": 55,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 19,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 75,
                "actual": 60
            },
            {
                "month": "Mes 3",
                "plan": 169,
                "actual": 135
            },
            {
                "month": "Mes 4",
                "plan": 301,
                "actual": 241
            },
            {
                "month": "Mes 5",
                "plan": 470,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 676,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "52-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-53",
        "name": "PASARELAS BARRIO CÍVICO",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Civic District",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 74,
        "budgetProgressActual": 65,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 32,
                "actual": 26
            },
            {
                "month": "Mes 2",
                "plan": 129,
                "actual": 103
            },
            {
                "month": "Mes 3",
                "plan": 290,
                "actual": 232
            },
            {
                "month": "Mes 4",
                "plan": 515,
                "actual": 412
            },
            {
                "month": "Mes 5",
                "plan": 805,
                "actual": 644
            },
            {
                "month": "Mes 6",
                "plan": 1159,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1577,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-54",
        "name": "EDIFICIO DESMONTADORA DE NEUMATICOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Services Area",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 98,
        "budgetProgressActual": 74,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 38,
                "actual": 30
            },
            {
                "month": "Mes 2",
                "plan": 153,
                "actual": 122
            },
            {
                "month": "Mes 3",
                "plan": 345,
                "actual": 276
            },
            {
                "month": "Mes 4",
                "plan": 614,
                "actual": 491
            },
            {
                "month": "Mes 5",
                "plan": 959,
                "actual": 767
            },
            {
                "month": "Mes 6",
                "plan": 1381,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1880,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "54-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "54-1",
                "contratista": "DISEP",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-55",
        "name": "DP.3",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Generación De Energía",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 56,
        "budgetProgressActual": 45,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 46,
                "actual": 37
            },
            {
                "month": "Mes 3",
                "plan": 104,
                "actual": 83
            },
            {
                "month": "Mes 4",
                "plan": 186,
                "actual": 149
            },
            {
                "month": "Mes 5",
                "plan": 290,
                "actual": 232
            },
            {
                "month": "Mes 6",
                "plan": 418,
                "actual": 334
            },
            {
                "month": "Mes 7",
                "plan": 569,
                "actual": 455
            },
            {
                "month": "Mes 8",
                "plan": 743,
                "actual": 594
            },
            {
                "month": "Mes 9",
                "plan": 940,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 1161,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "55-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "55-1",
                "contratista": "DISEP",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-56",
        "name": "PLATAFORMA 4B - OPERACIÓN",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 50,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 43,
                "actual": 34
            },
            {
                "month": "Mes 3",
                "plan": 98,
                "actual": 78
            },
            {
                "month": "Mes 4",
                "plan": 173,
                "actual": 138
            },
            {
                "month": "Mes 5",
                "plan": 271,
                "actual": 217
            },
            {
                "month": "Mes 6",
                "plan": 390,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 531,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "56-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-57",
        "name": "POLICLÍNICO - CAMPAMENTO",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "MUTUAL",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 71,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 34,
                "actual": 27
            },
            {
                "month": "Mes 2",
                "plan": 135,
                "actual": 108
            },
            {
                "month": "Mes 3",
                "plan": 304,
                "actual": 243
            },
            {
                "month": "Mes 4",
                "plan": 540,
                "actual": 432
            },
            {
                "month": "Mes 5",
                "plan": 843,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1214,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "57-0",
                "contratista": "MUTUAL",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-58",
        "name": "EDIFICIO ELUCIÓN - NUEVO INGRESO - TK018",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Acid Wash",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 52,
        "budgetProgressActual": 56,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 40,
                "actual": 32
            },
            {
                "month": "Mes 2",
                "plan": 159,
                "actual": 127
            },
            {
                "month": "Mes 3",
                "plan": 358,
                "actual": 286
            },
            {
                "month": "Mes 4",
                "plan": 637,
                "actual": 510
            },
            {
                "month": "Mes 5",
                "plan": 995,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1433,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-59",
        "name": "PLANTA DE AGUA POTABLE Y BODEGA DE REACTIVOS PTAP",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Fresh Water, Fire Water, Potable Water",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 92,
        "budgetProgressActual": 44,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 42,
                "actual": 34
            },
            {
                "month": "Mes 3",
                "plan": 95,
                "actual": 76
            },
            {
                "month": "Mes 4",
                "plan": 169,
                "actual": 135
            },
            {
                "month": "Mes 5",
                "plan": 265,
                "actual": 212
            },
            {
                "month": "Mes 6",
                "plan": 381,
                "actual": 305
            },
            {
                "month": "Mes 7",
                "plan": 519,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 678,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "59-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-60",
        "name": "PAQUETE 5 (CHANCADOR, STOCKPILE, MOLIENDA)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 64,
        "budgetProgressActual": 87,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 22,
                "actual": 18
            },
            {
                "month": "Mes 2",
                "plan": 88,
                "actual": 70
            },
            {
                "month": "Mes 3",
                "plan": 198,
                "actual": 158
            },
            {
                "month": "Mes 4",
                "plan": 352,
                "actual": 282
            },
            {
                "month": "Mes 5",
                "plan": 550,
                "actual": 440
            },
            {
                "month": "Mes 6",
                "plan": 792,
                "actual": 634
            },
            {
                "month": "Mes 7",
                "plan": 1078,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 1408,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-61",
        "name": "INSTALACIONES COMPLEMENTARIAS (Galería Correa 2110-CV-0001\r\nGalería Correa 2110-CV-0002\r\nSistema Motriz Correa 2120-CV-0002\r\nGalería Correa 2110-CV-0003\r\nTorre Contrapeso Correa 2210-CV-0003\r\nGalería Correa 3110-CV-0004\r\nGalería Correa 3110-CV-0005 - Planta lechada de Cal)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 83,
        "budgetProgressActual": 48,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 26,
                "actual": 21
            },
            {
                "month": "Mes 2",
                "plan": 106,
                "actual": 85
            },
            {
                "month": "Mes 3",
                "plan": 238,
                "actual": 190
            },
            {
                "month": "Mes 4",
                "plan": 423,
                "actual": 338
            },
            {
                "month": "Mes 5",
                "plan": 661,
                "actual": 529
            },
            {
                "month": "Mes 6",
                "plan": 952,
                "actual": 762
            },
            {
                "month": "Mes 7",
                "plan": 1296,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 1693,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "61-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-62",
        "name": "EDIFICIO FILTROS",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 83,
        "budgetProgressActual": 55,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 11
            },
            {
                "month": "Mes 2",
                "plan": 46,
                "actual": 46
            },
            {
                "month": "Mes 3",
                "plan": 102,
                "actual": 102
            },
            {
                "month": "Mes 4",
                "plan": 182,
                "actual": 182
            },
            {
                "month": "Mes 5",
                "plan": 285,
                "actual": 285
            },
            {
                "month": "Mes 6",
                "plan": 410,
                "actual": 410
            },
            {
                "month": "Mes 7",
                "plan": 558,
                "actual": 558
            },
            {
                "month": "Mes 8",
                "plan": 729,
                "actual": 729
            },
            {
                "month": "Mes 9",
                "plan": 922,
                "actual": 922
            },
            {
                "month": "Mes 10",
                "plan": 1139,
                "actual": 1139
            }
        ],
        "deliverables": [
            {
                "id": "62-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "62-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-63",
        "name": "PAQUETE 11 (PLANTA DE PROCESOS N°1) (OFICINA CHANCADOR PRIMARIO, TORRE DE TRANSFERENCIA, TORRE DE TRANSFERENCIA 1 Y 2, BODEGA DE MERCURIO, COMPRESOR Y ACUMULADOR DE AIRE)",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 70,
        "budgetProgressActual": 59,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 9,
                "actual": 9
            },
            {
                "month": "Mes 2",
                "plan": 38,
                "actual": 38
            },
            {
                "month": "Mes 3",
                "plan": 85,
                "actual": 85
            },
            {
                "month": "Mes 4",
                "plan": 151,
                "actual": 151
            },
            {
                "month": "Mes 5",
                "plan": 236,
                "actual": 236
            },
            {
                "month": "Mes 6",
                "plan": 339,
                "actual": 339
            },
            {
                "month": "Mes 7",
                "plan": 462,
                "actual": 462
            },
            {
                "month": "Mes 8",
                "plan": 603,
                "actual": 603
            },
            {
                "month": "Mes 9",
                "plan": 763,
                "actual": 763
            },
            {
                "month": "Mes 10",
                "plan": 942,
                "actual": 942
            },
            {
                "month": "Mes 11",
                "plan": 1140,
                "actual": 1140
            }
        ],
        "deliverables": [
            {
                "id": "63-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "63-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-64",
        "name": "PAQUETE 15 (PLANTA DE PROCESOS N°3)",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 86,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 28,
                "actual": 28
            },
            {
                "month": "Mes 2",
                "plan": 113,
                "actual": 113
            },
            {
                "month": "Mes 3",
                "plan": 255,
                "actual": 255
            },
            {
                "month": "Mes 4",
                "plan": 453,
                "actual": 453
            },
            {
                "month": "Mes 5",
                "plan": 707,
                "actual": 707
            },
            {
                "month": "Mes 6",
                "plan": 1018,
                "actual": 1018
            },
            {
                "month": "Mes 7",
                "plan": 1386,
                "actual": 1386
            }
        ],
        "deliverables": [
            {
                "id": "64-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "64-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-65",
        "name": "PAQUETE 14 (SALAS ELÉCTRICAS (CHANCADOR, MOLIENDA, MERRIL CROWE, PLANTA DE ENERGÍA, RELAVES)",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 59,
        "budgetProgressActual": 47,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 22,
                "actual": 22
            },
            {
                "month": "Mes 2",
                "plan": 86,
                "actual": 86
            },
            {
                "month": "Mes 3",
                "plan": 194,
                "actual": 194
            },
            {
                "month": "Mes 4",
                "plan": 344,
                "actual": 344
            },
            {
                "month": "Mes 5",
                "plan": 538,
                "actual": 538
            },
            {
                "month": "Mes 6",
                "plan": 774,
                "actual": 774
            }
        ],
        "deliverables": [
            {
                "id": "65-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-66",
        "name": "PAQUETE 12B (TALLER DE VEHÍCULOS LIVIANOS)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 62,
        "budgetProgressActual": 57,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 31,
                "actual": 25
            },
            {
                "month": "Mes 2",
                "plan": 125,
                "actual": 100
            },
            {
                "month": "Mes 3",
                "plan": 281,
                "actual": 225
            },
            {
                "month": "Mes 4",
                "plan": 500,
                "actual": 400
            },
            {
                "month": "Mes 5",
                "plan": 781,
                "actual": 625
            },
            {
                "month": "Mes 6",
                "plan": 1125,
                "actual": null
            },
            {
                "month": "Mes 7",
                "plan": 1531,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "66-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-67",
        "name": "PAQUETE 12 (PLANTA DE PROCESOS N°2) (BODEGA, TALLER DE MANTENIMIENTO Y PLANTA DE PROCESOS, BODEGA DE CIANURO)",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Process Plant",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 63,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 19,
                "actual": 19
            },
            {
                "month": "Mes 2",
                "plan": 78,
                "actual": 78
            },
            {
                "month": "Mes 3",
                "plan": 174,
                "actual": 174
            },
            {
                "month": "Mes 4",
                "plan": 310,
                "actual": 310
            },
            {
                "month": "Mes 5",
                "plan": 485,
                "actual": 485
            },
            {
                "month": "Mes 6",
                "plan": 698,
                "actual": 698
            },
            {
                "month": "Mes 7",
                "plan": 950,
                "actual": 950
            },
            {
                "month": "Mes 8",
                "plan": 1241,
                "actual": 1241
            },
            {
                "month": "Mes 9",
                "plan": 1570,
                "actual": 1570
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-68",
        "name": "MINA - PLANTA",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 60,
        "budgetProgressActual": 67,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 41,
                "actual": 41
            },
            {
                "month": "Mes 2",
                "plan": 165,
                "actual": 165
            },
            {
                "month": "Mes 3",
                "plan": 371,
                "actual": 371
            },
            {
                "month": "Mes 4",
                "plan": 659,
                "actual": 659
            },
            {
                "month": "Mes 5",
                "plan": 1030,
                "actual": 1030
            },
            {
                "month": "Mes 6",
                "plan": 1483,
                "actual": 1483
            }
        ],
        "deliverables": [
            {
                "id": "68-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "68-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-69",
        "name": "PLANTA DE AGUA POTABLE Y BODEGA DE REACTIVOS PTAP",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Fresh Water, Fire Water, Potable Water",
        "autoridad": "SEC",
        "contratistaResponsable": "DISEP",
        "budgetProgressPlan": 65,
        "budgetProgressActual": 70,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 13,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 50,
                "actual": 40
            },
            {
                "month": "Mes 3",
                "plan": 113,
                "actual": 90
            },
            {
                "month": "Mes 4",
                "plan": 201,
                "actual": 161
            },
            {
                "month": "Mes 5",
                "plan": 315,
                "actual": 252
            },
            {
                "month": "Mes 6",
                "plan": 453,
                "actual": 362
            },
            {
                "month": "Mes 7",
                "plan": 616,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 805,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "69-0",
                "contratista": "DISEP",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-70",
        "name": "PLANTA DE AGUA POTABLE Y BODEGA DE REACTIVOS PTAP",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Fresh Water, Fire Water, Potable Water",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 50,
        "budgetProgressActual": 88,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 8,
                "actual": 6
            },
            {
                "month": "Mes 2",
                "plan": 33,
                "actual": 26
            },
            {
                "month": "Mes 3",
                "plan": 73,
                "actual": 58
            },
            {
                "month": "Mes 4",
                "plan": 130,
                "actual": 104
            },
            {
                "month": "Mes 5",
                "plan": 204,
                "actual": 163
            },
            {
                "month": "Mes 6",
                "plan": 293,
                "actual": 234
            },
            {
                "month": "Mes 7",
                "plan": 399,
                "actual": 319
            },
            {
                "month": "Mes 8",
                "plan": 521,
                "actual": 417
            },
            {
                "month": "Mes 9",
                "plan": 660,
                "actual": null
            },
            {
                "month": "Mes 10",
                "plan": 815,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "70-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-71",
        "name": "SECTOR MINA PLATAFORMA 4A",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 87,
        "budgetProgressActual": 68,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 8,
                "actual": 6
            },
            {
                "month": "Mes 2",
                "plan": 33,
                "actual": 26
            },
            {
                "month": "Mes 3",
                "plan": 74,
                "actual": 59
            },
            {
                "month": "Mes 4",
                "plan": 132,
                "actual": 106
            },
            {
                "month": "Mes 5",
                "plan": 206,
                "actual": 165
            },
            {
                "month": "Mes 6",
                "plan": 297,
                "actual": 238
            },
            {
                "month": "Mes 7",
                "plan": 404,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 527,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "71-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "71-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-72",
        "name": "POLICLÍNICO - CAMPAMENTO (SALA REAS Y RAYOS X)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Facilities",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 56,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 6,
                "actual": 5
            },
            {
                "month": "Mes 2",
                "plan": 26,
                "actual": 21
            },
            {
                "month": "Mes 3",
                "plan": 58,
                "actual": 46
            },
            {
                "month": "Mes 4",
                "plan": 103,
                "actual": 82
            },
            {
                "month": "Mes 5",
                "plan": 160,
                "actual": 128
            },
            {
                "month": "Mes 6",
                "plan": 231,
                "actual": 185
            },
            {
                "month": "Mes 7",
                "plan": 314,
                "actual": 251
            },
            {
                "month": "Mes 8",
                "plan": 411,
                "actual": 329
            },
            {
                "month": "Mes 9",
                "plan": 520,
                "actual": 416
            },
            {
                "month": "Mes 10",
                "plan": 642,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 776,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "72-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-73",
        "name": "POLICLÍNICO - CAMPAMENTO (SALA REAS Y RAYOS X)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 74,
        "budgetProgressActual": 87,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 7,
                "actual": 6
            },
            {
                "month": "Mes 2",
                "plan": 29,
                "actual": 23
            },
            {
                "month": "Mes 3",
                "plan": 64,
                "actual": 51
            },
            {
                "month": "Mes 4",
                "plan": 114,
                "actual": 91
            },
            {
                "month": "Mes 5",
                "plan": 179,
                "actual": 143
            },
            {
                "month": "Mes 6",
                "plan": 257,
                "actual": 206
            },
            {
                "month": "Mes 7",
                "plan": 350,
                "actual": 280
            },
            {
                "month": "Mes 8",
                "plan": 458,
                "actual": 366
            },
            {
                "month": "Mes 9",
                "plan": 579,
                "actual": 463
            },
            {
                "month": "Mes 10",
                "plan": 715,
                "actual": null
            },
            {
                "month": "Mes 11",
                "plan": 865,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-74",
        "name": "TALLER DE MANTENCIÓN DE VEHÍCULOS LIVIANOS",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 63,
        "budgetProgressActual": 41,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 6,
                "actual": 5
            },
            {
                "month": "Mes 2",
                "plan": 25,
                "actual": 20
            },
            {
                "month": "Mes 3",
                "plan": 56,
                "actual": 45
            },
            {
                "month": "Mes 4",
                "plan": 99,
                "actual": 79
            },
            {
                "month": "Mes 5",
                "plan": 155,
                "actual": 124
            },
            {
                "month": "Mes 6",
                "plan": 223,
                "actual": 178
            },
            {
                "month": "Mes 7",
                "plan": 304,
                "actual": 243
            },
            {
                "month": "Mes 8",
                "plan": 397,
                "actual": null
            },
            {
                "month": "Mes 9",
                "plan": 502,
                "actual": null
            }
        ],
        "deliverables": [
            {
                "id": "74-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "74-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-75",
        "name": "PATIO DE NEUMATICO 2 Y 3 (PLATAFORMA 5 - PLATAFORMA 6)",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "ICV",
        "budgetProgressPlan": 56,
        "budgetProgressActual": 89,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 28,
                "actual": 22
            },
            {
                "month": "Mes 2",
                "plan": 113,
                "actual": 90
            },
            {
                "month": "Mes 3",
                "plan": 254,
                "actual": 203
            },
            {
                "month": "Mes 4",
                "plan": 451,
                "actual": 361
            },
            {
                "month": "Mes 5",
                "plan": 705,
                "actual": 564
            },
            {
                "month": "Mes 6",
                "plan": 1015,
                "actual": 812
            },
            {
                "month": "Mes 7",
                "plan": 1382,
                "actual": null
            },
            {
                "month": "Mes 8",
                "plan": 1805,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-76",
        "name": "ÁREA TEMPORAL DE ACOPIO - PLATAFORMA 7",
        "category": "Activo",
        "dashboardStatus": "Atrasado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 79,
        "budgetProgressActual": 64,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 36,
                "actual": 29
            },
            {
                "month": "Mes 2",
                "plan": 144,
                "actual": 115
            },
            {
                "month": "Mes 3",
                "plan": 325,
                "actual": 260
            },
            {
                "month": "Mes 4",
                "plan": 577,
                "actual": 462
            },
            {
                "month": "Mes 5",
                "plan": 902,
                "actual": null
            },
            {
                "month": "Mes 6",
                "plan": 1298,
                "actual": null
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-77",
        "name": "SERVICIO DE LABORATORIO Y TOPOGRAFÍA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "DGAC",
        "contratistaResponsable": "OITEC GEOTECNIA LTDA",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 63,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 62,
                "actual": 62
            },
            {
                "month": "Mes 3",
                "plan": 139,
                "actual": 139
            },
            {
                "month": "Mes 4",
                "plan": 247,
                "actual": 247
            },
            {
                "month": "Mes 5",
                "plan": 385,
                "actual": 385
            },
            {
                "month": "Mes 6",
                "plan": 555,
                "actual": 555
            },
            {
                "month": "Mes 7",
                "plan": 755,
                "actual": 755
            },
            {
                "month": "Mes 8",
                "plan": 986,
                "actual": 986
            },
            {
                "month": "Mes 9",
                "plan": 1248,
                "actual": 1248
            }
        ],
        "deliverables": [
            {
                "id": "77-0",
                "contratista": "OITEC GEOTECNIA LTDA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "77-1",
                "contratista": "OITEC GEOTECNIA LTDA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-78",
        "name": "BODEGA, TALLER DE MANTENIMIENTO (EQUIPOS RADIOACTIVOS -OCTAVA FUENTE) ",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia de Abastecimiento",
        "wbs": "Warehouse",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 92,
        "budgetProgressActual": 48,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 14,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 55,
                "actual": 55
            },
            {
                "month": "Mes 3",
                "plan": 124,
                "actual": 124
            },
            {
                "month": "Mes 4",
                "plan": 221,
                "actual": 221
            },
            {
                "month": "Mes 5",
                "plan": 346,
                "actual": 346
            },
            {
                "month": "Mes 6",
                "plan": 498,
                "actual": 498
            },
            {
                "month": "Mes 7",
                "plan": 678,
                "actual": 678
            },
            {
                "month": "Mes 8",
                "plan": 885,
                "actual": 885
            },
            {
                "month": "Mes 9",
                "plan": 1120,
                "actual": 1120
            },
            {
                "month": "Mes 10",
                "plan": 1383,
                "actual": 1383
            },
            {
                "month": "Mes 11",
                "plan": 1673,
                "actual": 1673
            }
        ],
        "deliverables": [
            {
                "id": "78-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-79",
        "name": "DISEÑO, CONSTRUCCIÓN, OPERACIÓN, CIERRE DEPÓSITO DE RELAVES FILTRADOS",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Tailings & Waste Storage",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 74,
        "budgetProgressActual": 76,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 59,
                "actual": 59
            },
            {
                "month": "Mes 3",
                "plan": 132,
                "actual": 132
            },
            {
                "month": "Mes 4",
                "plan": 235,
                "actual": 235
            },
            {
                "month": "Mes 5",
                "plan": 367,
                "actual": 367
            },
            {
                "month": "Mes 6",
                "plan": 528,
                "actual": 528
            },
            {
                "month": "Mes 7",
                "plan": 718,
                "actual": 718
            },
            {
                "month": "Mes 8",
                "plan": 938,
                "actual": 938
            },
            {
                "month": "Mes 9",
                "plan": 1188,
                "actual": 1188
            },
            {
                "month": "Mes 10",
                "plan": 1466,
                "actual": 1466
            },
            {
                "month": "Mes 11",
                "plan": 1774,
                "actual": 1774
            }
        ],
        "deliverables": [
            {
                "id": "79-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "79-1",
                "contratista": "SRK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-80",
        "name": "MÉTODO DE EXPLOTACIÓN Y BOTADERO DE ESTÉRILES",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Waste Storage Facility",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 84,
        "budgetProgressActual": 76,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 49,
                "actual": 49
            },
            {
                "month": "Mes 2",
                "plan": 196,
                "actual": 196
            },
            {
                "month": "Mes 3",
                "plan": 442,
                "actual": 442
            },
            {
                "month": "Mes 4",
                "plan": 786,
                "actual": 786
            },
            {
                "month": "Mes 5",
                "plan": 1228,
                "actual": 1228
            },
            {
                "month": "Mes 6",
                "plan": 1768,
                "actual": 1768
            }
        ],
        "deliverables": [
            {
                "id": "80-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "80-1",
                "contratista": "SRK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-81",
        "name": "PLANTA DE PROCESOS E INFRAESTRUCTURA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 79,
        "budgetProgressActual": 47,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 16
            },
            {
                "month": "Mes 2",
                "plan": 65,
                "actual": 65
            },
            {
                "month": "Mes 3",
                "plan": 145,
                "actual": 145
            },
            {
                "month": "Mes 4",
                "plan": 258,
                "actual": 258
            },
            {
                "month": "Mes 5",
                "plan": 403,
                "actual": 403
            },
            {
                "month": "Mes 6",
                "plan": 581,
                "actual": 581
            },
            {
                "month": "Mes 7",
                "plan": 791,
                "actual": 791
            },
            {
                "month": "Mes 8",
                "plan": 1033,
                "actual": 1033
            },
            {
                "month": "Mes 9",
                "plan": 1307,
                "actual": 1307
            },
            {
                "month": "Mes 10",
                "plan": 1614,
                "actual": 1614
            }
        ],
        "deliverables": [
            {
                "id": "81-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "81-1",
                "contratista": "SRK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-82",
        "name": "AUTORIZACIÓN PLAN DE CIERRE",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 86,
        "budgetProgressActual": 64,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 10,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 42,
                "actual": 42
            },
            {
                "month": "Mes 3",
                "plan": 94,
                "actual": 94
            },
            {
                "month": "Mes 4",
                "plan": 168,
                "actual": 168
            },
            {
                "month": "Mes 5",
                "plan": 262,
                "actual": 262
            },
            {
                "month": "Mes 6",
                "plan": 377,
                "actual": 377
            },
            {
                "month": "Mes 7",
                "plan": 513,
                "actual": 513
            },
            {
                "month": "Mes 8",
                "plan": 670,
                "actual": 670
            },
            {
                "month": "Mes 9",
                "plan": 848,
                "actual": 848
            },
            {
                "month": "Mes 10",
                "plan": 1047,
                "actual": 1047
            },
            {
                "month": "Mes 11",
                "plan": 1267,
                "actual": 1267
            }
        ],
        "deliverables": [
            {
                "id": "82-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "82-1",
                "contratista": "SRK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-83",
        "name": "ACUEDUCTO (PAS 156 -VP-0301-34)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Water Wells & Pipeline",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 84,
        "budgetProgressActual": 45,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 16
            },
            {
                "month": "Mes 2",
                "plan": 64,
                "actual": 64
            },
            {
                "month": "Mes 3",
                "plan": 145,
                "actual": 145
            },
            {
                "month": "Mes 4",
                "plan": 257,
                "actual": 257
            },
            {
                "month": "Mes 5",
                "plan": 402,
                "actual": 402
            },
            {
                "month": "Mes 6",
                "plan": 579,
                "actual": 579
            },
            {
                "month": "Mes 7",
                "plan": 788,
                "actual": 788
            },
            {
                "month": "Mes 8",
                "plan": 1029,
                "actual": 1029
            },
            {
                "month": "Mes 9",
                "plan": 1303,
                "actual": 1303
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-84",
        "name": "BOTADERO DE ESTÉRILES SUR (PAS 156 VP-0301-36)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Waste Storage Facility",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 85,
        "budgetProgressActual": 53,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 13,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 52,
                "actual": 52
            },
            {
                "month": "Mes 3",
                "plan": 116,
                "actual": 116
            },
            {
                "month": "Mes 4",
                "plan": 207,
                "actual": 207
            },
            {
                "month": "Mes 5",
                "plan": 323,
                "actual": 323
            },
            {
                "month": "Mes 6",
                "plan": 465,
                "actual": 465
            },
            {
                "month": "Mes 7",
                "plan": 634,
                "actual": 634
            },
            {
                "month": "Mes 8",
                "plan": 828,
                "actual": 828
            }
        ],
        "deliverables": [
            {
                "id": "84-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "84-1",
                "contratista": "SRK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-85",
        "name": "BOTADERO DE ESTÉRILES NORTE (PAS 156 VP-0301-45)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Waste Storage Facility",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 68,
        "budgetProgressActual": 73,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 33,
                "actual": 33
            },
            {
                "month": "Mes 2",
                "plan": 132,
                "actual": 132
            },
            {
                "month": "Mes 3",
                "plan": 297,
                "actual": 297
            },
            {
                "month": "Mes 4",
                "plan": 527,
                "actual": 527
            },
            {
                "month": "Mes 5",
                "plan": 824,
                "actual": 824
            },
            {
                "month": "Mes 6",
                "plan": 1186,
                "actual": 1186
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-86",
        "name": "RAJO SALARES NORTE (PAS 156 VP-0301-37)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 50,
        "budgetProgressActual": 70,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 48,
                "actual": 48
            },
            {
                "month": "Mes 3",
                "plan": 109,
                "actual": 109
            },
            {
                "month": "Mes 4",
                "plan": 193,
                "actual": 193
            },
            {
                "month": "Mes 5",
                "plan": 302,
                "actual": 302
            },
            {
                "month": "Mes 6",
                "plan": 435,
                "actual": 435
            },
            {
                "month": "Mes 7",
                "plan": 592,
                "actual": 592
            },
            {
                "month": "Mes 8",
                "plan": 774,
                "actual": 774
            },
            {
                "month": "Mes 9",
                "plan": 979,
                "actual": 979
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-87",
        "name": "PLANTA DE PROCESOS (PAS 156 VP-0301-35)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 68,
        "budgetProgressActual": 61,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 47,
                "actual": 47
            },
            {
                "month": "Mes 3",
                "plan": 106,
                "actual": 106
            },
            {
                "month": "Mes 4",
                "plan": 189,
                "actual": 189
            },
            {
                "month": "Mes 5",
                "plan": 296,
                "actual": 296
            },
            {
                "month": "Mes 6",
                "plan": 426,
                "actual": 426
            },
            {
                "month": "Mes 7",
                "plan": 580,
                "actual": 580
            },
            {
                "month": "Mes 8",
                "plan": 757,
                "actual": 757
            }
        ],
        "deliverables": [
            {
                "id": "87-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-88",
        "name": "BOTADERO DE ESTÉRILES NORTE (PAS 157 VP-0301-38)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Tailings & Waste Storage",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 86,
        "budgetProgressActual": 77,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 10,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 41,
                "actual": 41
            },
            {
                "month": "Mes 3",
                "plan": 92,
                "actual": 92
            },
            {
                "month": "Mes 4",
                "plan": 164,
                "actual": 164
            },
            {
                "month": "Mes 5",
                "plan": 256,
                "actual": 256
            },
            {
                "month": "Mes 6",
                "plan": 368,
                "actual": 368
            },
            {
                "month": "Mes 7",
                "plan": 501,
                "actual": 501
            },
            {
                "month": "Mes 8",
                "plan": 654,
                "actual": 654
            },
            {
                "month": "Mes 9",
                "plan": 828,
                "actual": 828
            },
            {
                "month": "Mes 10",
                "plan": 1022,
                "actual": 1022
            },
            {
                "month": "Mes 11",
                "plan": 1237,
                "actual": 1237
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-89",
        "name": "CANAL DE DERIVACIÓN SUPERIOR E INFERIOR (PAS 157 VP-0301-39)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Plant Area Preparation",
        "autoridad": "DGA",
        "contratistaResponsable": "SRK",
        "budgetProgressPlan": 63,
        "budgetProgressActual": 46,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 14,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 55,
                "actual": 55
            },
            {
                "month": "Mes 3",
                "plan": 124,
                "actual": 124
            },
            {
                "month": "Mes 4",
                "plan": 220,
                "actual": 220
            },
            {
                "month": "Mes 5",
                "plan": 343,
                "actual": 343
            },
            {
                "month": "Mes 6",
                "plan": 494,
                "actual": 494
            },
            {
                "month": "Mes 7",
                "plan": 672,
                "actual": 672
            },
            {
                "month": "Mes 8",
                "plan": 878,
                "actual": 878
            },
            {
                "month": "Mes 9",
                "plan": 1112,
                "actual": 1112
            },
            {
                "month": "Mes 10",
                "plan": 1372,
                "actual": 1372
            },
            {
                "month": "Mes 11",
                "plan": 1661,
                "actual": 1661
            }
        ],
        "deliverables": [
            {
                "id": "89-0",
                "contratista": "SRK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-90",
        "name": "CAMP. SALARES ETAPA 2",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "MINVU",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 82,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 46,
                "actual": 46
            },
            {
                "month": "Mes 3",
                "plan": 104,
                "actual": 104
            },
            {
                "month": "Mes 4",
                "plan": 185,
                "actual": 185
            },
            {
                "month": "Mes 5",
                "plan": 289,
                "actual": 289
            },
            {
                "month": "Mes 6",
                "plan": 417,
                "actual": 417
            },
            {
                "month": "Mes 7",
                "plan": 567,
                "actual": 567
            },
            {
                "month": "Mes 8",
                "plan": 741,
                "actual": 741
            },
            {
                "month": "Mes 9",
                "plan": 938,
                "actual": 938
            },
            {
                "month": "Mes 10",
                "plan": 1158,
                "actual": 1158
            }
        ],
        "deliverables": [
            {
                "id": "90-0",
                "contratista": "TECNOFAST",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-91",
        "name": "CAMP. SALARES ETAPA 2",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "DOM",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 42,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 36,
                "actual": 36
            },
            {
                "month": "Mes 2",
                "plan": 143,
                "actual": 143
            },
            {
                "month": "Mes 3",
                "plan": 321,
                "actual": 321
            },
            {
                "month": "Mes 4",
                "plan": 571,
                "actual": 571
            },
            {
                "month": "Mes 5",
                "plan": 892,
                "actual": 892
            },
            {
                "month": "Mes 6",
                "plan": 1284,
                "actual": 1284
            },
            {
                "month": "Mes 7",
                "plan": 1748,
                "actual": 1748
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-92",
        "name": "CENTRO DE CONSOLIDACIÓN DE RESIDUOS, SALA DE BASURA Y BATEAS SECTOR CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 81,
        "budgetProgressActual": 75,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 28,
                "actual": 28
            },
            {
                "month": "Mes 2",
                "plan": 111,
                "actual": 111
            },
            {
                "month": "Mes 3",
                "plan": 249,
                "actual": 249
            },
            {
                "month": "Mes 4",
                "plan": 443,
                "actual": 443
            },
            {
                "month": "Mes 5",
                "plan": 693,
                "actual": 693
            },
            {
                "month": "Mes 6",
                "plan": 998,
                "actual": 998
            },
            {
                "month": "Mes 7",
                "plan": 1358,
                "actual": 1358
            }
        ],
        "deliverables": [
            {
                "id": "92-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-93",
        "name": "SALAS DE BASURA Y BATEAS SECTOR BARRIO CÍVICO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 84,
        "budgetProgressActual": 44,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 17,
                "actual": 17
            },
            {
                "month": "Mes 2",
                "plan": 66,
                "actual": 66
            },
            {
                "month": "Mes 3",
                "plan": 149,
                "actual": 149
            },
            {
                "month": "Mes 4",
                "plan": 266,
                "actual": 266
            },
            {
                "month": "Mes 5",
                "plan": 415,
                "actual": 415
            },
            {
                "month": "Mes 6",
                "plan": 598,
                "actual": 598
            },
            {
                "month": "Mes 7",
                "plan": 814,
                "actual": 814
            },
            {
                "month": "Mes 8",
                "plan": 1063,
                "actual": 1063
            },
            {
                "month": "Mes 9",
                "plan": 1345,
                "actual": 1345
            }
        ],
        "deliverables": [
            {
                "id": "93-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "93-1",
                "contratista": "SGA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-94",
        "name": "PLATAFORMA 17, 18 y 19",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 89,
        "budgetProgressActual": 62,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 38,
                "actual": 38
            },
            {
                "month": "Mes 2",
                "plan": 154,
                "actual": 154
            },
            {
                "month": "Mes 3",
                "plan": 346,
                "actual": 346
            },
            {
                "month": "Mes 4",
                "plan": 615,
                "actual": 615
            },
            {
                "month": "Mes 5",
                "plan": 961,
                "actual": 961
            },
            {
                "month": "Mes 6",
                "plan": 1384,
                "actual": 1384
            },
            {
                "month": "Mes 7",
                "plan": 1884,
                "actual": 1884
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-95",
        "name": "ÁREA TEMPORAL DE ACOPIO - PLATAFORMA 7",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 83,
        "budgetProgressActual": 86,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 26,
                "actual": 26
            },
            {
                "month": "Mes 2",
                "plan": 104,
                "actual": 104
            },
            {
                "month": "Mes 3",
                "plan": 234,
                "actual": 234
            },
            {
                "month": "Mes 4",
                "plan": 415,
                "actual": 415
            },
            {
                "month": "Mes 5",
                "plan": 649,
                "actual": 649
            },
            {
                "month": "Mes 6",
                "plan": 934,
                "actual": 934
            },
            {
                "month": "Mes 7",
                "plan": 1272,
                "actual": 1272
            }
        ],
        "deliverables": [
            {
                "id": "95-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "95-1",
                "contratista": "SGA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-96",
        "name": "PLATAFORMA 17, 18 Y 19",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 86,
        "budgetProgressActual": 61,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 80,
                "actual": 80
            },
            {
                "month": "Mes 3",
                "plan": 179,
                "actual": 179
            },
            {
                "month": "Mes 4",
                "plan": 319,
                "actual": 319
            },
            {
                "month": "Mes 5",
                "plan": 498,
                "actual": 498
            },
            {
                "month": "Mes 6",
                "plan": 717,
                "actual": 717
            }
        ],
        "deliverables": [
            {
                "id": "96-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-97",
        "name": "TALLER  MINA PLANTA (BODEGA ICV) - SECTOR MINA (PLATAFORMA 4A)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 79,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 49,
                "actual": 49
            },
            {
                "month": "Mes 3",
                "plan": 111,
                "actual": 111
            },
            {
                "month": "Mes 4",
                "plan": 197,
                "actual": 197
            },
            {
                "month": "Mes 5",
                "plan": 308,
                "actual": 308
            },
            {
                "month": "Mes 6",
                "plan": 443,
                "actual": 443
            },
            {
                "month": "Mes 7",
                "plan": 603,
                "actual": 603
            },
            {
                "month": "Mes 8",
                "plan": 788,
                "actual": 788
            },
            {
                "month": "Mes 9",
                "plan": 997,
                "actual": 997
            }
        ],
        "deliverables": [
            {
                "id": "97-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "97-1",
                "contratista": "SGA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-98",
        "name": "CAMP. SALARES ETAPA 2",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 47,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 17,
                "actual": 17
            },
            {
                "month": "Mes 2",
                "plan": 68,
                "actual": 68
            },
            {
                "month": "Mes 3",
                "plan": 153,
                "actual": 153
            },
            {
                "month": "Mes 4",
                "plan": 273,
                "actual": 273
            },
            {
                "month": "Mes 5",
                "plan": 426,
                "actual": 426
            },
            {
                "month": "Mes 6",
                "plan": 614,
                "actual": 614
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-99",
        "name": "CAMP. SALARES ETAPA 2",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 50,
        "budgetProgressActual": 71,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 21,
                "actual": 21
            },
            {
                "month": "Mes 2",
                "plan": 84,
                "actual": 84
            },
            {
                "month": "Mes 3",
                "plan": 188,
                "actual": 188
            },
            {
                "month": "Mes 4",
                "plan": 335,
                "actual": 335
            },
            {
                "month": "Mes 5",
                "plan": 523,
                "actual": 523
            },
            {
                "month": "Mes 6",
                "plan": 753,
                "actual": 753
            },
            {
                "month": "Mes 7",
                "plan": 1025,
                "actual": 1025
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-100",
        "name": "BARRIO CIVICO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "MINVU",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 50,
        "budgetProgressActual": 84,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 79,
                "actual": 79
            },
            {
                "month": "Mes 3",
                "plan": 177,
                "actual": 177
            },
            {
                "month": "Mes 4",
                "plan": 315,
                "actual": 315
            },
            {
                "month": "Mes 5",
                "plan": 492,
                "actual": 492
            },
            {
                "month": "Mes 6",
                "plan": 709,
                "actual": 709
            },
            {
                "month": "Mes 7",
                "plan": 964,
                "actual": 964
            },
            {
                "month": "Mes 8",
                "plan": 1260,
                "actual": 1260
            }
        ],
        "deliverables": [
            {
                "id": "100-0",
                "contratista": "TECNOFAST",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-101",
        "name": "IFC PAQUETE 8",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Filtrado De Relaves",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 56,
        "budgetProgressActual": 64,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 18,
                "actual": 18
            },
            {
                "month": "Mes 2",
                "plan": 74,
                "actual": 74
            },
            {
                "month": "Mes 3",
                "plan": 166,
                "actual": 166
            },
            {
                "month": "Mes 4",
                "plan": 296,
                "actual": 296
            },
            {
                "month": "Mes 5",
                "plan": 462,
                "actual": 462
            },
            {
                "month": "Mes 6",
                "plan": 665,
                "actual": 665
            },
            {
                "month": "Mes 7",
                "plan": 906,
                "actual": 906
            },
            {
                "month": "Mes 8",
                "plan": 1183,
                "actual": 1183
            },
            {
                "month": "Mes 9",
                "plan": 1497,
                "actual": 1497
            }
        ],
        "deliverables": [
            {
                "id": "101-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "101-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-102",
        "name": "PATIO DE NEUMATICO 2 Y 3 (PLATAFORMA 5 - PLATAFORMA 6)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 53,
        "budgetProgressActual": 76,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 13,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 53,
                "actual": 53
            },
            {
                "month": "Mes 3",
                "plan": 119,
                "actual": 119
            },
            {
                "month": "Mes 4",
                "plan": 211,
                "actual": 211
            },
            {
                "month": "Mes 5",
                "plan": 330,
                "actual": 330
            },
            {
                "month": "Mes 6",
                "plan": 475,
                "actual": 475
            },
            {
                "month": "Mes 7",
                "plan": 646,
                "actual": 646
            },
            {
                "month": "Mes 8",
                "plan": 844,
                "actual": 844
            },
            {
                "month": "Mes 9",
                "plan": 1068,
                "actual": 1068
            },
            {
                "month": "Mes 10",
                "plan": 1318,
                "actual": 1318
            }
        ],
        "deliverables": [
            {
                "id": "102-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-103",
        "name": "PATIO DE NEUMATICO 1",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 68,
        "budgetProgressActual": 68,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 26,
                "actual": 26
            },
            {
                "month": "Mes 2",
                "plan": 105,
                "actual": 105
            },
            {
                "month": "Mes 3",
                "plan": 237,
                "actual": 237
            },
            {
                "month": "Mes 4",
                "plan": 421,
                "actual": 421
            },
            {
                "month": "Mes 5",
                "plan": 657,
                "actual": 657
            },
            {
                "month": "Mes 6",
                "plan": 946,
                "actual": 946
            },
            {
                "month": "Mes 7",
                "plan": 1288,
                "actual": 1288
            },
            {
                "month": "Mes 8",
                "plan": 1682,
                "actual": 1682
            }
        ],
        "deliverables": [
            {
                "id": "103-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-104",
        "name": "EXCEDENTES DE HORMIGÓN",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 57,
        "budgetProgressActual": 69,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 48,
                "actual": 48
            },
            {
                "month": "Mes 3",
                "plan": 108,
                "actual": 108
            },
            {
                "month": "Mes 4",
                "plan": 191,
                "actual": 191
            },
            {
                "month": "Mes 5",
                "plan": 299,
                "actual": 299
            },
            {
                "month": "Mes 6",
                "plan": 431,
                "actual": 431
            },
            {
                "month": "Mes 7",
                "plan": 586,
                "actual": 586
            },
            {
                "month": "Mes 8",
                "plan": 766,
                "actual": 766
            },
            {
                "month": "Mes 9",
                "plan": 969,
                "actual": 969
            }
        ],
        "deliverables": [
            {
                "id": "104-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-105",
        "name": "GENERAL",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General",
        "autoridad": "DIRECCIÓN DEL TRABAJO Y SEREMI DE SALUD",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 56,
        "budgetProgressActual": 41,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 11
            },
            {
                "month": "Mes 2",
                "plan": 45,
                "actual": 45
            },
            {
                "month": "Mes 3",
                "plan": 101,
                "actual": 101
            },
            {
                "month": "Mes 4",
                "plan": 180,
                "actual": 180
            },
            {
                "month": "Mes 5",
                "plan": 282,
                "actual": 282
            },
            {
                "month": "Mes 6",
                "plan": 406,
                "actual": 406
            },
            {
                "month": "Mes 7",
                "plan": 552,
                "actual": 552
            },
            {
                "month": "Mes 8",
                "plan": 721,
                "actual": 721
            },
            {
                "month": "Mes 9",
                "plan": 913,
                "actual": 913
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-106",
        "name": "MINA - PLANTA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "SGA",
        "budgetProgressPlan": 87,
        "budgetProgressActual": 82,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 25,
                "actual": 25
            },
            {
                "month": "Mes 2",
                "plan": 99,
                "actual": 99
            },
            {
                "month": "Mes 3",
                "plan": 222,
                "actual": 222
            },
            {
                "month": "Mes 4",
                "plan": 394,
                "actual": 394
            },
            {
                "month": "Mes 5",
                "plan": 616,
                "actual": 616
            },
            {
                "month": "Mes 6",
                "plan": 887,
                "actual": 887
            },
            {
                "month": "Mes 7",
                "plan": 1207,
                "actual": 1207
            },
            {
                "month": "Mes 8",
                "plan": 1576,
                "actual": 1576
            }
        ],
        "deliverables": [
            {
                "id": "106-0",
                "contratista": "SGA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-107",
        "name": "PAAT-2",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Fuel System",
        "autoridad": "DOM",
        "contratistaResponsable": "COPEC",
        "budgetProgressPlan": 98,
        "budgetProgressActual": 72,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 36,
                "actual": 36
            },
            {
                "month": "Mes 2",
                "plan": 144,
                "actual": 144
            },
            {
                "month": "Mes 3",
                "plan": 325,
                "actual": 325
            },
            {
                "month": "Mes 4",
                "plan": 578,
                "actual": 578
            },
            {
                "month": "Mes 5",
                "plan": 903,
                "actual": 903
            },
            {
                "month": "Mes 6",
                "plan": 1300,
                "actual": 1300
            }
        ],
        "deliverables": [
            {
                "id": "107-0",
                "contratista": "COPEC",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-108",
        "name": "EDIFICIO COCINA COMEDOR CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "COMPASS CATERING S.A.",
        "budgetProgressPlan": 62,
        "budgetProgressActual": 49,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 10,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 39,
                "actual": 39
            },
            {
                "month": "Mes 3",
                "plan": 88,
                "actual": 88
            },
            {
                "month": "Mes 4",
                "plan": 156,
                "actual": 156
            },
            {
                "month": "Mes 5",
                "plan": 244,
                "actual": 244
            },
            {
                "month": "Mes 6",
                "plan": 352,
                "actual": 352
            },
            {
                "month": "Mes 7",
                "plan": 479,
                "actual": 479
            },
            {
                "month": "Mes 8",
                "plan": 625,
                "actual": 625
            },
            {
                "month": "Mes 9",
                "plan": 791,
                "actual": 791
            },
            {
                "month": "Mes 10",
                "plan": 977,
                "actual": 977
            }
        ],
        "deliverables": [
            {
                "id": "108-0",
                "contratista": "COMPASS CATERING S.A.",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-109",
        "name": "CAPTURA DE ESPECIES ROQUERIO 03 - ZONA II (SECTOR  MINA - PLANTA) / CAPTURA DE ESPECIES ROQUERIO 06 - ZONA II (SECTOR  MINA - PLANTA) / CAPTURA DE ESPECIES ROQUERIO 07 - ZONA II (SECTOR  MINA - PLANTA) / CAPTURA DE ESPECIES ROQUERIO 05 - ZONA III (SECTOR  MINA - PLANTA) / CAPTURA DE ESPECIES ROQUERIO 08 - ZONA III (SECTOR  MINA - PLANTA) / CAPTURA DE ESPECIES ROQUERIO 09 - ZONA III (SECTOR  MINA - PLANTA) / CAPTURA DE ESPECIES ROQUERIO 10 - ZONA III  (SECTOR  MINA - PLANTA)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SAG",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 79,
        "budgetProgressActual": 75,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 40,
                "actual": 40
            },
            {
                "month": "Mes 2",
                "plan": 159,
                "actual": 159
            },
            {
                "month": "Mes 3",
                "plan": 357,
                "actual": 357
            },
            {
                "month": "Mes 4",
                "plan": 635,
                "actual": 635
            },
            {
                "month": "Mes 5",
                "plan": 992,
                "actual": 992
            },
            {
                "month": "Mes 6",
                "plan": 1428,
                "actual": 1428
            },
            {
                "month": "Mes 7",
                "plan": 1944,
                "actual": 1944
            }
        ],
        "deliverables": [
            {
                "id": "109-0",
                "contratista": "MGFSN",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-110",
        "name": "GARITA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 80,
        "budgetProgressActual": 47,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 26,
                "actual": 26
            },
            {
                "month": "Mes 2",
                "plan": 103,
                "actual": 103
            },
            {
                "month": "Mes 3",
                "plan": 232,
                "actual": 232
            },
            {
                "month": "Mes 4",
                "plan": 412,
                "actual": 412
            },
            {
                "month": "Mes 5",
                "plan": 644,
                "actual": 644
            },
            {
                "month": "Mes 6",
                "plan": 928,
                "actual": 928
            },
            {
                "month": "Mes 7",
                "plan": 1263,
                "actual": 1263
            },
            {
                "month": "Mes 8",
                "plan": 1650,
                "actual": 1650
            }
        ],
        "deliverables": [
            {
                "id": "110-0",
                "contratista": "TECNOFAST",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-111",
        "name": "PAQUETE 3 (PLATAFORMAS 17-18-19)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 79,
        "budgetProgressActual": 67,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 47,
                "actual": 47
            },
            {
                "month": "Mes 2",
                "plan": 187,
                "actual": 187
            },
            {
                "month": "Mes 3",
                "plan": 420,
                "actual": 420
            },
            {
                "month": "Mes 4",
                "plan": 747,
                "actual": 747
            },
            {
                "month": "Mes 5",
                "plan": 1167,
                "actual": 1167
            },
            {
                "month": "Mes 6",
                "plan": 1681,
                "actual": 1681
            }
        ],
        "deliverables": [
            {
                "id": "111-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "111-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-112",
        "name": "GARITA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "DOM",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 73,
        "budgetProgressActual": 68,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 82,
                "actual": 82
            },
            {
                "month": "Mes 3",
                "plan": 184,
                "actual": 184
            },
            {
                "month": "Mes 4",
                "plan": 327,
                "actual": 327
            },
            {
                "month": "Mes 5",
                "plan": 511,
                "actual": 511
            },
            {
                "month": "Mes 6",
                "plan": 736,
                "actual": 736
            }
        ],
        "deliverables": [
            {
                "id": "112-0",
                "contratista": "TECNOFAST",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-113",
        "name": "PAQUETE 4 (TALLER DE CAMIONES)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 65,
        "budgetProgressActual": 89,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 21,
                "actual": 21
            },
            {
                "month": "Mes 2",
                "plan": 86,
                "actual": 86
            },
            {
                "month": "Mes 3",
                "plan": 192,
                "actual": 192
            },
            {
                "month": "Mes 4",
                "plan": 342,
                "actual": 342
            },
            {
                "month": "Mes 5",
                "plan": 534,
                "actual": 534
            },
            {
                "month": "Mes 6",
                "plan": 770,
                "actual": 770
            },
            {
                "month": "Mes 7",
                "plan": 1047,
                "actual": 1047
            },
            {
                "month": "Mes 8",
                "plan": 1368,
                "actual": 1368
            },
            {
                "month": "Mes 9",
                "plan": 1732,
                "actual": 1732
            }
        ],
        "deliverables": [
            {
                "id": "113-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "113-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-114",
        "name": "PLATAFORMA 5",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "VECCHIOLA S.A.",
        "budgetProgressPlan": 92,
        "budgetProgressActual": 68,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 24,
                "actual": 24
            },
            {
                "month": "Mes 2",
                "plan": 97,
                "actual": 97
            },
            {
                "month": "Mes 3",
                "plan": 217,
                "actual": 217
            },
            {
                "month": "Mes 4",
                "plan": 387,
                "actual": 387
            },
            {
                "month": "Mes 5",
                "plan": 604,
                "actual": 604
            },
            {
                "month": "Mes 6",
                "plan": 870,
                "actual": 870
            },
            {
                "month": "Mes 7",
                "plan": 1184,
                "actual": 1184
            },
            {
                "month": "Mes 8",
                "plan": 1546,
                "actual": 1546
            }
        ],
        "deliverables": [
            {
                "id": "114-0",
                "contratista": "VECCHIOLA S.A.",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-115",
        "name": "PLATAFORMAS 1, 6 Y 7 / FASE 1",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "ICSK",
        "budgetProgressPlan": 99,
        "budgetProgressActual": 76,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 80,
                "actual": 80
            },
            {
                "month": "Mes 3",
                "plan": 181,
                "actual": 181
            },
            {
                "month": "Mes 4",
                "plan": 322,
                "actual": 322
            },
            {
                "month": "Mes 5",
                "plan": 503,
                "actual": 503
            },
            {
                "month": "Mes 6",
                "plan": 724,
                "actual": 724
            },
            {
                "month": "Mes 7",
                "plan": 986,
                "actual": 986
            },
            {
                "month": "Mes 8",
                "plan": 1287,
                "actual": 1287
            }
        ],
        "deliverables": [
            {
                "id": "115-0",
                "contratista": "ICSK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "115-1",
                "contratista": "ICSK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-116",
        "name": "GARITA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 93,
        "budgetProgressActual": 79,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 30,
                "actual": 30
            },
            {
                "month": "Mes 2",
                "plan": 120,
                "actual": 120
            },
            {
                "month": "Mes 3",
                "plan": 271,
                "actual": 271
            },
            {
                "month": "Mes 4",
                "plan": 482,
                "actual": 482
            },
            {
                "month": "Mes 5",
                "plan": 752,
                "actual": 752
            },
            {
                "month": "Mes 6",
                "plan": 1084,
                "actual": 1084
            }
        ],
        "deliverables": [
            {
                "id": "116-0",
                "contratista": "TECNOFAST",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-117",
        "name": "PLATAFORMA 5",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "VECCHIOLA S.A.",
        "budgetProgressPlan": 51,
        "budgetProgressActual": 44,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 43,
                "actual": 43
            },
            {
                "month": "Mes 2",
                "plan": 170,
                "actual": 170
            },
            {
                "month": "Mes 3",
                "plan": 383,
                "actual": 383
            },
            {
                "month": "Mes 4",
                "plan": 681,
                "actual": 681
            },
            {
                "month": "Mes 5",
                "plan": 1065,
                "actual": 1065
            },
            {
                "month": "Mes 6",
                "plan": 1533,
                "actual": 1533
            }
        ],
        "deliverables": [
            {
                "id": "117-0",
                "contratista": "VECCHIOLA S.A.",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "117-1",
                "contratista": "VECCHIOLA S.A.",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-118",
        "name": "PLATAFORMAS 6 Y 7 / FASE 2",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "ICSK",
        "budgetProgressPlan": 63,
        "budgetProgressActual": 70,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 14,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 58,
                "actual": 58
            },
            {
                "month": "Mes 3",
                "plan": 130,
                "actual": 130
            },
            {
                "month": "Mes 4",
                "plan": 231,
                "actual": 231
            },
            {
                "month": "Mes 5",
                "plan": 361,
                "actual": 361
            },
            {
                "month": "Mes 6",
                "plan": 520,
                "actual": 520
            },
            {
                "month": "Mes 7",
                "plan": 708,
                "actual": 708
            },
            {
                "month": "Mes 8",
                "plan": 925,
                "actual": 925
            },
            {
                "month": "Mes 9",
                "plan": 1170,
                "actual": 1170
            },
            {
                "month": "Mes 10",
                "plan": 1445,
                "actual": 1445
            },
            {
                "month": "Mes 11",
                "plan": 1748,
                "actual": 1748
            }
        ],
        "deliverables": [
            {
                "id": "118-0",
                "contratista": "ICSK",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "118-1",
                "contratista": "ICSK",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-119",
        "name": "PAQUETE 5 (CHANCADOR, STOCKPILE Y MOLIENDA)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Material Handling",
        "autoridad": "DOM",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 95,
        "budgetProgressActual": 83,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 14,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 58,
                "actual": 58
            },
            {
                "month": "Mes 3",
                "plan": 130,
                "actual": 130
            },
            {
                "month": "Mes 4",
                "plan": 231,
                "actual": 231
            },
            {
                "month": "Mes 5",
                "plan": 361,
                "actual": 361
            },
            {
                "month": "Mes 6",
                "plan": 519,
                "actual": 519
            },
            {
                "month": "Mes 7",
                "plan": 707,
                "actual": 707
            },
            {
                "month": "Mes 8",
                "plan": 923,
                "actual": 923
            },
            {
                "month": "Mes 9",
                "plan": 1168,
                "actual": 1168
            }
        ],
        "deliverables": [
            {
                "id": "119-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-120",
        "name": "GENERAL",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 85,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 48,
                "actual": 48
            },
            {
                "month": "Mes 2",
                "plan": 192,
                "actual": 192
            },
            {
                "month": "Mes 3",
                "plan": 433,
                "actual": 433
            },
            {
                "month": "Mes 4",
                "plan": 770,
                "actual": 770
            },
            {
                "month": "Mes 5",
                "plan": 1202,
                "actual": 1202
            },
            {
                "month": "Mes 6",
                "plan": 1731,
                "actual": 1731
            }
        ],
        "deliverables": [
            {
                "id": "120-0",
                "contratista": "MGFSN",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-121",
        "name": "CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "RESITER",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 50,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 21,
                "actual": 21
            },
            {
                "month": "Mes 2",
                "plan": 84,
                "actual": 84
            },
            {
                "month": "Mes 3",
                "plan": 190,
                "actual": 190
            },
            {
                "month": "Mes 4",
                "plan": 338,
                "actual": 338
            },
            {
                "month": "Mes 5",
                "plan": 528,
                "actual": 528
            },
            {
                "month": "Mes 6",
                "plan": 760,
                "actual": 760
            }
        ],
        "deliverables": [
            {
                "id": "121-0",
                "contratista": "RESITER",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "121-1",
                "contratista": "RESITER",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-122",
        "name": "EDIFICIO COCINA COMEDOR CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "COMPASS CATERING S.A.",
        "budgetProgressPlan": 71,
        "budgetProgressActual": 69,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 8,
                "actual": 8
            },
            {
                "month": "Mes 2",
                "plan": 32,
                "actual": 32
            },
            {
                "month": "Mes 3",
                "plan": 72,
                "actual": 72
            },
            {
                "month": "Mes 4",
                "plan": 128,
                "actual": 128
            },
            {
                "month": "Mes 5",
                "plan": 200,
                "actual": 200
            },
            {
                "month": "Mes 6",
                "plan": 288,
                "actual": 288
            },
            {
                "month": "Mes 7",
                "plan": 392,
                "actual": 392
            },
            {
                "month": "Mes 8",
                "plan": 512,
                "actual": 512
            },
            {
                "month": "Mes 9",
                "plan": 649,
                "actual": 649
            },
            {
                "month": "Mes 10",
                "plan": 801,
                "actual": 801
            },
            {
                "month": "Mes 11",
                "plan": 969,
                "actual": 969
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-123",
        "name": "EDIFICIO COCINA COMEDOR CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "COMPASS CATERING S.A.",
        "budgetProgressPlan": 74,
        "budgetProgressActual": 77,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 29,
                "actual": 29
            },
            {
                "month": "Mes 2",
                "plan": 116,
                "actual": 116
            },
            {
                "month": "Mes 3",
                "plan": 261,
                "actual": 261
            },
            {
                "month": "Mes 4",
                "plan": 464,
                "actual": 464
            },
            {
                "month": "Mes 5",
                "plan": 725,
                "actual": 725
            },
            {
                "month": "Mes 6",
                "plan": 1045,
                "actual": 1045
            },
            {
                "month": "Mes 7",
                "plan": 1422,
                "actual": 1422
            },
            {
                "month": "Mes 8",
                "plan": 1857,
                "actual": 1857
            }
        ],
        "deliverables": [
            {
                "id": "123-0",
                "contratista": "COMPASS CATERING S.A.",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-124",
        "name": "MINA - PLANTA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 63,
        "budgetProgressActual": 71,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 10,
                "actual": 10
            },
            {
                "month": "Mes 2",
                "plan": 41,
                "actual": 41
            },
            {
                "month": "Mes 3",
                "plan": 92,
                "actual": 92
            },
            {
                "month": "Mes 4",
                "plan": 164,
                "actual": 164
            },
            {
                "month": "Mes 5",
                "plan": 256,
                "actual": 256
            },
            {
                "month": "Mes 6",
                "plan": 369,
                "actual": 369
            },
            {
                "month": "Mes 7",
                "plan": 502,
                "actual": 502
            },
            {
                "month": "Mes 8",
                "plan": 656,
                "actual": 656
            },
            {
                "month": "Mes 9",
                "plan": 830,
                "actual": 830
            }
        ],
        "deliverables": [
            {
                "id": "124-0",
                "contratista": "MGFSN",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "124-1",
                "contratista": "MGFSN",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-125",
        "name": "IFC PAQUETE 7",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 88,
        "budgetProgressActual": 41,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 34,
                "actual": 34
            },
            {
                "month": "Mes 2",
                "plan": 136,
                "actual": 136
            },
            {
                "month": "Mes 3",
                "plan": 305,
                "actual": 305
            },
            {
                "month": "Mes 4",
                "plan": 543,
                "actual": 543
            },
            {
                "month": "Mes 5",
                "plan": 848,
                "actual": 848
            },
            {
                "month": "Mes 6",
                "plan": 1221,
                "actual": 1221
            },
            {
                "month": "Mes 7",
                "plan": 1662,
                "actual": 1662
            }
        ],
        "deliverables": [
            {
                "id": "125-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-126",
        "name": "TALLER TEMPORAL DE CAMIONES (NAVES)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "ICV",
        "budgetProgressPlan": 85,
        "budgetProgressActual": 70,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 19,
                "actual": 19
            },
            {
                "month": "Mes 2",
                "plan": 76,
                "actual": 76
            },
            {
                "month": "Mes 3",
                "plan": 172,
                "actual": 172
            },
            {
                "month": "Mes 4",
                "plan": 306,
                "actual": 306
            },
            {
                "month": "Mes 5",
                "plan": 477,
                "actual": 477
            },
            {
                "month": "Mes 6",
                "plan": 687,
                "actual": 687
            }
        ],
        "deliverables": [
            {
                "id": "126-0",
                "contratista": "ICV",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-127",
        "name": "TALLER TEMPORAL DE CAMIONES (OFICINAS)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "DOM",
        "contratistaResponsable": "ICV",
        "budgetProgressPlan": 77,
        "budgetProgressActual": 67,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 48,
                "actual": 48
            },
            {
                "month": "Mes 3",
                "plan": 107,
                "actual": 107
            },
            {
                "month": "Mes 4",
                "plan": 191,
                "actual": 191
            },
            {
                "month": "Mes 5",
                "plan": 299,
                "actual": 299
            },
            {
                "month": "Mes 6",
                "plan": 430,
                "actual": 430
            },
            {
                "month": "Mes 7",
                "plan": 585,
                "actual": 585
            },
            {
                "month": "Mes 8",
                "plan": 764,
                "actual": 764
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-128",
        "name": "TALLER TEMPORAL DE CAMIONES (NAVES Y OFICINAS)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "ICV",
        "budgetProgressPlan": 84,
        "budgetProgressActual": 68,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 18,
                "actual": 18
            },
            {
                "month": "Mes 2",
                "plan": 72,
                "actual": 72
            },
            {
                "month": "Mes 3",
                "plan": 162,
                "actual": 162
            },
            {
                "month": "Mes 4",
                "plan": 289,
                "actual": 289
            },
            {
                "month": "Mes 5",
                "plan": 451,
                "actual": 451
            },
            {
                "month": "Mes 6",
                "plan": 649,
                "actual": 649
            },
            {
                "month": "Mes 7",
                "plan": 884,
                "actual": 884
            },
            {
                "month": "Mes 8",
                "plan": 1154,
                "actual": 1154
            },
            {
                "month": "Mes 9",
                "plan": 1461,
                "actual": 1461
            },
            {
                "month": "Mes 10",
                "plan": 1803,
                "actual": 1803
            }
        ],
        "deliverables": [
            {
                "id": "128-0",
                "contratista": "ICV",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "128-1",
                "contratista": "ICV",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-129",
        "name": "IFC PAQUETE 9",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Process Plant",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 67,
        "budgetProgressActual": 59,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 23,
                "actual": 23
            },
            {
                "month": "Mes 2",
                "plan": 90,
                "actual": 90
            },
            {
                "month": "Mes 3",
                "plan": 203,
                "actual": 203
            },
            {
                "month": "Mes 4",
                "plan": 360,
                "actual": 360
            },
            {
                "month": "Mes 5",
                "plan": 563,
                "actual": 563
            },
            {
                "month": "Mes 6",
                "plan": 810,
                "actual": 810
            }
        ],
        "deliverables": [
            {
                "id": "129-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-130",
        "name": "IFC PAQUETE 5",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Planta de Procesos",
        "wbs": "Material Handling",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 72,
        "budgetProgressActual": 44,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 50,
                "actual": 50
            },
            {
                "month": "Mes 2",
                "plan": 202,
                "actual": 202
            },
            {
                "month": "Mes 3",
                "plan": 454,
                "actual": 454
            },
            {
                "month": "Mes 4",
                "plan": 807,
                "actual": 807
            },
            {
                "month": "Mes 5",
                "plan": 1261,
                "actual": 1261
            },
            {
                "month": "Mes 6",
                "plan": 1815,
                "actual": 1815
            }
        ],
        "deliverables": [
            {
                "id": "130-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "130-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-131",
        "name": "GENERAL",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 58,
        "budgetProgressActual": 75,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 8,
                "actual": 8
            },
            {
                "month": "Mes 2",
                "plan": 31,
                "actual": 31
            },
            {
                "month": "Mes 3",
                "plan": 70,
                "actual": 70
            },
            {
                "month": "Mes 4",
                "plan": 124,
                "actual": 124
            },
            {
                "month": "Mes 5",
                "plan": 194,
                "actual": 194
            },
            {
                "month": "Mes 6",
                "plan": 279,
                "actual": 279
            },
            {
                "month": "Mes 7",
                "plan": 380,
                "actual": 380
            },
            {
                "month": "Mes 8",
                "plan": 496,
                "actual": 496
            },
            {
                "month": "Mes 9",
                "plan": 628,
                "actual": 628
            },
            {
                "month": "Mes 10",
                "plan": 775,
                "actual": 775
            },
            {
                "month": "Mes 11",
                "plan": 938,
                "actual": 938
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-132",
        "name": "GENERAL",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 80,
        "budgetProgressActual": 71,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 81,
                "actual": 81
            },
            {
                "month": "Mes 3",
                "plan": 183,
                "actual": 183
            },
            {
                "month": "Mes 4",
                "plan": 325,
                "actual": 325
            },
            {
                "month": "Mes 5",
                "plan": 508,
                "actual": 508
            },
            {
                "month": "Mes 6",
                "plan": 732,
                "actual": 732
            },
            {
                "month": "Mes 7",
                "plan": 996,
                "actual": 996
            },
            {
                "month": "Mes 8",
                "plan": 1301,
                "actual": 1301
            },
            {
                "month": "Mes 9",
                "plan": 1646,
                "actual": 1646
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-133",
        "name": "MINA - PLANTA",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine",
        "autoridad": "SERNAGEOMIN",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 61,
        "budgetProgressActual": 81,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 25,
                "actual": 25
            },
            {
                "month": "Mes 2",
                "plan": 102,
                "actual": 102
            },
            {
                "month": "Mes 3",
                "plan": 229,
                "actual": 229
            },
            {
                "month": "Mes 4",
                "plan": 407,
                "actual": 407
            },
            {
                "month": "Mes 5",
                "plan": 635,
                "actual": 635
            },
            {
                "month": "Mes 6",
                "plan": 915,
                "actual": 915
            }
        ],
        "deliverables": [
            {
                "id": "133-0",
                "contratista": "MGFSN",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-134",
        "name": "TALLER TEMPORAL DE CAMIONES (NAVES Y OFICINAS)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "ICV",
        "budgetProgressPlan": 77,
        "budgetProgressActual": 46,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 2",
                "plan": 81,
                "actual": 81
            },
            {
                "month": "Mes 3",
                "plan": 182,
                "actual": 182
            },
            {
                "month": "Mes 4",
                "plan": 324,
                "actual": 324
            },
            {
                "month": "Mes 5",
                "plan": 506,
                "actual": 506
            },
            {
                "month": "Mes 6",
                "plan": 729,
                "actual": 729
            }
        ],
        "deliverables": [
            {
                "id": "134-0",
                "contratista": "ICV",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "134-1",
                "contratista": "ICV",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-135",
        "name": "POLICLÍNICO - CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "MUTUAL",
        "budgetProgressPlan": 54,
        "budgetProgressActual": 88,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 11,
                "actual": 11
            },
            {
                "month": "Mes 2",
                "plan": 43,
                "actual": 43
            },
            {
                "month": "Mes 3",
                "plan": 97,
                "actual": 97
            },
            {
                "month": "Mes 4",
                "plan": 173,
                "actual": 173
            },
            {
                "month": "Mes 5",
                "plan": 270,
                "actual": 270
            },
            {
                "month": "Mes 6",
                "plan": 389,
                "actual": 389
            },
            {
                "month": "Mes 7",
                "plan": 530,
                "actual": 530
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-136",
        "name": "IFC PAQUETE 4",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Mina",
        "wbs": "Mine Facilities",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 63,
        "budgetProgressActual": 50,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 59,
                "actual": 59
            },
            {
                "month": "Mes 3",
                "plan": 132,
                "actual": 132
            },
            {
                "month": "Mes 4",
                "plan": 235,
                "actual": 235
            },
            {
                "month": "Mes 5",
                "plan": 368,
                "actual": 368
            },
            {
                "month": "Mes 6",
                "plan": 530,
                "actual": 530
            },
            {
                "month": "Mes 7",
                "plan": 721,
                "actual": 721
            },
            {
                "month": "Mes 8",
                "plan": 942,
                "actual": 942
            },
            {
                "month": "Mes 9",
                "plan": 1192,
                "actual": 1192
            },
            {
                "month": "Mes 10",
                "plan": 1471,
                "actual": 1471
            }
        ],
        "deliverables": [
            {
                "id": "136-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "136-1",
                "contratista": "GESTIONA",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-137",
        "name": "POLICLÍNICO - CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "MUTUAL",
        "budgetProgressPlan": 65,
        "budgetProgressActual": 86,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 53,
                "actual": 53
            },
            {
                "month": "Mes 2",
                "plan": 210,
                "actual": 210
            },
            {
                "month": "Mes 3",
                "plan": 473,
                "actual": 473
            },
            {
                "month": "Mes 4",
                "plan": 841,
                "actual": 841
            },
            {
                "month": "Mes 5",
                "plan": 1314,
                "actual": 1314
            },
            {
                "month": "Mes 6",
                "plan": 1892,
                "actual": 1892
            }
        ],
        "deliverables": [
            {
                "id": "137-0",
                "contratista": "MUTUAL",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "137-1",
                "contratista": "MUTUAL",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-138",
        "name": "POLICLÍNICO - CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "MUTUAL",
        "budgetProgressPlan": 51,
        "budgetProgressActual": 66,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 61,
                "actual": 61
            },
            {
                "month": "Mes 3",
                "plan": 137,
                "actual": 137
            },
            {
                "month": "Mes 4",
                "plan": 243,
                "actual": 243
            },
            {
                "month": "Mes 5",
                "plan": 380,
                "actual": 380
            },
            {
                "month": "Mes 6",
                "plan": 548,
                "actual": 548
            },
            {
                "month": "Mes 7",
                "plan": 746,
                "actual": 746
            },
            {
                "month": "Mes 8",
                "plan": 974,
                "actual": 974
            },
            {
                "month": "Mes 9",
                "plan": 1232,
                "actual": 1232
            },
            {
                "month": "Mes 10",
                "plan": 1522,
                "actual": 1522
            },
            {
                "month": "Mes 11",
                "plan": 1841,
                "actual": 1841
            }
        ],
        "deliverables": [
            {
                "id": "138-0",
                "contratista": "MUTUAL",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "138-1",
                "contratista": "MUTUAL",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-139",
        "name": "POLICLÍNICO - CAMPAMENTO",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SEREMI DE SALUD",
        "contratistaResponsable": "MUTUAL",
        "budgetProgressPlan": 91,
        "budgetProgressActual": 79,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 13,
                "actual": 13
            },
            {
                "month": "Mes 2",
                "plan": 52,
                "actual": 52
            },
            {
                "month": "Mes 3",
                "plan": 117,
                "actual": 117
            },
            {
                "month": "Mes 4",
                "plan": 208,
                "actual": 208
            },
            {
                "month": "Mes 5",
                "plan": 325,
                "actual": 325
            },
            {
                "month": "Mes 6",
                "plan": 468,
                "actual": 468
            },
            {
                "month": "Mes 7",
                "plan": 637,
                "actual": 637
            },
            {
                "month": "Mes 8",
                "plan": 831,
                "actual": 831
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-140",
        "name": "IFC PAQUETE 3",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Temporary Facilities",
        "autoridad": "MINVU",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 50,
        "budgetProgressActual": 74,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 21,
                "actual": 21
            },
            {
                "month": "Mes 2",
                "plan": 85,
                "actual": 85
            },
            {
                "month": "Mes 3",
                "plan": 191,
                "actual": 191
            },
            {
                "month": "Mes 4",
                "plan": 339,
                "actual": 339
            },
            {
                "month": "Mes 5",
                "plan": 530,
                "actual": 530
            },
            {
                "month": "Mes 6",
                "plan": 763,
                "actual": 763
            },
            {
                "month": "Mes 7",
                "plan": 1038,
                "actual": 1038
            },
            {
                "month": "Mes 8",
                "plan": 1356,
                "actual": 1356
            },
            {
                "month": "Mes 9",
                "plan": 1716,
                "actual": 1716
            }
        ],
        "deliverables": [
            {
                "id": "140-0",
                "contratista": "GESTIONA",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            }
        ]
    },
    {
        "id": "proyecto-141",
        "name": "CAMP. SALARES ETAPA 2 (PT)",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "MINVU",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 80,
        "budgetProgressActual": 43,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 5,
                "actual": 5
            },
            {
                "month": "Mes 2",
                "plan": 21,
                "actual": 21
            },
            {
                "month": "Mes 3",
                "plan": 47,
                "actual": 47
            },
            {
                "month": "Mes 4",
                "plan": 84,
                "actual": 84
            },
            {
                "month": "Mes 5",
                "plan": 131,
                "actual": 131
            },
            {
                "month": "Mes 6",
                "plan": 189,
                "actual": 189
            },
            {
                "month": "Mes 7",
                "plan": 258,
                "actual": 258
            },
            {
                "month": "Mes 8",
                "plan": 336,
                "actual": 336
            },
            {
                "month": "Mes 9",
                "plan": 426,
                "actual": 426
            },
            {
                "month": "Mes 10",
                "plan": 526,
                "actual": 526
            },
            {
                "month": "Mes 11",
                "plan": 636,
                "actual": 636
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-142",
        "name": "GENERAL",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE BIENES NACIONALES",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 61,
        "budgetProgressActual": 51,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 12,
                "actual": 12
            },
            {
                "month": "Mes 2",
                "plan": 50,
                "actual": 50
            },
            {
                "month": "Mes 3",
                "plan": 111,
                "actual": 111
            },
            {
                "month": "Mes 4",
                "plan": 198,
                "actual": 198
            },
            {
                "month": "Mes 5",
                "plan": 310,
                "actual": 310
            },
            {
                "month": "Mes 6",
                "plan": 446,
                "actual": 446
            },
            {
                "month": "Mes 7",
                "plan": 607,
                "actual": 607
            },
            {
                "month": "Mes 8",
                "plan": 793,
                "actual": 793
            },
            {
                "month": "Mes 9",
                "plan": 1003,
                "actual": 1003
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-143",
        "name": "GENERAL",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE BIENES NACIONALES",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 63,
        "budgetProgressActual": 59,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 43,
                "actual": 43
            },
            {
                "month": "Mes 2",
                "plan": 173,
                "actual": 173
            },
            {
                "month": "Mes 3",
                "plan": 389,
                "actual": 389
            },
            {
                "month": "Mes 4",
                "plan": 692,
                "actual": 692
            },
            {
                "month": "Mes 5",
                "plan": 1081,
                "actual": 1081
            },
            {
                "month": "Mes 6",
                "plan": 1557,
                "actual": 1557
            }
        ],
        "deliverables": [
            {
                "id": "143-0",
                "contratista": "MGFSN",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "143-1",
                "contratista": "MGFSN",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-144",
        "name": "GENERAL",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE BIENES NACIONALES",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 86,
        "budgetProgressActual": 57,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 25,
                "actual": 25
            },
            {
                "month": "Mes 2",
                "plan": 100,
                "actual": 100
            },
            {
                "month": "Mes 3",
                "plan": 224,
                "actual": 224
            },
            {
                "month": "Mes 4",
                "plan": 399,
                "actual": 399
            },
            {
                "month": "Mes 5",
                "plan": 623,
                "actual": 623
            },
            {
                "month": "Mes 6",
                "plan": 898,
                "actual": 898
            },
            {
                "month": "Mes 7",
                "plan": 1222,
                "actual": 1222
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-145",
        "name": "GENERAL",
        "category": "Activo",
        "dashboardStatus": "En Proceso",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE BIENES NACIONALES",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 62,
        "budgetProgressActual": 86,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 16
            },
            {
                "month": "Mes 2",
                "plan": 64,
                "actual": 64
            },
            {
                "month": "Mes 3",
                "plan": 143,
                "actual": 143
            },
            {
                "month": "Mes 4",
                "plan": 254,
                "actual": 254
            },
            {
                "month": "Mes 5",
                "plan": 398,
                "actual": 398
            },
            {
                "month": "Mes 6",
                "plan": 573,
                "actual": 573
            },
            {
                "month": "Mes 7",
                "plan": 779,
                "actual": 779
            },
            {
                "month": "Mes 8",
                "plan": 1018,
                "actual": 1018
            },
            {
                "month": "Mes 9",
                "plan": 1288,
                "actual": 1288
            },
            {
                "month": "Mes 10",
                "plan": 1591,
                "actual": 1591
            },
            {
                "month": "Mes 11",
                "plan": 1925,
                "actual": 1925
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-146",
        "name": "GENERAL",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE BIENES NACIONALES",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 79,
        "budgetProgressActual": 82,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 15,
                "actual": 15
            },
            {
                "month": "Mes 2",
                "plan": 60,
                "actual": 60
            },
            {
                "month": "Mes 3",
                "plan": 136,
                "actual": 136
            },
            {
                "month": "Mes 4",
                "plan": 242,
                "actual": 242
            },
            {
                "month": "Mes 5",
                "plan": 377,
                "actual": 377
            },
            {
                "month": "Mes 6",
                "plan": 543,
                "actual": 543
            },
            {
                "month": "Mes 7",
                "plan": 740,
                "actual": 740
            },
            {
                "month": "Mes 8",
                "plan": 966,
                "actual": 966
            },
            {
                "month": "Mes 9",
                "plan": 1223,
                "actual": 1223
            },
            {
                "month": "Mes 10",
                "plan": 1509,
                "actual": 1509
            },
            {
                "month": "Mes 11",
                "plan": 1826,
                "actual": 1826
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-147",
        "name": "GENERAL",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Faena Salares Norte",
        "wbs": "General Ingeniería",
        "autoridad": "SEREMI DE BIENES NACIONALES",
        "contratistaResponsable": "MGFSN",
        "budgetProgressPlan": 90,
        "budgetProgressActual": 41,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 14,
                "actual": 14
            },
            {
                "month": "Mes 2",
                "plan": 58,
                "actual": 58
            },
            {
                "month": "Mes 3",
                "plan": 130,
                "actual": 130
            },
            {
                "month": "Mes 4",
                "plan": 232,
                "actual": 232
            },
            {
                "month": "Mes 5",
                "plan": 362,
                "actual": 362
            },
            {
                "month": "Mes 6",
                "plan": 522,
                "actual": 522
            },
            {
                "month": "Mes 7",
                "plan": 710,
                "actual": 710
            },
            {
                "month": "Mes 8",
                "plan": 928,
                "actual": 928
            },
            {
                "month": "Mes 9",
                "plan": 1174,
                "actual": 1174
            }
        ],
        "deliverables": [
            {
                "id": "147-0",
                "contratista": "MGFSN",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "147-1",
                "contratista": "MGFSN",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    },
    {
        "id": "proyecto-148",
        "name": "IFC DIA PROSPECCIÓN HORIZONTE",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "SAG",
        "contratistaResponsable": "GESTIONA",
        "budgetProgressPlan": 72,
        "budgetProgressActual": 70,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 5,
                "actual": 5
            },
            {
                "month": "Mes 2",
                "plan": 20,
                "actual": 20
            },
            {
                "month": "Mes 3",
                "plan": 46,
                "actual": 46
            },
            {
                "month": "Mes 4",
                "plan": 82,
                "actual": 82
            },
            {
                "month": "Mes 5",
                "plan": 127,
                "actual": 127
            },
            {
                "month": "Mes 6",
                "plan": 184,
                "actual": 184
            },
            {
                "month": "Mes 7",
                "plan": 250,
                "actual": 250
            },
            {
                "month": "Mes 8",
                "plan": 326,
                "actual": 326
            },
            {
                "month": "Mes 9",
                "plan": 413,
                "actual": 413
            },
            {
                "month": "Mes 10",
                "plan": 510,
                "actual": 510
            },
            {
                "month": "Mes 11",
                "plan": 617,
                "actual": 617
            }
        ],
        "deliverables": []
    },
    {
        "id": "proyecto-149",
        "name": "CAMP. SALARES ETAPA 1",
        "category": "Inactivo",
        "dashboardStatus": "Finalizado",
        "gerencia": "Gerencia Servicios Generales",
        "wbs": "Camp",
        "autoridad": "MINVU",
        "contratistaResponsable": "TECNOFAST",
        "budgetProgressPlan": 59,
        "budgetProgressActual": 58,
        "budgetCurve": [
            {
                "month": "Mes 1",
                "plan": 16,
                "actual": 16
            },
            {
                "month": "Mes 2",
                "plan": 64,
                "actual": 64
            },
            {
                "month": "Mes 3",
                "plan": 145,
                "actual": 145
            },
            {
                "month": "Mes 4",
                "plan": 257,
                "actual": 257
            },
            {
                "month": "Mes 5",
                "plan": 402,
                "actual": 402
            },
            {
                "month": "Mes 6",
                "plan": 579,
                "actual": 579
            },
            {
                "month": "Mes 7",
                "plan": 788,
                "actual": 788
            },
            {
                "month": "Mes 8",
                "plan": 1029,
                "actual": 1029
            },
            {
                "month": "Mes 9",
                "plan": 1303,
                "actual": 1303
            },
            {
                "month": "Mes 10",
                "plan": 1608,
                "actual": 1608
            }
        ],
        "deliverables": [
            {
                "id": "149-0",
                "contratista": "TECNOFAST",
                "contrato": "C-100",
                "codigo": "COD-0",
                "mesAno": "02-2025",
                "plan": 100,
                "actual": 80,
                "acumulado": 180
            },
            {
                "id": "149-1",
                "contratista": "TECNOFAST",
                "contrato": "C-101",
                "codigo": "COD-1",
                "mesAno": "03-2025",
                "plan": 110,
                "actual": 90,
                "acumulado": 200
            }
        ]
    }
];
