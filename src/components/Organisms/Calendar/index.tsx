import React, { FC, useState } from 'react';
import Style from './Calendar.module.scss';
import { ScheduledHabit } from '../../../store/index';
import CalendarDate from '../../Atoms/CalendarDate';
import { getCalendarDays } from '../../../helper/dateHelper';

type Props = {
  scheduledHabits: ScheduledHabit[]
}

const Calendar:FC<Props> = ({scheduledHabits}) => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month , setMonth] = useState(new Date().getMonth() + 1)
  const days = getCalendarDays(year,month)

  const getFinishedStatus = (date:number|null) => {
    // 日付ごとの習慣予定リストを取得
    const dailyHabitLists = scheduledHabits.filter((list)=> {
      return year === list.scheduledYear && month === list.scheduledMonth +1 && date === list.scheduledDate
    })
    // 完了している習慣リストのみを取得
    const finishedLists = dailyHabitLists.filter((list) => {
      return list.finished === true
    })
    // 習慣予定リストの件数を取得
    const listLength = dailyHabitLists.length
    // 完了している習慣リストの件数を取得
    const finishedListLength = finishedLists.length

    // ステータス返却ロジック
    if (listLength === finishedListLength && finishedListLength > 0){
      return 'done'
    } else if ( finishedListLength > 0){
      return 'doing'
    } else {
      return 'notDone'
    }
  }

  const onClick = (n: number) => {
    const nextMonth = month + n
    if( nextMonth > 12 ) {
      setYear(year + 1)
      setMonth(1)
    } else if ( nextMonth < 1) {
      setYear(year -1)
      setMonth(12)
    } else {
      setMonth(nextMonth)
    }
  }

  return (
    <div>
      {/* カレンダーの表示月変更エリア */}
      <div className={Style.calendarHeader}>
        <button className={Style.calendarHeader__button} onClick={()=>onClick(-1)}>＜</button>
        <h1 className={Style.calendarHeader__title}>{year}年{month}月</h1>
        <button className={Style.calendarHeader__button} onClick={()=>onClick(1)}>＞</button>
      </div>
      {/* カレンダー表示エリア */}
      <div className={Style.tableWrap}>
        <table className={Style.table}>
          <tr className={Style.tableHeader}>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
          {
            days.map((week,index) => {
              return(
                <tr>
                  {
                    week.map((date,index) => {
                      const finishedStatus = getFinishedStatus(date)
                      return(
                        <td className={Style.dateItem}>
                          <CalendarDate date={date} finishedStatus={finishedStatus}/>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export default Calendar
