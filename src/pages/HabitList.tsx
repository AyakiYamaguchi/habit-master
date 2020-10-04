import React , { FC } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const HabitList:FC = () => {
  return (
    <div>
      <Header title="あなたの習慣"/>
      <Footer selectedMenu="list"/>
    </div>
  )
}

export default HabitList