import React from 'react'
import Style from './Calendar.module.scss'
import CalendarGrid from '../../Molecules/CalendarGrid/CalendarGrid'

const Calendar = () => {
  return (
    <div className={Style.calendarWrap}>
      <CalendarGrid />
    </div>
  )
}

export default Calendar
