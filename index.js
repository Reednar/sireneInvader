const fs = require('fs');
const csv = require('csv-parser');

const { MongoClient } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/"; // URL de connexion à MongoDB
const dbName = "ensitech"; // Nom de votre base de données MongoDB
const collectionName = "sireneInvader";

let currentChunk = 0;
let linesCount = 0;
let outputStream;
let startTime;
let paused = false;

const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connecté à MongoDB avec succès !");
    } catch (error) {
        console.error("Erreur lors de la connexion à MongoDB :", error);
    }
}

// Appel de la fonction pour se connecter à MongoDB
connectToMongoDB();

// Fonction pour mettre en pause le traitement
function pauseProcessing() {
  paused = true;
  console.log("Traitement en pause...");
}

// Fonction pour reprendre le traitement
function resumeProcessing() {
  paused = false;
  console.log("Reprise du traitement...");
}

// Gestionnaire d'événements pour le signal SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  if (paused) {
    resumeProcessing();
  } else {
    pauseProcessing();
  }
});