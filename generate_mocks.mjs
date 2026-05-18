import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('parsed_data.json', 'utf8'));

// Only take rows that look like actual permits (having an Obra/Actividad)
const validRows = rawData.filter(r => r['Obra / Actividad*']);
const targetRows = validRows.slice(0, 150);

function formatDate(val) {
    if (!val) return null;
    if (typeof val === 'number') {
        const date = new Date(Math.round((val - 25569) * 86400 * 1000));
        const day = date.getUTCDate().toString().padStart(2, '0');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    }
    return val.toString();
}

function mapStatus(s) {
    if (!s) return 'NO INICIADO';
    s = s.toString().toUpperCase().trim();
    if (s.includes('APROBADO')) return 'APROBADO';
    if (s.includes('RECHAZADO')) return 'RECHAZADO';
    if (s.includes('ELABORACIÓN')) return 'EN ELABORACIÓN';
    if (s.includes('REVISIÓN')) return 'EN REVISIÓN';
    return 'NO INICIADO';
}

function getDates(row, prefix) {
    return {
        plan: formatDate(row[`PLAN ${prefix}`]),
        actual: formatDate(row[`ACTUAL ${prefix}`]),
        forecast: formatDate(row[`FORECAST ${prefix}`])
    };
}

const mockPermits = targetRows.map((row, index) => {
    return {
        id: index + 1,
        codigoAconex: row['CÓDIGO ACONEX \r\nDEL PERMISO'] || `GFSN01-MOCK-000${index + 1}`,
        obraActividad: row['Obra / Actividad*'] || 'Desconocido',
        tipoPermiso: row['Tipo de Permiso'] || 'Desconocido',
        permisoAplicable: row['Permiso Aplicable*'] || 'Desconocido',
        autoridad: row['Autoridad*'] || 'Autoridad Desconocida',
        contratistaResponsable: row['Contratista Responsable*'] || 'No Asignado',
        gerencia: row['Gerencia'] || 'Gerencia General',
        wbs: row['WBS_Nombre'] || row['WBS homologado'] || 'General',

        solicitudInfoLegal: getDates(row, 'Solicitud de información Legal'),
        entregaInformacion: getDates(row, 'Entrega de información Legal'),
        inicioElaboracion: getDates(row, 'Inicio EN ELABORACIÓN Expediente por contratista'),
        terminoElaboracion: getDates(row, 'Borrador expediente \r\n(Rev. B)'),
        inicioRevisionGF: getDates(row, 'Inicio Revisión Gold Fields / Asesor de Permiso / IC'),
        terminoRevisionGF: getDates(row, 'Término Revisión Gold Fields / Asesor de Permiso / IC'),
        inicioCorreccionObs: getDates(row, 'Inicio Corrección Observaciones Contratista'),
        terminoCorreccionObs: getDates(row, 'Término Corrección Observaciones Contratista'),
        inicioRevision0: getDates(row, 'Inicio Proceso Firma RL'),
        terminoRevision0: getDates(row, 'Término Proceso Firma RL'),
        firmaRL: getDates(row, 'Término Proceso Firma RL'),
        ingresoAutoridad: getDates(row, 'Ingreso Autoridad'),
        fechaResolucion: getDates(row, 'Aprobación'),

        tiempoTramitacion: {
            plan: parseInt(row['PLAN Tiempo Tramitación'], 10) || null,
            actual: parseInt(row['ACTUAL Tiempo Tramitación'], 10) || null,
            forecast: parseInt(row['FORECAST Tiempo Tramitación'], 10) || null
        },
        aprobacion: getDates(row, 'Aprobación'),

        estado: mapStatus(row['Estado*']),
        resolucionAprobacion: row['RESOLUCIÓN / APROBACIÓN'] ? String(row['RESOLUCIÓN / APROBACIÓN']) : null,
    };
});

const fileContent = `import type { PermitTramitacion } from '../types/permit';\n\nexport const mockPermits: PermitTramitacion[] = ${JSON.stringify(mockPermits, null, 4)};\n`;

fs.writeFileSync('src/data/mockPermits.ts', fileContent);
console.log('Successfully generated src/data/mockPermits.ts and typecast handled');
