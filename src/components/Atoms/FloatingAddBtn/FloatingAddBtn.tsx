import React , { FC } from 'react'
import Style from './FloatingAddBtn.module.scss'

type Props = {
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=> void;
}

const FloatigAddBtn:FC<Props> = ({handleClick}) => {
  return (
    <div className={Style.btn} onClick={handleClick}>
      +
    </div>
  )
}

export default FloatigAddBtn
