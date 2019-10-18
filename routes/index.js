var express = require('express');
var router = express.Router();
const admin = require('firebase-admin');

var serviceAccount = process.env.FIREBASE_CONFIG;
// var serviceAccount = {
//   "type": "service_account",
//   "project_id": "photo-op-firebase",
//   "private_key_id": "68277d159170d02203aaa6b754c9bbc45dcc6591",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOr+tH7aCMhJse\nS2y3Kfj6TPkTSG8JCMP70qofmPVK1rrcBK94QIqJPY5v2/WsnrBMSgL2GUq9E8Es\ndM/BlojsjodJLE0cH63+Ql8y4EoXZHBivvR8eTIUWI1VPTS7Aq4T4Fe2t8O+bEKk\nrHsJr01wJYJ1YjKFZW+HyvG/ZbWkn1D/vVjrIeSTSrhjy8WZtmx0u2qQ0XPsH2Md\nx8tB17czYjS1yjPH9kMwBy7J3Z3PYscKuLZCB6OXu7xF4NmXPrSGkAUeFvHoevgc\nJPTnu9vmRjuVa7sfdOtBRID8otBOpC52xfUMWWquIdZK1ZPhVo2qZb12EvC6bTBe\noK55l6XjAgMBAAECggEAOnBfE+1KMbDkswIccQV7EjplSmB2lJVX5IHB/EEhSdHA\n76ibfGKzSO6QsWv94JrVuhxLDg5EpYVKXyl//Hp1qHz8H2JZQxRp+7QEerwT9t09\nMY5QTkluMXaAL5Oorx+o3JHX+x+mRtcRWMIz358jRAw3AL2ND06I5ForVDSL0UmA\nU3C9ha7YCraAGvzJde2tajcEpRvMLtagTBqRmOUuPTKwSDVqLAEF028VZ81D50r7\n1bMnM74Aq2ZC4G/Y5P1X92IkCUE3DqFMYw85KLRmZ0g4eiG8wZh1vofkFcLrMg22\nO9PQmL7UTRqLjoYWF7IPkDzgX9Y7RIrs5fReE4CXIQKBgQDuKwaoC3DLRPAx6X4O\n7wfw/Nz6drfdNW1n0ocX+drxKnZkUPTjxqH49gE8JP5gLm6dzti48Dn0+peaQUeO\n+CYevCWf6z4Jp2BYEpy4LbTgDZI1hlQRcp5i233t/51r4SR7lnB0fkcRLUFGraPw\nT2bJwUxk8kEjMMqMINv9wxWRKQKBgQDeKX9/r1w/jaYAZGhX8C9jrfbS9qS4TdMt\noJevuWa/+nwqNZ3E61+0L0o2TL94JKhoxoNUrQ0zI8YEsSTA8/J4DMF+7mp9b33H\nPZEFU+jg4hbOrowWRg/gQAJi8W4LeHSriGlyH7jPp2kahvvONR9UB25+4mRCRHHo\nj218oWqkKwKBgFzTajG+28Rt5wwdDCO36Cl19I6uDLVr6GtJs5uVp07NlP0+TGQm\ne+SzxQFzDa3hCv34q6FRB9XCgan+fWxsrTbXb/anUjOjB7rr7icesVuODolMBKIU\nQUUYdTl4oht00apVlRjiSsKYF9P7Q2UbHV3PN/40KU0U7Cy3deauzU4ZAoGBAIV/\nIDtEz8TsxCSWMVEuZfua7KeGSCLruQtA5gVU/lY8GWJvx3cuDNtEU27fnWp/dKdJ\nKl+2gSkKxRHKtJAxxrC20YsJjvoDBey0pTEzY8vGb/gQUOONhDq3m/eCpiLEZi8x\nEFPglfhJ29Fx7VvS9hlTQeWC+sYLRPt/PEZY5LDzAoGBAL7W+GpdbgfYeClDQzht\nEjsGu4DllbwAoMbR1zL1NVncx4ZzOFLDHBmcOcimOJLoXjvE6HcZUGhnGHs+tNCu\nqbDlta2L+BeEZV9hQwhyKp83Wtle7eSZ+YO14I0JBKdzzEqqluGTyxPqUfGPYKqy\n6a7WepI0DGfSR+rbL4XrcK+W\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-xj0z4@photo-op-firebase.iam.gserviceaccount.com",
//   "client_id": "115749941435688925381",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xj0z4%40photo-op-firebase.iam.gserviceaccount.com"
// }

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(serviceAccount)),
  // credential: admin.credential.cert(serviceAccount),
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

router.post('/addSession', function(req, res ,next){
  try{
    db.collection("userInfo").doc(req.body.email).set({
        [req.body.time]: {
          emg: req.body.emg,
          goniometer:{
            min: req.body.min,
            max: req.body.max
          }
      } 
    }, {merge:true})
    res.send({success: true})
  }
  catch(e){
    res.send({success: false, error: e})
  }
  
})

module.exports = router;
