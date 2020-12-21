import React from 'react'
import Footer from '../../Organisms/Footer/Footer'
import Header from '../../Organisms/Header'
import Calendar from '../../Organisms/Calendar/Calendar'

const Report = () => {
  return (
    <div>
      <Header title={'レポート'}/>
        <Calendar />
      <Footer selectedMenu={'report'}/>
    </div>)
}

export default Report