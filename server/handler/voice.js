const getVocabs = require('../helper.js').getVocabs;

function voiceHandler(req, res) {
  const assessmentName = req.params.name
  const index = parseInt(req.params.index)
  const vocabs = getVocabs(assessmentName)

  const vocab = Object.assign({}, vocabs[index])
  res.json(vocab[index].title)
}

module.exports = voiceHandler;
