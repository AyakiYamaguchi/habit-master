import React, { FC } from 'react'
import checkIcon from '../../images/check-line_icon.png'
import Style from './HabitListItem.module.scss'
import { HabitList } from '../../store/index'

const HabitListItem:FC<HabitList> = ( habitList ) => {
  const { title , finished } = habitList
  return (
    <>
      <div className={Style.list_wrapper}>
        {
          finished ? (
            <div className={Style.checked}>
              <img src={checkIcon} />
            </div>
          ):(
            <div className={ Style.unchecked}></div>
          )
        }
        <p className={Style.list_title}>{title}</p>
      </div>
    </>
  )
}

export default HabitListItem