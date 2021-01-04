import React from 'react';
import firebase,　{ db } from './FirebaseConf';


const usersRef = db.collection('users')

export const setUser = async(userId:string) => {
  const currentUser = usersRef.doc(userId).get().then(()=>{
    if (!currentUser){
      // usersRef.doc(userId).set()
    }
  })
}

// ユーザー一覧の取得
export const getUsers = async() => {
  let userIdLists:string[] = []
  let userHabitLists:any[] = []
  await usersRef.get().then((docs)=>{
    docs.forEach((list)=>{
      const listId = list.id
      userIdLists.push(listId)
    })
  })
  
  await userIdLists.map((listId,index)=>{
    db.collection('users').doc(listId).collection('habitLists').get().then((result)=>{
      const habits = {
        listId : result.docs
      }
      userHabitLists.push(result)
    })
  })
  const users = await usersRef.get()
  // return users
  // return await userIdLists
  return await userHabitLists
}