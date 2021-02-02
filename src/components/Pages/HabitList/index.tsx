import React , { FC, useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Style from './HabitList.module.scss';
import Moment from 'moment'
import Header from '../../Organisms/Header';
import Footer from '../../Organisms/Footer';
import { Store } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import HabitListItem from '../../Molecules/HabitListItem';
import HabitListSelectDate from '../../Molecules/HabitListSelectDate';
import FloatingAddBtn from '../../Atoms/FloatingAddBtn';
import { ScheduledHabit, EDIT_HABIT_RESULT_STATUS , ADD_SCHEDULED_HABIT , SET_SELECTED_HABIT_LIST_DATE } from '../../../store/index';
import { getYMDStr } from '../../../helper/dateHelper'
import { changeHabitFinishedStatus, addScheduledHabit, fetchScheduledHabit, fetchHabitList } from '../../../apis/FirestoreHabits'

const today = new Date()
const todayStr = getYMDStr(today)
type scheduleList = {
  habitListId: string;
  habitListCreatedAt: Date;
  scheduledHabitId: string;
  finished: boolean;
  habitName: string;
  trigger: string;
}

const HabitList = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const { AuthState } = useContext(AuthContext)
  const [ selectedDate, setSelectedDate] = useState(todayStr)
  const userId = AuthState.user.uid
  
  // 現在選択されている日付を取得
  // const selectedDate = Moment(globalState.selectedDate).toDate()

  const handleClickDate = (date:string) => {
    setSelectedDate(date)
  }

  // 選択している日付でスケジュールされている習慣リストの配列を作成
  const scheduledHabitsOfSelectedDate :scheduleList[] = []
  const habitLists = globalState.habitLists
  const scheduledHabits = globalState.scheduledHabits
  habitLists.map((habitList, index)=>{
    scheduledHabits.map((resultList, index)=>{
      // resultListの日付をYYYYMMDD形式に変換
      const resultListDateStr = Moment({
        year: resultList.scheduledYear,
        month: resultList.scheduledMonth,
        day: resultList.scheduledDate,
      }).format("YYYYMMDD")
      // 選択している日付でスケジュールされていた習慣リストを配列に追加
      if(habitList.id === resultList.habitListId && resultListDateStr === selectedDate){
        const scheduleList = {
          habitListId: habitList.id,
          habitListCreatedAt: habitList.createdAt,
          scheduledHabitId: resultList.id,
          finished: resultList.finished,
          habitName: habitList.habitName,
          trigger: habitList.trigger,
        }
        return (
          scheduledHabitsOfSelectedDate.push(scheduleList)
        )
      }
    })
  })

  const clickHabitList =(userId:string, scheduledHabitsId:string, currentFinishedStatus:boolean) => {
    changeHabitFinishedStatus(userId, scheduledHabitsId, currentFinishedStatus).then(()=>{
      setGlobalState({ type: EDIT_HABIT_RESULT_STATUS, payload: {id: scheduledHabitsId}})
    }).catch((error)=>{
      console.log(error)
    })
  }

  // const setScheduledHabits = () =>{
  //   console.log('実行')
  //   // 予定リストが1件も存在しない場合
  //   if(scheduledHabitsOfSelectedDate.length === 0){
  //     console.log('リストが1件もありません')
  //     habitLists.map((habitList)=>{
  //       const habitListCreatedAt = getYMDStr(habitList.createdAt)
  //       // 選択している日付より前に作成されたHabitListがあった場合のみ予定リストを追加
  //       if (habitListCreatedAt <= selectedDate){
  //         console.log('作成対象のリストがあります')
  //         // 予定リストの追加処理
  //         addScheduledHabit(userId,habitList.id,selectedDate).then((result)=>{
  //           fetchScheduledHabit(userId,result.id).then((result)=>{
  //             const scheduledHabit = Object.assign({id: result.id}, result.data())  as ScheduledHabit
  //             setGlobalState({ type: ADD_SCHEDULED_HABIT, payload: {scheduledHabit: scheduledHabit}})
  //           }).catch((error)=>{console.log(error)})
  //         }).catch((error)=>{console.log(error)})
  //       }
  //     })
  //   } else {
  //     // habitListsの配列とscheduledHabitsOfSelectedDateの配列を比較し、
  //     // 未登録の予定リストが存在場合、予定リストへ追加する

  //     const habitListIds:string[] = []
  //     // 選択している日付より過去に作成されたHabitListのみにフィルタし、habitListsIdsへ追加
  //     const filteredHabitlists = habitLists.filter(item => getYMDStr(item.createdAt) <= selectedDate )
  //     filteredHabitlists.map((list)=>{
  //       habitListIds.push(list.id)
  //     })
  //     const scheduledHabitsIds:string[] = []
  //     scheduledHabitsOfSelectedDate.map((list)=>{
  //       scheduledHabitsIds.push(list.habitListId)
  //     })
  //     // 未作成の予定リストの判定
  //     habitListIds.concat(scheduledHabitsIds).forEach(item=>{
  //       if(habitListIds.includes(item) && !scheduledHabitsIds.includes(item)){
  //         console.log(item)
  //         // 予定リストの追加処理
  //         addScheduledHabit(userId,item,selectedDate).then((result)=>{
  //           fetchScheduledHabit(userId,result.id).then((result)=>{
  //             const scheduledHabit = Object.assign({id: result.id}, result.data())  as ScheduledHabit
  //             setGlobalState({ type: ADD_SCHEDULED_HABIT, payload: {scheduledHabit: scheduledHabit}})
  //           }).catch((error)=>{console.log(error)})
  //         }).catch((error)=>{console.log(error)})
  //       }
  //     })
  //   }
  // }
  

  // useEffect(() => {
  //   setScheduledHabits()
  //   }, [selectedDate])

  return (
    <div>
      <Header title="習慣リスト" hideBackBtn={true}/>
      <HabitListSelectDate selectedDate={selectedDate} handleClick={handleClickDate}/>
      {
        scheduledHabitsOfSelectedDate.map((list,index) => { 
          return (
            <HabitListItem
              id={list.habitListId}
              habitListId={list.habitListId}
              habitName={list.habitName}
              trigger={list.trigger}
              finished={list.finished}
              handleClick={()=>clickHabitList(userId,list.scheduledHabitId,list.finished)}
            />
          )
        })
      }
      <div className={`${Style.addBtnWrap} ${selectedDate !== todayStr && Style.btnHide}`} >
        <Link to="/create_habitlist">
          <FloatingAddBtn />
        </Link>
      </div>
      <Footer selectedMenu="habitlists"/>
    </div>
  )
}

export default HabitList