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
    finishedDateTime: today,
    finishedYear: today.getFullYear(),
    finishedMonth: today.getMonth(),
    finishedDate: today.getDate(),
    finishedHour: today.getHours(),
    finishedMin: today.getMinutes(),
  },
  {
    id: '2',
    finished: false,
    finishedDateTime: today,
    finishedYear: today.getFullYear(),
    finishedMonth: today.getMonth(),
    finishedDate: today.getDate(),
    finishedHour: today.getHours(),
    finishedMin: today.getMinutes(),
  },
  {
    id: '3',
    finished: false,
    finishedDateTime: today,
    finishedYear: today.getFullYear(),
    finishedMonth: today.getMonth(),
    finishedDate: today.getDate(),
    finishedHour: today.getHours(),
    finishedMin: today.getMinutes(),
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
  // 週間リスト取得処理
  const setHabitResultList = () => {
    setGlobalState({ type: SET_HABIT_RESULT_LIST , payload: {habitResultLists: habitResultLists}})
  }
  const setHabitLists = () => {
    setGlobalState({ type: SET_HABIT_LISTS , payload: {habitLists: habitLists}})
  }
  const selectedDate = globalState.selectedDate.getDate()
  const filteredHabitList = globalState.habitResultLists.filter((list) => {
    return list.finishedDate === selectedDate
  })
  const changeModalStatus = () => {
    setGlobalState({ type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }

  useEffect(()=> {
    setHabitResultList()
  },[])

  return (
    <div>
      <Header title="習慣化チャレンジリスト"/>
      <HabitListSelectDate />
      {
        filteredHabitList.map((list) => {
          return(
            <HabitListItem
              id={list.id}
              title={list.title}
              finished={list.finished}
              finished={list.finished}
              finishedYear={list.finishedYear}
              finishedMonth={list.finishedMonth}
              finishedDate={list.finishedDate}
            />
          )
        })
      }
      <div className={`${Style.addBtnWrap} ${selectedDate != today.getDate() && Style.btnHide}`} >
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