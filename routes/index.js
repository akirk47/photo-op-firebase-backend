var express = require('express');
var router = express.Router();
var firebase = require("firebase");

/* GET home page. */
router.post('/signup', function(req, res, next) {
  res.json({success: "this is working"});
});

module.exports = router;
