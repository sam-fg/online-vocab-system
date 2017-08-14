const getVocabs = require('../helper.js').getVocabs;
const googleTTS = require('google-tts-api');
const request = require('request')

function voiceHandler(req, res) {
  // will pronouce the title of the vocab by given vocab id
  // use "google-tts-api"
  const assessmentName = req.params.name
  const index = parseInt(req.params.index)

  const vocabs = getVocabs(assessmentName)

  const vocab = vocabs[index]

  googleTTS(vocab.title, 'en', 0.24)
    .then(function(url) {
  		request(url).pipe(res)
    })
    .catch(function(err) {
      res.send(err)
    })
}
module.exports = voiceHandler;