import React , { FC } from 'react';
import Style from './CancelBtn.module.scss';

type Props = {
  btnText: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const CancelBtn:FC<Props> = ({ btnText, handleClick }) => {
  return (
    <div>
      <button type="button" className={Style.cancelBtn} onClick={handleClick}>{btnText}</button>
    </div>
  )
}

export default CancelBtn
