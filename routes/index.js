var express = require('express');
var router = express.Router();
var firebase = require("../Config/firebase");
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

/* GET home page. */
// router.post('/signup', function(req, res, next) {
//   res.json({success: "this is working"});
// });

router.post('/signup', function(req, res, next) {
  var docRef = db.collection('userInfo').doc(req.body.email);

  var setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
  res.json({success: true});
});

module.exports = router;
