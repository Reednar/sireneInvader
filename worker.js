const pm2 = require('pm2');
const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
const csv = require('csvtojson'); // Importer le module csvtojson

// Charger le modèle MongoDB approprié
const Item = require('./models/Item'); // Assurez-vous de définir correctement votre modèle MongoDB

// Configuration de PM2
const pm2Config = {
  script: 'index.js', // Script des workers
  instances: '4', // Autant d'instances que de cœurs de processeur
  exec_mode: 'cluster', // Mode cluster pour paralléliser les tâches
  name: 'worker'
};

// Charger la configuration PM2
pm2.connect(() => {
  pm2.start(pm2Config, (err, apps) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log('PM2 started');
  });
});
