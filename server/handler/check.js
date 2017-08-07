const getVocabs = require('../helper.js').getVocabs;

function checkHandler(req, res) {
  // use req.query.ans to store student's ans
  // e.g. /api/check/vocab/1?ans=hello, then req.query.ans = "hello"
  const assessmentName = req.params.name
  const index = parseInt(req.params.index)
  const ans = req.query.ans

  // use function for the following logic
  const vocabs = getVocabs(assessmentName)

  const correctAns = vocabs[index].title
  res.send(correctAns == ans)
}

module.exports = checkHandler;
