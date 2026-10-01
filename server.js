require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const app = express();
const PORT = 3002;

app.use(express.json());

// GET: tutti i film/serie
app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// POST: crea un nuovo film/serie
app.post('/movies', async (req, res) => {
  const newMovie = new Movie(req.body);
  const saved = await newMovie.save();
  res.status(201).json(saved);
});

// PUT: modifica (es. segnare come "visto" e dare un voto)
app.put('/movies/:id', async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ messaggio: "Non trovato" });
  res.json(updated);
});

// DELETE: rimuovi dalla lista
app.delete('/movies/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ messaggio: "Rimosso dalla lista" });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connesso a MongoDB!');
    app.listen(PORT, () => {
      console.log(`Server avviato su http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Errore:', err.message));