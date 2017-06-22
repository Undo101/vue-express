const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  original_title: String,
  rating: Number,
  genres: Array,
  casts: Array,
  year: Number,
  id: String,
  image: String
})
const Movie = module.exports = mongoose.model('Movie', movieSchema)
