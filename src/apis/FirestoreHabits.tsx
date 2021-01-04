import React from 'react';
import { HabitList } from '../store';
import firebase,　{ db } from './FirebaseConf';


// 習慣リスト一覧の取得
export const fetchHabitList = async(userId: string) => {
  const habitListRef = db.collection('users').doc(userId).collection('habitLists')

  const habitLists:HabitList[] = [];
  await habitListRef.get().then((result)=>{
    result.docs.map((list,index)=>{
      const data = list.data() as HabitList
      if(data){
        habitLists.push(data)
      }
    })
  })
  return habitLists
}

// 一番最後に登録された習慣リストのIDを取得
export const getLastHabitListId = async(userId: string) => {
  const habitListRef = db.collection('users').doc(userId).collection('habitLists')
  return await habitListRef.get().then((result)=>{
    return result.docs.slice(-1)[0].id
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
    })
  }
}

// 習慣予定リストの追加
export const addScheduledHabit = async(userId: string , habitListId: string) => {
  const today = new Date()
  const habitResultListsRef = db.collection('users').doc(userId).collection('scheduledHabits')
  return await habitResultListsRef.add({
    id: habitListId,
    scheduledDateTime: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
    finished: false,
    finishedDateTime: null,
  }
)
}

// 習慣リストの削除


// 習慣リスト詳細の取得


