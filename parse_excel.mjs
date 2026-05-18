import xlsx from 'xlsx';
import fs from 'fs';

try {
    const workbook = xlsx.readFile('../MATRIZ_Consolidada_LIMPIA2.xlsx');
    console.log('Sheet names:', workbook.SheetNames);

    let targetSheet = workbook.SheetNames.length > 1 ? workbook.SheetNames[1] : workbook.SheetNames[0];
    // Check if there is a sheet called 'BASE' or similar
    const baseSheet = workbook.SheetNames.find(s => s.toLowerCase().includes('matriz') || s.toLowerCase().includes('base') || s.toLowerCase().includes('data'));
    if (baseSheet) {
        targetSheet = baseSheet;
    }

    console.log('Target sheet to parse:', targetSheet);

    const sheet = workbook.Sheets[targetSheet];
    const data = xlsx.utils.sheet_to_json(sheet, { defval: null, range: 1 }); // skipping first row if it's a huge header, but maybe just use default
    // let's try reading standard headers
    const rawData = xlsx.utils.sheet_to_json(sheet, { defval: null });

    fs.writeFileSync('parsed_data.json', JSON.stringify(rawData.slice(0, 150), null, 2));
    console.log('Successfully wrote parsed_data.json from', targetSheet);
} catch (e) {
    console.error(e);
}
