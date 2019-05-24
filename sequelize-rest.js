const Sequelize = require('sequelize')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(connectionString, {define: { timestamps: false }})
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
app.use(bodyParser.json())
const Movie = sequelize.define('movie', {
  title: Sequelize.TEXT,
  yearOfRelease: Sequelize.INTEGER,
  synopsis: Sequelize.TEXT,
}, {
  tableName: 'movies'
})

Movie.sync()
//add movie
app.post('/movies', (req, res, next) => {
  Movie
    .create(req.body)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `movie does not exist`
        })
      }
      return res.status(201).send(movie)
    })
    .catch(error => next(error))
})
//get all movies
app.get('/movies', (req, res, next) => {
  Movie
    .findAll(req.body)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `movie does not exist`
        })
      }
      return res.status(201).send(movie)
    })
    .catch(error => next(error))
})
//get specific movie by id
app.get('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `movie does not exist`
        })
      }
      return res.status(201).send(movie)
    })
    .catch(error => next(error))
})
//update specific movie by id
app.put('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `movie does not exist`
        })
      }
      return movie.update(req.body).then(movie => res.send(movie))
    })
    .catch(error => next(error))
})
//remove specific movie by id
app.delete('/movies/:id', (req, res, next) => {
  Movie
    .findByPk(req.params.id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: `movie does not exist`
        })
      }
      return movie.destroy()
        .then(() => res.send({
          message: `movie was deleted`
        }))
    })
    .catch(error => next(error))
})



app.listen(port , ()=>console.log('Movies are linstening on port:', port))