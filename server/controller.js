const express = require("express");
const router = express.Router()

router.use('/sync', require('./sync'))
router.use('/file', require('./fileExplorer'))

router.get('/', function(req, res) {
  res.send({'response':"This is the page for ColIDE's API"});
})


module.exports = router
