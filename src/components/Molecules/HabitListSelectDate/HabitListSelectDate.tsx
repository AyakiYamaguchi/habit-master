import React, { FC ,useContext } from 'react';
import Style from './HabitListSelectedDate.module.scss';
import { Store } from '../../../store/index'
import { SET_SELECTED_HABIT_LIST_DATE } from '../../../store/index'

// 日付選択用の配列を作成
const dateList:{date: Date, dayOfWeek: string}[] = []
const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ]
for ( let i = 0 ; i < 14; i++){
  let date = new Date()
  date.setDate(date.getDate() - i)
  const dayOfWeek = dayOfWeekStr[date.getDay()]
  const dateItem = {
    date: date,
    dayOfWeek: dayOfWeek
  }
  dateList.unshift(dateItem)
}

const HabitListSelectDate:FC = () => {
  const { globalState , setGlobalState } = useContext(Store)
  const onClickDate = (selectedDate: Date) => {
    setGlobalState({type: SET_SELECTED_HABIT_LIST_DATE, payload: {selectedDate: selectedDate}})
  }
  const currentSelectedDate = globalState.selectedDate.getDate()
  return (
    <div className={Style.dateAreaWrap}>
      {
        dateList.map((item) => {
          return(
            <div className={`${Style.dateItemWrap} ${currentSelectedDate === item.date.getDate() && Style.selectedDate}`} onClick={()=>{onClickDate(item.date)}}>
              <li className={Style.dayOfWeek}>{item.dayOfWeek}</li>
              <li className={Style.date}>{item.date.getDate()}</li>
            </div>
          )
        })
      }
    </div>
  )
}

export default HabitListSelectDate
