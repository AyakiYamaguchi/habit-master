import React , { FC, useContext, useEffect } from 'react';
import Style from './HabitList.module.scss';
import Header from '../../Organisms/Header';
import Footer from '../../Organisms/Footer/Footer';
import { Store } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { fetchHabitList, getLastHabitListId } from '../../../apis/FirestoreHabits';
import HabitListItem from '../../Molecules/HabitListItem/HabitListItem';
import Modal from '../../Molecules/Modal/Modal';
import HabitListForm from '../../Organisms/HabitListForm';
import HabitListSelectDate from '../../Molecules/HabitListSelectDate/HabitListSelectDate';
import FloatingAddBtn from '../../Atoms/FloatingAddBtn/FloatingAddBtn';
import { CHANGE_MODAL_STATUS } from '../../../store/index';
import { SET_HABIT_RESULT_LIST } from '../../../store/index';
import { SET_HABIT_LISTS } from '../../../store/index';

const today = new Date()
const habitResultLists = [
  {
    id: '1',
    finished: true,
    scheduledDateTime: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
    finishedDateTime: today,
  },
  {
    id: '2',
    finished: false,
    scheduledDateTime: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
    finishedDateTime: today,
  },
  {
    id: '3',
    finished: false,
    scheduledDateTime: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
    finishedDateTime: today,
  }
]

type scheduleList = {
  id: string;
  finished: boolean;
  habitName: string;
  trigger: string;
}

const HabitList:FC = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const { AuthState , setAuthState } = useContext(AuthContext)
  // 習慣結果リスト取得
  const setHabitResultList = () => {
    setGlobalState({ type: SET_HABIT_RESULT_LIST , payload: {habitResultLists: habitResultLists}})
  }
  const userId = AuthState.user.uid
  // 習慣リストマスタ取得
  const setHabitLists = () => {
    // fetchHabitList(userId).then((result)=>{
    //   const last = result.slice(-1)[0];
    //   console.log(last)
    // })
    // setGlobalState({ type: SET_HABIT_LISTS , payload: {habitLists: habitLists}})
  }

  // 日付をYYYYMMDD形式の文字列に変換
  const getYMDStr = (date: Date) => {
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth()+1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)

    return Y + M + D
  }

  // 現在選択されている日付を取得しYYYYMMDD形式に変換
  const selectedDate = globalState.selectedDate
  const selectedDateStr = getYMDStr(selectedDate)

  // 選択している日付でスケジュールされている習慣リストの配列を作成
  const scheduledLists:scheduleList[] = []
  globalState.habitLists.map((habitList, index)=>{
    globalState.habitResultLists.map((resultList, index)=>{
      // resultListの日付をYYYYMMDD形式に変換
      const resultListDateStr = getYMDStr(resultList.finishedDateTime)
      // 選択している日付でスケジュールされていた習慣リストを配列に追加
      if(habitList.id === resultList.id && resultListDateStr === selectedDateStr){
        const scheduleList = {
          id: habitList.id,
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

  useEffect(()=> {
    setHabitLists()
    setHabitResultList()
  },[])

  return (
    <div>
      <Header title="習慣リスト"/>
      <HabitListSelectDate />
      {
        scheduledLists.map((list,index) => { 
          return (
            <HabitListItem
              id={list.id}
              habitName={list.habitName}
              trigger={list.trigger}
              finished={list.finished}
            />
          )
        })
      }
      <div className={`${Style.addBtnWrap} ${selectedDate.getDate() !== today.getDate() && Style.btnHide}`} >
        <FloatingAddBtn handleClick={changeModalStatus}/>
      </div>
      <Modal>
        
      </Modal>
      <Footer selectedMenu="list"/>
    </div>
  )
}

export default HabitList