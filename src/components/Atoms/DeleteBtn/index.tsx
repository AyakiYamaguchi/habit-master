import React, {FC} from 'react';
import Style from './DeleteBtn.module.scss';

type Props = {
  btnText: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const DeleteBtn:FC<Props> = (props) => {
  return (
    <button className={Style.deleteBtn} onClick={props.handleClick}>
      {props.btnText}
    </button>
  )
}

export default DeleteBtn
