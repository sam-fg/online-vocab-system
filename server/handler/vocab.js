const getVocabs = require('../helper.js').getVocabs;

function vocabHandler(req, res) {
  const assessmentName = req.params.name
  const index = parseInt(req.params.index)
  // TODO: error handling

  const vocabs = getVocabs(assessmentName)

  const vocab = Object.assign({}, vocabs[index])
  delete vocab.title
  res.json(vocab)
}

module.exports = vocabHandler;
