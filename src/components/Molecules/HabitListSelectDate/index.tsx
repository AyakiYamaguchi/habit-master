import React, { FC ,useContext, useEffect, useCallback } from 'react';
import Style from './HabitListSelectedDate.module.scss';
import { getDateLists, getOnlyDate, getDayStrJP } from '../../../helper/dateHelper';
import { Store } from '../../../store/index'
import { SET_SELECTED_HABIT_LIST_DATE } from '../../../store/index'

// 日付選択用の配列を作成
const today = new Date()
const dateLists = getDateLists(today,14).reverse()

// type Props = {
//   handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> void;
// }

const HabitListSelectDate:FC = () => {
  const { globalState , setGlobalState } = useContext(Store)
  const onClickDate = (selectedDate: string) => {
    setGlobalState({type: SET_SELECTED_HABIT_LIST_DATE, payload: {selectedDate: selectedDate}})
  }
  const selectedDate = globalState.selectedDate

  // 最新のスクロールへ自動スクロールさせる設定
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
              onClick={()=>onClickDate(item)}
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
