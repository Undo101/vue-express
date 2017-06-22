const express = require('express')
const router = express.Router()
const Movie = require('../model/movie')
router.get('/movie', (req, res) => {
  Movie.find({})
    .sort({update_at: -1})
    .then(movies => {
      res.json(movies)
    }).catch(err => {
      res.json(err)
    })
})
// 电影详情
router.get('/movie/:id', (req, res) => {
  res.json({
    name: '详情页'
  })
})
// 添加一条电影
router.post('/movie', (req, res) => {
  res.json({
    name: '添加'
  })
})
router.put('/movie/:id', (req, res) => {
  res.json({
    name: '修改电影'
  })
})
router.delete('/movie/:id', (req, res) => {
  res.json({
    name: '删除电影'
  })
})
module.exports = router
