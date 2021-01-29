import React, { FC } from 'react';
import Style from './CalendarDate.module.scss';

type Props = {
  date: number | null;
  finishedStatus: string;
}

const CalendarDate:FC<Props> = ({date , finishedStatus}) => {
  return (
    <div className={`
      ${date ? Style.dateWrap : Style.none}`}>
      <span className={`
        ${Style.dateItem}
        ${finishedStatus === 'done' && Style.done}
        ${finishedStatus === 'doing' && Style.doing}
      `}>
        {date}
      </span>
    </div>
  )
}

export default CalendarDate
