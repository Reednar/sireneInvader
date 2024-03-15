const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'C:\\Users\\reedi\\Downloads\\StockEtablissement_utf8\\StockEtablissement_utf8.csv';
const outputFolder = './output/';
const chunkSize = 1000000; // Nombre de lignes par chunk

// Créer un dossier de sortie s'il n'existe pas déjà
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

let currentChunk = 0;
let linesCount = 0;
let outputStream;
let startTime;

// Fonction pour écrire une ligne dans le fichier de sortie
function writeLine(line) {
    outputStream.write(line + '\n');
    linesCount++;

    // Si le nombre de lignes atteint le chunkSize, passer au fichier suivant
    if (linesCount >= chunkSize) {
        outputStream.end();
        const endTime = new Date();
        const duration = endTime - startTime;
        console.log(`Chunk ${currentChunk} généré en ${duration} ms.`);
        currentChunk++;
        outputStream = fs.createWriteStream(`${outputFolder}/chunk_${currentChunk}.csv`);
        linesCount = 0;
        startTime = new Date();
    }
}

// Lire le fichier CSV ligne par ligne et écrire dans les chunks
fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (row) => {
        if (!outputStream) {
            outputStream = fs.createWriteStream(`${outputFolder}/chunk_${currentChunk}.csv`);
            startTime = new Date();
        }
        writeLine(Object.values(row).join(','));
    })
    .on('end', () => {
        if (outputStream) {
            outputStream.end();
            const endTime = new Date();
            const duration = endTime - startTime;
            console.log(`Chunk ${currentChunk} généré en ${duration} ms.`);
        }
        console.log('Fichier divisé en chunks avec succès.');
    });
