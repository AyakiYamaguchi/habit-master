import React, { FC ,useEffect, useCallback } from 'react';
import Style from './HabitListSelectedDate.module.scss';
import { getDateLists, getOnlyDate, getDayStrJP } from '../../../helper/dateHelper';

// 日付選択用の配列を作成
const today = new Date()
const dateLists = getDateLists(today,14).reverse()

type Props = {
  selectedDate: string;
  handleClick: Function;
}

const HabitListSelectDate:FC<Props> = ({selectedDate,handleClick}) => {

  // 最新の日付へ自動スクロールさせる設定
  const ref = React.createRef<HTMLDivElement>()
  const scrollDateList = useCallback(() => {
      ref!.current!.scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
      })
    },[ ref ],)

  useEffect(() => {
    scrollDateList()
  }, [])
  return (
    <div className={Style.dateAreaWrap}>
      <div className={Style.dateArea__margin}></div>
      {
        dateLists.map((item) => {
          return(
            <div 
              className={`
                ${Style.dateItemWrap} 
                ${selectedDate === item && Style.selectedDate}
              `} 
              onClick={()=>handleClick(item)}
            >
              <li className={Style.dayOfWeek}>{getDayStrJP(item)}</li>
              <li className={Style.date}>{getOnlyDate(item)}</li>
            </div>
          )
        })
      }
      <div className={Style.dateArea__margin} ref={ref}></div>
    </div>
  )
}

export default HabitListSelectDate
