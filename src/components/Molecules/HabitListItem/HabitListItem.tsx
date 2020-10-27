import React, { FC, useContext } from 'react'
import checkIcon from '../../../images/check-line_icon.png'
import Style from './HabitListItem.module.scss'
import { HabitList } from '../../../store/index'
import { Store } from '../../../store/index'

const HabitListItem:FC<HabitList> = ( habitList ) => {
  const { globalState, setGlobalState } = useContext(Store)
  const { id, title , finished } = habitList
  const editHabitStatus = (id: string) => {
    setGlobalState({type: 'EDIT_HABIT_STATUS', payload: {id: id}})
  }
  return (
    <div className={Style.list_wrapper} key={id} onClick={() => editHabitStatus(id)}>
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
  )
}

export default HabitListItem