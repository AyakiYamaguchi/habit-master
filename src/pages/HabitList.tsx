import React , { FC, useContext, useEffect } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Store } from '../store/index'
import HabitListItem from '../components/HabitListItem/HabitListItem'
import { title } from 'process'


const HabitList:FC = () => {
  const { globalState, setGlobalState } = useContext(Store)
  // 週間リスト取得処理
  const setHabitList = () => {
    const today = new Date()
    const habitLists = [
      {
        id: '1',
        title: 'programing',
        finished: true,
        scheduled_date: today,
      },
      {
        id: '2',
        title: '筋トレ',
        finished: false,
        scheduled_date: today,
      },
      {
        id: '3',
        title: '読書',
        finished: true,
        scheduled_date: today,
      }
    ]
    setGlobalState({ type: 'SET_HABIT_LIST' , payload: {habitLists: habitLists}})
  }

  // useEffect で要素更新時に習慣リスト取得関数を実行
  useEffect(()=> {
    setHabitList()
  },[])

  return (
    <div>
      <Header title="あなたの習慣"/>
      {
        globalState.habitLists.map((list) => {
          return(
            <HabitListItem
              id={list.id}
              title={list.title}
              finished={list.finished}
              scheduled_date={list.scheduled_date}
            />
          )
        })
      }
      <Footer selectedMenu="list"/>
    </div>
  )
}

export default HabitList