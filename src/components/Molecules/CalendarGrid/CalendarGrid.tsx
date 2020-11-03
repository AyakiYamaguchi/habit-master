import React, { FC , useEffect , useState } from 'react'
import Style from './CalendarGrid.module.scss'
import CalendarDate from '../../Atoms/CalendarDate/CalendarDate'


const getDays = (year:number,month:number) => {
  // 1日の曜日を取得
  const first = new Date(year, month - 1, 1).getDay()
  // 月の最終日を取得
  const last = new Date(year, month, 0).getDate()
  // 月初〜月末までの日付配列を作成
  return [0, 1, 2, 3, 4, 5].map(weekIndex => {
    return [0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
      const day = dayIndex + 1 + weekIndex * 7
      return day - 1 < first || last < day - first ? null : day - first
    })
  })
}

const CalendarGrid:FC = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [month , setMonth] = useState(new Date().getMonth() + 1)
  const days = getDays(year,month)

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
      <div className={Style.calendarHeader}>
        <button className={Style.calendarHeader__button} onClick={()=>onClick(-1)}>＜</button>
        <h1 className={Style.calendarHeader__title}>{year}年{month}月</h1>
        <button className={Style.calendarHeader__button} onClick={()=>onClick(1)}>＞</button>
      </div>
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
                      return(
                        <td className={Style.dateItem}>
                          <CalendarDate year={year} month={month} date={date}/>
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
      <div className={Style.statusDescription__wrap}>
        <span className={Style.statusDescription__finishedCircle}></span>
        <p className={Style.statusDescription__text}>すべて完了</p>
        <span className={Style.statusDescription__unFinishedCircle}></span>
        <p className={Style.statusDescription__text}>一部完了</p>
      </div>
    </div>
  )
}

export default CalendarGrid
