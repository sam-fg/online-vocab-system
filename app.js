const express = require('express');
const _ = require('lodash')
const http = require('http')
const googleTTS = require('google-tts-api');
//--------------------------------------------
const vocabs = require('./vocab.json')

const app = express()
//--------------------------------------------
app.use(express.static('./html/dist'))
// TODO: use morgan to track the log

app.get('/api/voice/vocab/id/:id', function(req, res) {
  // will pronouce the title of the vocab by given vocab id
  // use "google-tts-api"

  const id = parseInt(req.params.id)
  const vocab = vocabs[id]
  googleTTS(vocab.title, 'en', 0.24)
    .then(function(url) {
      res.json({
        url
      })
    })
    .catch(function(err) {
      res.send(err)
    })
})

app.get('/api/vocab/id/:id', function(req, res) {
  const id = req.params.id
  const vocab = Object.assign({}, vocabs[id])
  delete vocab.title
  res.json(vocab)
})

app.get('/api/check/vocab/id/:id', function(req, res) {
  // use req.query.ans to store student's ans
  // e.g. /api/check/vocab/1?ans=hello, then req.query.ans = "hello"
  const id = parseInt(req.params.id)
  const ans = req.query.ans
  const correctAns = vocabs[id].title
  res.json(correctAns == ans)
})

app.get('/api/level/:level', function(req, res) {
  // return all vocab's id with given level.
  const level = req.params.level
  const filteredVocabIDs = _(vocabs)
    .filter({
      'level': parseInt(level)
    })
    .map('id')
    .value()

  // const filteredVocabIDs = vocabs
  //   .filter(checkLevel(level))
  //   .map(pluckIDAndTitle)
  // function checkLevel (level) {
  //   return function (vocab){
  //     return vocab.level === parseInt(level)
  //   }
  // }
  //
  // function pluckID(vocab) {
  //   return vocab.id
  // }

  res.json(filteredVocabIDs)
})

const port = 3000
app.listen(port, function() {
  console.log("serving: " + port)
})
