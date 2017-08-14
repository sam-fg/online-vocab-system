const getVocabs = require('../helper.js').getVocabs;

function sizeHandler(req, res) {
  const assessmentName = req.params.name
  const vocabs = getVocabs(assessmentName)
  res.json(vocabs.length)
}

module.exports = sizeHandler;
