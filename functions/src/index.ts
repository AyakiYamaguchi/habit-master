import * as functions from 'firebase-functions';
// import admin from 'firebase-admin';
const admin = require('firebase-admin');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.addScheduleHabits = functions
  .region('asia-northeast1')
  .https.onRequest(async(req,res)=>{
    const user = admin.firestore().collection('users').get()
    res.send({user})
})