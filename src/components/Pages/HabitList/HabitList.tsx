import React , { FC, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Style from './HabitList.module.scss';
import Moment from 'moment'
import Header from '../../Organisms/Header';
import Footer from '../../Organisms/Footer/Footer';
import { Store } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import HabitListItem from '../../Molecules/HabitListItem/HabitListItem';
import Modal from '../../Molecules/Modal/Modal';
import HabitListSelectDate from '../../Molecules/HabitListSelectDate/HabitListSelectDate';
import FloatingAddBtn from '../../Atoms/FloatingAddBtn/FloatingAddBtn';
import { CHANGE_MODAL_STATUS } from '../../../store/index';
import { EDIT_HABIT_RESULT_STATUS , SET_SELECTED_HABIT_LIST_DATE } from '../../../store/index';
import { getYMDStr } from '../../../helper/dateHelper'
import { changeHabitFinishedStatus, addScheduledHabit } from '../../../apis/FirestoreHabits'

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
  const { AuthState , setAuthState } = useContext(AuthContext)
  const userId = AuthState.user.uid
  
  // 現在選択されている日付を取得
  const selectedDateStr = globalState.selectedDate
  const selectedDate = Moment(globalState.selectedDate).toDate()

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
      if(habitList.id === resultList.habitListId && resultListDateStr === selectedDateStr){
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

  // モーダルの表示 / 非表示をスイッチ
  const changeModalStatus = () => {
    setGlobalState({ type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }

  const clickHabitList =(userId:string, scheduledHabitsId:string, currentFinishedStatus:boolean) => {
    changeHabitFinishedStatus(userId, scheduledHabitsId, currentFinishedStatus).then(()=>{
      setGlobalState({ type: EDIT_HABIT_RESULT_STATUS, payload: {id: scheduledHabitsId}})
    }).catch((error)=>{
      console.log(error)
    })
  }

  const setScheduledHabits = () =>{
    // 予定リストが1件も存在しない場合
    if(scheduledHabitsOfSelectedDate.length === 0){
      habitLists.map((habitList,index)=>{
        const habitListCreatedAt = getYMDStr(habitList.createdAt)
        if (habitListCreatedAt >= selectedDateStr){
          addScheduledHabit(userId,habitList.id,selectedDate).then(()=>{

          })
        }
      })
    }
    scheduledHabitsOfSelectedDate.map((list,index)=>{
      habitLists.map((habitList,index)=>{
        if(list.habitListId !== habitList.id){
          // 選択した日付より過去日かを判定
          const habitListCreatedAt = getYMDStr(habitList.createdAt)
          if (habitListCreatedAt >= selectedDateStr){
            addScheduledHabit(userId,habitList.id,selectedDate).then(()=>{
              
            })
          }
        }
      })
    })
  }
  

  useEffect(() => {
    // setScheduledHabits()
    console.log(selectedDate)
    }, [scheduledHabitsOfSelectedDate])

  return (
    <div>
      <Header title="習慣リスト"/>
      <HabitListSelectDate/>
      {
        scheduledHabitsOfSelectedDate.map((list,index) => { 
          return (
            <HabitListItem
              id={list.habitListId}
              habitName={list.habitName}
              trigger={list.trigger}
              finished={list.finished}
              handleClick={()=>clickHabitList(userId,list.scheduledHabitId,list.finished)}
            />
          )
        })
      }
      <div className={`${Style.addBtnWrap} ${selectedDateStr !== todayStr && Style.btnHide}`} >
        <Link to="/create_habitlist">
          <FloatingAddBtn />
        </Link>
      </div>
      <Modal>
        
      </Modal>
      <Footer selectedMenu="list"/>
    </div>
  )
}

export default HabitList