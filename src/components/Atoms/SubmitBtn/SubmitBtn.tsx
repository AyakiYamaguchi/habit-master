import React, { FC } from 'react'
import Style from './SubmitBtn.module.scss'

type Props = {
  btnText: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const SubmitBtn:FC<Props> = ({btnText, handleClick}) => {
  return (
    <div>
      <button className={Style.submitBtn} onClick={handleClick}>{btnText}</button>
    </div>
  )
}

export default SubmitBtn
