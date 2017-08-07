const getVocabs = require('../helper.js').getVocabs;
const googleTTS = require('google-tts-api');

function voiceHandler(req, res) {
  // will pronouce the title of the vocab by given vocab id
  // use "google-tts-api"
  const assessmentName = req.params.name
  const index = parseInt(req.params.index)

  const vocabs = getVocabs(assessmentName)

  const vocab = vocabs[index]

  // TODO: fix google translate api not working
  googleTTS(vocab.title, 'en', 0.24)
    .then(function(url) {
      res.json({
        url
      })
    })
    .catch(function(err) {
      res.send(err)
    })
}
module.exports = voiceHandler;
