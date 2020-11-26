import React from 'react';
import firebase from 'firebase';

firebase.initializeApp({
  // Authentication infomation
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
})

const provider = new firebase.auth.FacebookAuthProvider();

export const FacebookLogin = async() => {
  return await firebase.auth().signInWithPopup(provider).then((result)=>{
    return firebase.auth().currentUser;
  }).catch((error)=>{
    return error
  });
}

export const getCurrentUser = async() => {
  const user = await firebase.auth().currentUser;
  return user
  // return 'test'
}

export const SignOut = async() => {
  return await firebase.auth().signOut().then(()=>{
    return 'サインアウト成功しました'
  }).catch((error)=>{
    return error
  })
}