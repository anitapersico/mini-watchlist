# 🎬 Mini Watchlist — Progetto di pratica Backend + Database

Secondo progetto di pratica backend: una API per gestire una lista di film e serie TV da guardare, questa volta collegata a un **database MongoDB vero** fin dall'inizio (a differenza del primo mini-progetto, la Rubrica, che teneva i dati solo in memoria).

## 🛠️ Cosa ho fatto, passo per passo

### 1. Creazione del progetto
- `npm init -y` → creato `package.json`
- `npm install express mongoose dotenv` → installate le librerie per il server (Express), il collegamento al database (Mongoose) e la lettura di dati segreti (dotenv)

### 2. Collegamento al database
- Ho riusato lo **stesso cluster MongoDB Atlas** di un altro mio progetto (FarmaDemo), creando semplicemente un **nuovo database** al suo interno chiamato `watchlist` — un cluster può contenere tanti database diversi, completamente separati tra loro
- Ho salvato la stringa di connessione in un file `.env` come `MONGO_URI=...`, e l'ho aggiunta al `.gitignore` insieme a `node_modules`, così non finisce mai su GitHub

### 3. Il Model (`models/Movie.js`)
Non contiene dati, ma **la "forma" che devono avere** i film/serie salvati:
```javascript
{
  titolo: String (obbligatorio),
  tipo: String (obbligatorio, "film" o "serie"),
  stato: String (default: "da vedere"),
  voto: Number (default: null)
}
```
I valori di `default` compaiono automaticamente se non li specifico quando creo un nuovo elemento.

### 4. Il file `server.js`
Collega tutto insieme:
- `mongoose.connect(process.env.MONGO_URI)` → apre la connessione vera al database, e solo dopo che è andata a buon fine (`.then`) accende il server, così sono certa che il database sia pronto prima di rispondere a qualsiasi richiesta
- Quattro rotte CRUD, tutte `async` perché ogni operazione sul database richiede tempo:
  - `GET /movies` → `Movie.find()` restituisce tutti gli elementi
  - `POST /movies` → `new Movie(req.body).save()` crea e salva un nuovo elemento
  - `PUT /movies/:id` → `Movie.findByIdAndUpdate(...)` modifica un elemento esistente (es. segnarlo come "visto" e dargli un voto)
  - `DELETE /movies/:id` → `Movie.findByIdAndDelete(...)` lo rimuove

### 5. Test con Postman
Ho creato, modificato e cancellato film/serie usando richieste GET/POST/PUT/DELETE verso `http://localhost:3002/movies`, verificando ogni volta la risposta prima di fidarmi che la logica fosse corretta.

### 6. Verifica diretta su MongoDB Atlas
Ho usato **Browse Collections** nel pannello di Atlas per vedere "dal vivo" i documenti veri salvati nella collezione `movies` (il nome al plurale/minuscolo è generato automaticamente da Mongoose a partire dal nome `Movie` del Model) — utile anche per sistemare a mano eventuali doppioni creati per errore durante i test.

### 7. Versionamento con Git
Stesso ciclo del progetto precedente: `git init`, `.gitignore`, `git add .`, `git commit -m "..."`, creazione del repository su GitHub, `git remote add origin`, `git push`.

## 🧠 Concetti chiave imparati

- Come collegare davvero Node.js a un database MongoDB con Mongoose
- La differenza tra il **Model** (lo schema/stampo dei dati) e i **documenti reali** salvati nel database
- Perché un cluster può ospitare più database di progetti diversi, senza che si mescolino tra loro
- Come ispezionare e correggere i dati direttamente da MongoDB Atlas, oltre che tramite le API

## 🚀 Come avviarlo

Crea un file `.env` con `MONGO_URI=la_tua_stringa_di_connessione`, poi:
```bash
npm install
node server.js
```
Il server parte su `http://localhost:3002`

