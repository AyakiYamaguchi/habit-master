import React, { FC, useContext } from 'react'
import checkIcon from '../../../images/check-line_icon.png'
import Style from './HabitListItem.module.scss'
import { EDIT_HABIT_RESULT_STATUS } from '../../../store/index'
import { Store } from '../../../store/index'

type Props = {
  id: string;
  habitName: string;
  trigger: string;
  finished: boolean;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> void;
}

const HabitListItem:FC<Props> = ({id , habitName , trigger , finished , handleClick}) => {
  const { globalState, setGlobalState } = useContext(Store)
  // const { id, title , finished } = habitList
  const editHabitStatus = (id: string) => {
    setGlobalState({type: EDIT_HABIT_RESULT_STATUS, payload: {id: id}})
  }
  return (
    <div className={Style.list_wrapper} key={id} onClick={handleClick}>
      {
        finished ? (
          <div className={Style.checked}>
            <img src={checkIcon} />
          </div>
        ):(
          <div className={Style.unchecked}></div>
        )
      }
      <p className={Style.list_title}>{trigger}</p>
      <p className={Style.list_title}>{habitName}</p>
    </div>
  )
}

export default HabitListItem