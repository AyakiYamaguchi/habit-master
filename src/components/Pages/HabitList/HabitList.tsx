import React , { FC, useContext, useEffect } from 'react';
import Style from './HabitList.module.scss';
import Header from '../../Organisms/Header/Header';
import Footer from '../../Organisms/Footer/Footer';
import { Store } from '../../../store/index';
import HabitListItem from '../../Molecules/HabitListItem/HabitListItem';
import Modal from '../../Molecules/Modal/Modal';
import CreateHabitListForm from '../../Molecules/CreateHabitListForm/CreateHabitListForm';
import HabitListSelectDate from '../../Molecules/HabitListSelectDate/HabitListSelectDate';
import FloatingAddBtn from '../../Atoms/FloatingAddBtn/FloatingAddBtn';
import { CHANGE_MODAL_STATUS } from '../../../store/index';
import { SET_HABIT_RESULT_LIST } from '../../../store/index';
import { SET_HABIT_LISTS } from '../../../store/index';

const today = new Date()
const habitResultLists = [
  {
    id: '1',
    finished: false,
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

const habitLists = [
  {
    id: '1',
    habitName: 'コードを一行書く',
    trigger: '夕食を食べた後',
    weeklySch: {},
    remindHour: today.getHours(),
    remindMinutes: today.getMinutes(),
  },
  {
    id: '2',
    habitName: '1ページ読書をする',
    trigger: 'お風呂に入ったとき',
    weeklySch: {},
    remindHour: today.getHours(),
    remindMinutes: today.getMinutes(),
  },
  {
    id: '3',
    habitName: 'ストレッチをする',
    trigger: '寝る前',
    weeklySch: {},
    remindHour: today.getHours(),
    remindMinutes: today.getMinutes(),
  }
]

const HabitList:FC = () => {
  const { globalState, setGlobalState } = useContext(Store)

  // 習慣結果リスト取得
  const setHabitResultList = () => {
    setGlobalState({ type: SET_HABIT_RESULT_LIST , payload: {habitResultLists: habitResultLists}})
  }
  // 習慣リストマスタ取得
  const setHabitLists = () => {
    setGlobalState({ type: SET_HABIT_LISTS , payload: {habitLists: habitLists}})
  }

  // 日付をYYYYMMDD形式の文字列に変換
  const getYMDStr = (date: Date) => {
    const Y = date.getFullYear()
    const M = ("00" + (date.getMonth()+1)).slice(-2)
    const D = ("00" + date.getDate()).slice(-2)

    return Y + M + D
  }

  // 現在選択されている日付を取得
  const selectedDate = globalState.selectedDate
  const selectedDateStr = getYMDStr(selectedDate)

  // 選択している日付で、習慣ステータスが完了しているリストのみを取得
  const filteredHabitList = globalState.habitResultLists.filter((list) => {
    const habitListDateStr = getYMDStr(list.finishedDateTime)
    
    if (habitListDateStr === selectedDateStr){
      if (list.finishedDateTime){
        return (list)
      }
    }
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
      <Header title="習慣化チャレンジリスト"/>
      <HabitListSelectDate />
      {
        globalState.habitLists.map((list,index) => {
          const habitList = filteredHabitList.map((resultList,index)=>{
            return resultList.id === list.id
          })
          return (
            <HabitListItem 
              id={list.id}
              habitName={list.habitName}
              trigger={list.trigger}
              finished={!habitList ? false : true}
            />
          )
        })
      }
      <div className={`${Style.addBtnWrap} ${selectedDate.getUTCDate() != today.getDate() && Style.btnHide}`} >
        <FloatingAddBtn handleClick={changeModalStatus}/>
      </div>
      <Modal>
        <CreateHabitListForm />
      </Modal>
      <Footer selectedMenu="list"/>
    </div>
  )
}

export default HabitList