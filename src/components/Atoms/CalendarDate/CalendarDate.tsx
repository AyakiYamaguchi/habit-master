import React, { FC } from 'react'
import Style from './CalendarDate.module.scss'

type Props = {
  date: number | null
  finished: boolean
}

const CalendarDate:FC<Props> = ({date, finished}) => {
  return (
    <div className={`
      ${date ? Style.dateWrap : Style.none}`}>
      <span className={`${Style.dateItem} ${finished ? Style.finished : Style.unfinished}`}>
        {date}
      </span>
    </div>
  )
}

export default CalendarDate
