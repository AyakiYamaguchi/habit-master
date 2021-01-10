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
import { changeHabitFinishedStatus } from '../../../apis/FirestoreHabits'

const today = new Date()
const todayStr = getYMDStr(today)
type scheduleList = {
  habitListId: string;
  scheduledHabitId: string;
  finished: boolean;
  habitName: string;
  trigger: string;
}

const HabitList:FC = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const { AuthState , setAuthState } = useContext(AuthContext)
  const userId = AuthState.user.uid
  
  // 現在選択されている日付を取得
  const selectedDate = globalState.selectedDate

  // 選択している日付でスケジュールされている習慣リストの配列を作成
  const scheduledLists:scheduleList[] = []
  globalState.habitLists.map((habitList, index)=>{
    globalState.scheduledHabits.map((resultList, index)=>{
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
          scheduledHabitId: resultList.id,
          finished: resultList.finished,
          habitName: habitList.habitName,
          trigger: habitList.trigger,
        }
        return (
          scheduledLists.push(scheduleList)
        )
      }
    })
  })

  // モーダルの表示 / 非表示をスイッチ
  const changeModalStatus = () => {
    setGlobalState({ type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }

  const clickHabitList =(userId:string, scheduledHabitsId:string,currentFinishedStatus:boolean) => {
    changeHabitFinishedStatus(userId, scheduledHabitsId, currentFinishedStatus).then(()=>{
      setGlobalState({ type: EDIT_HABIT_RESULT_STATUS, payload: {id: scheduledHabitsId}})
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div>
      <Header title="習慣リスト"/>
      <HabitListSelectDate/>
      {
        scheduledLists.map((list,index) => { 
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
      <div className={`${Style.addBtnWrap} ${selectedDate !== todayStr && Style.btnHide}`} >
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