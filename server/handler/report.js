const getVocabs = require('../helper.js').getVocabs;

function reportHandler(req, res) {
  const reportItems = req.body
  // reportItems should follow the schema below
  // reportItems = [
  //   {
  //     index: Number,
  //     ans: String // the incorrect ans given by student
  //   }
  // ]

  const assessmentName = req.params.name
  const vocabs = getVocabs(assessmentName)

  const reportResult = reportItems.map(function(item) {
    const index = item.index
    const vocab = vocabs[index]
    item.title = vocab.title
    item.partOfSpeech = vocab.partOfSpeech
    return item
  })

  res.json(reportResult)
}

module.exports = reportHandler;
