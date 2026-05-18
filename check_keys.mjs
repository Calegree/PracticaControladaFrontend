import fs from 'fs';

const data = JSON.parse(fs.readFileSync('parsed_data.json', 'utf8'));

if (data.length > 0) {
    console.log("KEYS AVAILABLE:");
    console.log(Object.keys(data[0]));
}
