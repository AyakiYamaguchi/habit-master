import React , { FC, useContext, useEffect } from 'react'
import Style from './HabitList.module.scss'
import Header from '../../Organisms/Header/Header'
import Footer from '../../Organisms/Footer/Footer'
import { Store } from '../../../store/index'
import HabitListItem from '../../Molecules/HabitListItem/HabitListItem'
import Modal from '../../Molecules/Modal/Modal'
import { listenerCount } from 'process'
import CreateHabitListForm from '../../Molecules/CreateHabitListForm/CreateHabitListForm'
import HabitListSelectDate from '../../Molecules/HabitListSelectDate/HabitListSelectDate'
import { isTemplateExpression } from 'typescript'
import FloatigAddBtn from '../../Atoms/FloatigAddBtn/FloatigAddBtn'
import { CHANGE_MODAL_STATUS } from '../../../store/index'

const today = new Date()
const habitLists = [
  {
    id: '1',
    title: 'programing',
    finished: false,
    scheduledDate: today,
  },
  {
    id: '2',
    title: '筋トレ',
    finished: false,
    scheduledDate: today,
  },
  {
    id: '3',
    title: '読書',
    finished: false,
    scheduledDate: today,
  }
]

const HabitList:FC = () => {
  const { globalState, setGlobalState } = useContext(Store)
  // 週間リスト取得処理
  const setHabitList = () => {
    setGlobalState({ type: 'SET_HABIT_LIST' , payload: {habitLists: habitLists}})
  }
  const filteredHabitList = globalState.habitLists.filter((list) => {
    return list.scheduledDate.getDate() === globalState.selectedDate.getDate()
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
              scheduledDate={list.scheduledDate}
            />
          )
        })
      }
      <div className={Style.addBtnWrap}>
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