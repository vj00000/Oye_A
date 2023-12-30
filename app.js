const express = require('express');
const bodyParser = require('body-parser');
var apiController = require('./controller/apiControllers');
const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
const db = require('./db');
// Movie collection reference
let moviesCollection;
(async () => {
    const DB = await db();
    moviesCollection = await DB.collection('MOVIES');
    const docs = [
        { "_id": 1, "movieName": "GOT"},
        { "_id": 2, "movieName": "HOTD"},
        { "_id": 3, "movieName": "The Godfather"},
        { "_id": 4, "movieName": "Pink"},
     ];
    //  inserting seed Data
    //  const insertManyresult = await  moviesCollection.insertMany(docs);
})();

// API routes
// POST /add-movie
// apiController(app,moviesCollection);

app.post('/add-movie', async (req, res) => {
  try {
    const movie = req.body;
    // console.log(req.body);
    // console.log(req.body.movieName);
    await moviesCollection.insertOne(movie);
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /get-all
app.get('/get-all', async (req, res) => {
  try {
    const movies = await moviesCollection.find().toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /get-single?id={id}
app.get('/get-single', async (req, res) => {
  try {
    // console.log(typeof req.query.id);
    var ID = Number(req.query.id);
    const movie = await moviesCollection.findOne({ _id: ID });
    console.log(movie);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // GET /get-paginated?page={page}&size={size}
app.get('/get-paginated', async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const skip = (page - 1) * size;
    const movies = await moviesCollection.find().skip(skip).limit(size).toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});