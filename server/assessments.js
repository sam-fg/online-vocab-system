const fs = require('fs');
// all filename of json files in ./vocab is test name
const assessmentNames = fs.readdirSync('./vocab')
const assessments = assessmentNames.map(name => {
  return {
    name: name,
    vocabs: require('./vocab/' + name)
  }
})

module.exports = assessments;
