// models/Item.js

const mongoose = require('mongoose');

// Définir le schéma MongoDB pour l'élément
const itemSchema = new mongoose.Schema({
  siren: String,
  nic: String,
  siret: String,
  dateCreationEtablissement: Date,
  dateDernierTraitementEtablissement: Date,
  typeVoieEtablissement: String,
  libelleVoieEtablissement: String,
  codePostalEtablissement: String,
  libelleCommuneEtablissement: String,
  codeCommuneEtablissement: String,
  dateDebut: Date,
  etatAdministratifEtablissement: String
});

// Créer le modèle Item à partir du schéma
const Item = mongoose.model('Item', itemSchema); // Utiliser mongoose.model() ici, pas mongoose.Model()

module.exports = Item;
