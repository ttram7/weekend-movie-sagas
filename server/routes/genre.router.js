const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
    const idForGenres = req.params.id;
    const genreQuery = `SELECT "genres"."name" FROM "movies" 
    JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
    JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
    WHERE "movies"."id" = $1`;
    pool.query(genreQuery, [idForGenres])
      .then( result => {
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Getting specific movie genre', err);
        res.sendStatus(500)
      })
  
  });

module.exports = router;