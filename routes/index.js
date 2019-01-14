var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

// admin.initializeApp(functions.config().firebase);

var serviceAccount = require('../Config/photo-op-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://photo-op-firebase.firebaseio.com'
});

var db = admin.firestore();

/* GET home page. */
// router.post('/signup', function(req, res, next) {
//   res.json({success: "this is working"});
// });

router.post('/signup', function(req, res, next) {
  try{
    var docRef = db.collection('userInfo').doc(req.body.email).set({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      username: req.body.username
    })
    res.send({success: true});
  }
  catch(e){
    res.send({error: e});
  }
});

module.exports = router;
