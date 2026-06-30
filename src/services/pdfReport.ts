import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Convierte el texto (Markdown) de un mensaje del chatbot en un informe PDF.
// Soporta encabezados (#), viñetas (-/*), tablas Markdown y párrafos.

const MARGIN = 40;

function stripInline(s: string): string {
    return s
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/^#{1,6}\s+/, '')
        .trim();
}

function parseTableRow(line: string): string[] {
    return line.split('|').slice(1, -1).map(c => stripInline(c.trim()));
}

export function generateChatReportPdf(text: string, meta?: { agent?: string }) {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const contentW = pageW - MARGIN * 2;
    let y = MARGIN;

    const ensureSpace = (h: number) => {
        if (y + h > pageH - MARGIN) { doc.addPage(); y = MARGIN; }
    };

    // ── Encabezado ──
    doc.setFont('helvetica', 'bold'); doc.setFontSize(15); doc.setTextColor(20, 30, 50);
    doc.text('Informe — Goldfields PMO', MARGIN, y); y += 20;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(110);
    const fecha = new Date().toLocaleString('es-CL');
    doc.text(`${meta?.agent ? meta.agent + ' · ' : ''}Generado el ${fecha}`, MARGIN, y); y += 10;
    doc.setDrawColor(200); doc.line(MARGIN, y, pageW - MARGIN, y); y += 16;
    doc.setTextColor(30);

    const lines = text.split('\n');
    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trimEnd();

        // ── Tabla Markdown ──
        if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|?\s*:?-{2,}/.test(lines[i + 1])) {
            const header = parseTableRow(line);
            const body: string[][] = [];
            i += 2; // saltar fila de encabezado + separador
            while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i].trimEnd())) {
                body.push(parseTableRow(lines[i].trimEnd())); i++;
            }
            ensureSpace(40);
            autoTable(doc, {
                head: [header], body, startY: y, margin: { left: MARGIN, right: MARGIN },
                styles: { fontSize: 8, cellPadding: 4, overflow: 'linebreak' },
                headStyles: { fillColor: [30, 41, 59], textColor: 255, fontStyle: 'bold' },
                theme: 'grid',
            });
            y = ((doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y) + 12;
            continue;
        }

        if (line.trim() === '') { y += 6; i++; continue; }

        // ── Encabezado (#, ##, ###) ──
        const h = line.match(/^(#{1,6})\s+(.*)/);
        if (h) {
            const level = h[1].length;
            const size = level <= 1 ? 13 : level === 2 ? 12 : 11;
            doc.setFont('helvetica', 'bold'); doc.setFontSize(size);
            const wrapped = doc.splitTextToSize(stripInline(h[2]), contentW);
            ensureSpace(wrapped.length * (size + 4) + 8);
            y += 6;
            doc.text(wrapped, MARGIN, y); y += wrapped.length * (size + 2) + 4;
            doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
            i++; continue;
        }

        // ── Viñeta ──
        const b = line.match(/^\s*[-*]\s+(.*)/);
        if (b) {
            doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
            const wrapped = doc.splitTextToSize('•  ' + stripInline(b[1]), contentW - 12);
            ensureSpace(wrapped.length * 13);
            doc.text(wrapped, MARGIN + 8, y); y += wrapped.length * 13;
            i++; continue;
        }

        // ── Párrafo ──
        doc.setFont('helvetica', 'normal'); doc.setFontSize(10);
        const wrapped = doc.splitTextToSize(stripInline(line), contentW);
        ensureSpace(wrapped.length * 13);
        doc.text(wrapped, MARGIN, y); y += wrapped.length * 13 + 2;
        i++;
    }

    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    doc.save(`informe-goldfields-${stamp}.pdf`);
}
