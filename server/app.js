const express = require('express');
const app = express()
const port = 3000

// log api
const logger = require('morgan')("combined");
app.use(logger)

// server static files
app.use(express.static('../html/dist'))

// use req.bodyParser
// ref: http://expressjs.com/zh-tw/4x/api.html#req.body
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

const routers = [{
  // get all the assessments name
  method: "get",
  api: "/api/assessment",
  handler: "assessment.js"
}, {
  // will return number of vocabs by given assessment name
  method: "get",
  api: '/api/assessment/:name/size',
  handler: 'size.js'
}, {
  // get the vocab by given assessment name and index
  method: "get",
  api: "/api/assessment/:name/index/:index",
  handler: "vocab.js"
}, {
  // check the ans is correct or not by given the assessment name and index.
  method: "get",
  api: "/api/check/assessment/:name/index/:index",
  handler: "check.js"
}, {
  // pronouce the vocab by the assessment name and vocab index
  method: "get",
  api: "/api/voice/assessment/:name/index/:index",
  handler: "voice.js"
}, {
  // user need to post an arry with index and ans as key
  // where index is the index of array of json with assessment name
  // and ans is the incorrect ans provided by student
  method: "post",
  api: "/api/assessment/:name/report",
  middleware: upload.array(),
  handler: "report.js"
}]

routers.forEach(router => {
  const defaultMiddleware = (req, res, next) => {
    next()
  }
  const middleware = router.middleware ? router.middleware : defaultMiddleware;

  app[router.method](router.api, middleware, require('./handler/' + router.handler))
})

app.listen(port, function() {
  console.log("serving: http://localhost:" + port)
})
