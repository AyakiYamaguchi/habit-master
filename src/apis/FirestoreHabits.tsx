import React from 'react';
import Moment from 'moment'
import { HabitList, ScheduledHabit } from '../store';
import firebase,　{ db } from './FirebaseConf';


// 習慣リスト一覧の取得
export const fetchHabitList = async(userId: string) => {
  const habitListRef = db.collection('users').doc(userId).collection('habitLists')

  const habitLists:HabitList[] = [];
  await habitListRef.get().then((result)=>{
    result.docs.map((list)=>{
      const data = {
        ...list.data(),
        createdAt: list.data().createdAt.toDate(),
        updatedAt: list.data().updatedAt.toDate(),
      } as HabitList
      // const data1 = list.data() as HabitList
      if(data){
        habitLists.push(Object.assign({id: list.id} ,data))
      }
    })
  })
  return habitLists
}

// 指定したIDの習慣リストを取得
export const getHabitListDetail = async(userId: string, habitListId: string) => {
  const habitListRef = db.collection('users').doc(userId).collection('habitLists').doc(habitListId)
  return await habitListRef.get().then((result)=>{
    const habitList = Object.assign({id: result.id}, result.data() as HabitList)
    return habitList
  })
}


// 一番最後に登録された習慣リストのIDを取得
export const getLastHabitListId = async(userId: string) => {
  const habitListRef = db.collection('users').doc(userId).collection('habitLists')
  return await habitListRef.orderBy("createdAt", "desc").limit(1).get().then((result)=>{
    return result.docs[0].id
  })
}

// 習慣リストの新規登録 or 更新メソッド
export const setHabitList = async(userId: string, habitListId: string ,habitList: HabitList) => {
  // 新規リスト登録
  if (!habitListId){
    const habitListRef = db.collection('users').doc(userId).collection('habitLists')
    return await habitListRef.add({
      habitName: habitList.habitName,
      trigger: habitList.trigger,
      weeklySch: habitList.weeklySch,
      remindHour: habitList.remindHour,
      remindMinutes: habitList.remindMinutes,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now()
    })
  } else {
    // 登録済みリストの更新
    const currentHabitListRef = db.collection('users').doc(userId).collection('habitLists').doc(habitListId)
    return await currentHabitListRef.update({
      habitName: habitList.habitName,
      trigger: habitList.trigger,
      weeklySch: habitList.weeklySch,
      remindHour: habitList.remindHour,
      remindMinutes: habitList.remindMinutes,
      createdAt: habitList.createdAt,
      updatedAt: firebase.firestore.Timestamp.now()
    })
  }
}

// 習慣リストの削除


// 習慣リスト詳細の取得





// 習慣予定リスト一覧の取得
export const fetchScheduledHabits = async(userId: string,) => {
  const scheduledHabits: ScheduledHabit[] = []
  const scheduledHabitsRef = db.collection('users').doc(userId).collection('scheduledHabits')
  await scheduledHabitsRef.get().then((resultLists)=>{
    resultLists.docs.map((list,index) => {
      const data = list.data() as ScheduledHabit
      if(data){
        scheduledHabits.push(Object.assign({id: list.id}, data))
      }
    })
  })
  return await scheduledHabits
}

// 指定したidの習慣予定リストを取得
export const fetchScheduledHabit = async(userId: string ,scheduledHabitId: string) => {
  const scheduledHabitRef = db.collection('users').doc(userId).collection('scheduledHabits').doc(scheduledHabitId)
  return await scheduledHabitRef.get()
}

// 習慣予定リストの追加
export const addScheduledHabit = async(userId: string , habitListId: string, createdDate: Date) => {
  const scheduledHabitsRef = db.collection('users').doc(userId).collection('scheduledHabits')
  return await scheduledHabitsRef.add({
    habitListId: habitListId,
    scheduledDateTime: createdDate,
    scheduledYear: createdDate.getFullYear(),
    scheduledMonth: createdDate.getMonth(),
    scheduledDate: createdDate.getDate(),
    finished: false,
    finishedDateTime: null,
    createdAt: firebase.firestore.Timestamp.now(),
    updatedAt: firebase.firestore.Timestamp.now()
  })
}

// 習慣予定リストの終了ステータス更新
export const changeHabitFinishedStatus = async(userId: string , scheduledHabitsId: string, currentFinishedStatus: boolean) => {
  const scheduledHabitRef = db.collection('users').doc(userId).collection('scheduledHabits').doc(scheduledHabitsId)

  return await scheduledHabitRef.update({
    finished: !currentFinishedStatus,
    updatedAt: firebase.firestore.Timestamp.now()
  })
}


// 習慣予定リストの削除

