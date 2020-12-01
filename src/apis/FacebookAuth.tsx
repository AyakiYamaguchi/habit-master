import React from 'react';
import firebase , { FacebookProvider } from './FirebaseConf'

export const FacebookLogin = async() => {
  return await firebase.auth().signInWithPopup(FacebookProvider).then((result)=>{
    return firebase.auth().currentUser;
  }).catch((error)=>{
    return error
  });
}

export const getCurrentUser = async() => {
  let currentUser
  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user
      return currentUser
    }
  });
  // const user = await firebase.auth().currentUser;
  // return user
  // return await firebase.auth().onAuthStateChanged((user)=>{
  //   if(user){
  //     return user
  //   }else {
  //     return null
  //   }
  // })
}

export const SignOut = async() => {
  return await firebase.auth().signOut().then(()=>{
    return 'サインアウトに成功しました'
  }).catch((error)=>{
    return error
  })
}