const assessments = require('../assessments.js')

function assessmentHandler(req, res) {
  const extRemovedFilenames = assessments.map(
    assessment => assessment.name.replace('.json', '')
  )
  return res.json(extRemovedFilenames)
}

module.exports = assessmentHandler
