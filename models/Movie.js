const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  tipo: { type: String, required: true }, // "film" o "serie"
  stato: { type: String, default: "da vedere" }, // "da vedere", "in corso", "visto"
  voto: { type: Number, default: null },
});

module.exports = mongoose.model('Movie', movieSchema);