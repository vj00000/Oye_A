const db = require('../db');
let moviesCollection;
(async () => {
    const DB = await db();
    moviesCollection = await DB.collection('MOVIES');
    const docs = [
        { "_id": "1", "movieName": "GOT"},
        { "_id": "2", "movieName": "HOTD"},
        { "_id": "3", "movieName": "The Godfather"},
        { "_id": "4", "movieName": "Pink"},
     ];
    //  inserting seed Data
    //  const insertManyresult = await  moviesCollection.insertMany(docs);
})();
module.exports = async(app)=>{
app.post('/add-movie', async (req, res) => {
    try {        
      const movie = req.body;
      console.log(movie);
      await moviesCollection.insertOne(movie);
      res.redirect('/get-all');
    //   res.status(201).json({ message: 'Movie added successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // GET /get-all
  app.get('/get-all', async (req, res) => {
    try {
      const movies = await moviesCollection.find().toArray();
    //   res.json(movies);
      res.render('index',{movies:movies});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // GET /get-single?id={id}
  app.get('/get-single', async (req, res) => {
    try {
      var id = req.query.id;
      const movie = await moviesCollection.findOne({ _id: id });
      console.log(movie);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
    //   res.json(movie);
      res.render('singlemovie',{movie:movie})
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // // GET /get-paginated?page={page}&size={size}
  app.get('/get-paginated', async (req, res) => {
    try {
      const { page = 1, size = 10 } = req.query;
      const skip = (page - 1) * size;
      
      const movies = await moviesCollection.find().skip(Number(skip)).limit(Number(size)).toArray();
    //   res.json(movies);
      res.render('Pagination',{movies:movies});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}