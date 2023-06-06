// Importerer Mongoose-modulen, et MongoDB objektmodellering verktøy
const mongoose = require('mongoose');

// Definerer et Mongoose-skjema for Data
const dataSchema = new mongoose.Schema({
  // Definerer 'title'-feltet, som krever en strengverdi
  // 'required: true' gjør at dette feltet er nødvendig for hvert Data-dokument
  title: {
    type: String,
    required: true,
  },

  // Definerer 'description'-feltet, som også krever en strengverdi
  // 'required: true' gjør at dette feltet også er nødvendig for hvert Data-dokument
  description: {
    type: String,
    required: true,
  },
});

// Eksporterer en Mongoose-modell for 'Data' basert på 'dataSchema'
// Dette kobler 'dataSchema' til 'Data'-samlingen i MongoDB-databasen
// Hvis samlingen ikke eksisterer, vil Mongoose opprette den
// Modellen er også tilgjengelig for andre deler av applikasjonen via 'require'-funksjonen
module.exports = mongoose.model('Data', dataSchema);
