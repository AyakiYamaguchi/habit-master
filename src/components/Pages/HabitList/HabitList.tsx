import React , { FC, useContext, useEffect } from 'react'
import Style from './HabitList.module.scss'
import Header from '../../Organisms/Header/Header'
import Footer from '../../Organisms/Footer/Footer'
import { Store } from '../../../store/index'
import HabitListItem from '../../Molecules/HabitListItem/HabitListItem'
import Modal from '../../Molecules/Modal/Modal'
import CreateHabitListForm from '../../Molecules/CreateHabitListForm/CreateHabitListForm'
import HabitListSelectDate from '../../Molecules/HabitListSelectDate/HabitListSelectDate'
import FloatigAddBtn from '../../Atoms/FloatigAddBtn/FloatigAddBtn'
import { CHANGE_MODAL_STATUS } from '../../../store/index'

const today = new Date()
const habitLists = [
  {
    id: '1',
    title: 'programing',
    finished: false,
    scheduled: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
  },
  {
    id: '2',
    title: '筋トレ',
    finished: false,
    scheduled: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
  },
  {
    id: '3',
    title: '読書',
    finished: false,
    scheduled: today,
    scheduledYear: today.getFullYear(),
    scheduledMonth: today.getMonth(),
    scheduledDate: today.getDate(),
  }
]

const HabitList:FC = () => {
  const { globalState, setGlobalState } = useContext(Store)
  // 週間リスト取得処理
  const setHabitList = () => {
    setGlobalState({ type: 'SET_HABIT_LIST' , payload: {habitLists: habitLists}})
  }
  const selectedDate = globalState.selectedDate.getDate()
  const filteredHabitList = globalState.habitLists.filter((list) => {
    return list.scheduledDate === selectedDate
  })
  const changeModalStatus = () => {
    setGlobalState({ type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }

  useEffect(()=> {
    setHabitList()
  },[])

  return (
    <div>
      <Header title="あなたの習慣"/>
      <HabitListSelectDate />
      {
        filteredHabitList.map((list) => {
          return(
            <HabitListItem
              id={list.id}
              title={list.title}
              finished={list.finished}
              scheduled={list.scheduled}
              scheduledYear={list.scheduledYear}
              scheduledMonth={list.scheduledMonth}
              scheduledDate={list.scheduledDate}
            />
          )
        })
      }
      <div className={`${Style.addBtnWrap} ${selectedDate != today.getDate() && Style.btnHide}`} >
        <FloatigAddBtn handleClick={changeModalStatus}/>
      </div>
      <Modal>
        <CreateHabitListForm />
      </Modal>
      <Footer selectedMenu="list"/>
    </div>
  )
}

export default HabitList