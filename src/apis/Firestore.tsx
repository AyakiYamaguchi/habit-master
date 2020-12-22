import React from 'react';
import { HabitList } from '../store';
import firebase,{ db } from './FirebaseConf';

// 習慣リスト一覧の取得


// 習慣リストの新規登録 or 更新メソッド
// すでにリストが存在
export const setHabitList = async(userId: string | undefined, habitListId: string | null ,habitList: HabitList) => {
  if (!habitListId){
    const habitListRef = db.collection("users").doc(userId).collection('habitLists')
    return await habitListRef.add({
      habitName: habitList.habitName,
      trigger: habitList.trigger,
      weeklySch: habitList.weeklySch,
      remindHour: habitList.remindHour,
      remindMinutes: habitList.remindMinutes,
    })
  } else {
    const currentHabitListRef = db.collection("users").doc(userId).collection('habitLists').doc(habitListId)
    return await currentHabitListRef.update({
      habitName: habitList.habitName,
      trigger: habitList.trigger,
      weeklySch: habitList.weeklySch,
      remindHour: habitList.remindHour,
      remindMinutes: habitList.remindMinutes,
    })
  }
  
}


// 習慣リストの更新


// 習慣リストの削除


// 習慣リスト詳細の取得
