const assessments = require('./assessments.js');
const _ = require('lodash');

function getVocabs(assessmentName) {

  const filename = assessmentName + '.json';
  const vocabs = _.find(assessments, {
    name: filename
  }).vocabs

  return vocabs
}
exports.getVocabs = getVocabs
