import React from 'react';
import firebase,　{ db } from './FirebaseConf';


const usersRef = db.collection('users')

// 全ユーザーID一覧の取得
export const getUserIdLists = async() => {
  let userIdLists:string[] = []
  await usersRef.get().then((docs)=>{
    docs.forEach((list)=>{
      const listId = list.id
      userIdLists.push(listId)
    })
  })
  return await userIdLists
}