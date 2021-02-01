import firebase , { FacebookProvider } from './FirebaseConf'

export const FacebookLogin = async() => {
  return await firebase.auth().signInWithPopup(FacebookProvider).then((result)=>{
    const user = {
      uid: result.user?.uid,
      displayName: result.user?.displayName
    }
    return user
  }).catch((error)=>{
    return error
  });
}

export const SignupWithEmailAndPassword = async(email: string ,password: string ) => {
  return await firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((result)=>{
    const user = {
      uid: result.user?.uid,
      displayName: result.user?.displayName
    }
    return user
  })
  .catch((error)=>{
    return error
  })
}

export const SignInWithEmailAndPassword = async(email: string ,password: string ) => {
  return await firebase.auth().signInWithEmailAndPassword(email, password)
  .then((result)=>{
    const user = {
      uid: result.user?.uid,
      displayName: result.user?.displayName
    }
    return user
  })
  .catch((error)=>{
    return error
  })
}


export const getCurrentUser = async() => {
  let currentUser
  await firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user
      return currentUser
    }
  });
}

export const SignOut = async() => {
  return await firebase.auth().signOut().then(()=>{
    return 'サインアウトに成功しました'
  }).catch((error)=>{
    return error
  })
}