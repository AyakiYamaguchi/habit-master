import React, { FC, useContext } from 'react'
import moment from 'moment'
import Style from './CalendarDate.module.scss'
import { Store } from '../../../store/index'

type Props = {
  year: number
  month: number
  date: number | null
}

const CalendarDate:FC<Props> = ({year, month, date}) => {
  const { globalState, setGlobalState } = useContext(Store)
  const dailyHabitLists = globalState.habitLists.filter((list)=> {
    return year === list.scheduledYear && month === list.scheduledMonth +1 && date === list.scheduledDate
  })
  const finishedLists = dailyHabitLists.filter((list) => {
    return list.finished === true
  })
  const listLength = dailyHabitLists.length
  const finishedListLength = finishedLists.length
  return (
    <div className={`
      ${date ? Style.dateWrap : Style.none}`}>
      <span className={`
        ${Style.dateItem}
        ${listLength == finishedListLength && finishedListLength > 0 && Style.done}
        ${finishedListLength > 0 && Style.doing}
      `}>
        {date}
      </span>
    </div>
  )
}

export default CalendarDate
