import React , { useContext, useEffect, useState } from 'react';
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
import { ScheduledHabit, EDIT_HABIT_RESULT_STATUS , ADD_SCHEDULED_HABIT } from '../../../store/index';
import { getYMDStr, getOnlyDayOfWeek } from '../../../helper/dateHelper'
import { changeHabitFinishedStatus, addScheduledHabit, fetchScheduledHabit　} from '../../../apis/FirestoreHabits'

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

  // 選択している日付でスケジュールされている習慣リストの配列を作成
  const fillterdScheduledHabits = globalState.scheduledHabits.filter((list) => {
    const scheduledDate = Moment({
      year: list.scheduledYear,
      month: list.scheduledMonth,
      day: list.scheduledDate,
    }).format("YYYYMMDD")
    return scheduledDate === selectedDate
  })

  // 選択している日付の習慣リスト表示用の配列を作成
  const scheduledHabitsOfSelectedDate:scheduleList[] = []
  globalState.habitLists.map((habitList) => {
    fillterdScheduledHabits.map((scheduledHabit) => {
      if(habitList.id === scheduledHabit.habitListId){
        const list = {
          habitListId: habitList.id,
          habitListCreatedAt: habitList.createdAt,
          scheduledHabitId: scheduledHabit.id,
          finished: scheduledHabit.finished,
          habitName: habitList.habitName,
          trigger: habitList.trigger,
        }
        scheduledHabitsOfSelectedDate.push(list)
      }
    })
  })

  // クリックした日付を取得しStateにセット
  const handleClickDate = (date:string) => {
    setSelectedDate(date)
  }
  // クリックしたHabitListの完了ステータスを変更
  const clickHabitList =(userId:string, scheduledHabitsId:string, currentFinishedStatus:boolean) => {
    changeHabitFinishedStatus(userId, scheduledHabitsId, currentFinishedStatus)
      .then(() => {
        setGlobalState({ type: EDIT_HABIT_RESULT_STATUS, payload: {id: scheduledHabitsId}})
      }).catch((error) => {
        console.log(error)
      })
  }
  // 選択している日付の曜日で習慣予定されているHabitList一覧を取得
  const habitListsOfSelectedDayOfWeek = globalState.habitLists.filter((list) => {
    const selectedDayOfWeek:number =  getOnlyDayOfWeek(selectedDate)
    return list.weeklySch[selectedDayOfWeek].selected === true
  })
  // 選択している日付をDate型に変換
  const selectedDateOfDateType = Moment(selectedDate).toDate()

  // 習慣予定リストの自動追加処理
  const setScheduledHabits = () => {
    console.log('実行')
    // 予定リストが1件も存在しない場合
    if(scheduledHabitsOfSelectedDate.length === 0){
      console.log('リストが1件もありません')
      habitListsOfSelectedDayOfWeek.map((habitList) => {
        const habitListCreatedAt = getYMDStr(habitList.createdAt)
        // 選択している日付より前に作成されたHabitListがあった場合のみ予定リストを追加
        if (habitListCreatedAt <= selectedDate){
          console.log('作成対象のリストがあります')
          // 予定リストの追加処理
          addScheduledHabit(userId,habitList.id,selectedDateOfDateType).then((result) => {
            fetchScheduledHabit(userId,result.id).then((result)=>{
              const scheduledHabit = Object.assign({id: result.id}, result.data())  as ScheduledHabit
              setGlobalState({ type: ADD_SCHEDULED_HABIT, payload: {scheduledHabit: scheduledHabit}})
            }).catch((error)=>{console.log(error)})
          }).catch((error)=>{console.log(error)})
        }
      })
    } else {
      // habitListsの配列とscheduledHabitsOfSelectedDateの配列を比較し、
      // 未登録の予定リストが存在場合、予定リストへ追加する
      const habitListIds:string[] = []
      // 選択している日付より過去に作成されたHabitListのみにフィルタし、habitListsIdsへ追加
      const filteredHabitlists = habitListsOfSelectedDayOfWeek.filter(item => getYMDStr(item.createdAt) <= selectedDate )
      filteredHabitlists.map((list)=>{
        habitListIds.push(list.id)
      })
      const scheduledHabitsIds:string[] = []
      scheduledHabitsOfSelectedDate.map((list)=>{
        scheduledHabitsIds.push(list.habitListId)
      })
      // 未作成の予定リストの判定
      habitListIds.concat(scheduledHabitsIds).forEach(item=>{
        if(habitListIds.includes(item) && !scheduledHabitsIds.includes(item)){
          console.log(item)
          // 予定リストの追加処理
          addScheduledHabit(userId,item,selectedDateOfDateType).then((result)=>{
            fetchScheduledHabit(userId,result.id).then((result)=>{
              const scheduledHabit = Object.assign({id: result.id}, result.data())  as ScheduledHabit
              setGlobalState({ type: ADD_SCHEDULED_HABIT, payload: {scheduledHabit: scheduledHabit}})
            }).catch((error)=>{console.log(error)})
          }).catch((error)=>{console.log(error)})
        }
      })
    }
  }
  

  useEffect(() => {
    setScheduledHabits()
    }, [selectedDate])

  return (
    <div>
      <Header title="習慣リスト" hideBackBtn={true}/>
      <HabitListSelectDate selectedDate={selectedDate} handleClick={handleClickDate}/>
      {
        scheduledHabitsOfSelectedDate.map((list) => { 
          return (
            <HabitListItem
              id={list.scheduledHabitId}
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