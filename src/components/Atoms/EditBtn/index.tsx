import React, { FC } from 'react'
import Style from './EditBtn.module.scss';

type Props = {
  btnText: string;
}

const EditBtn:FC<Props> = ({btnText}) => {
  return (
    <div>
      <button type="button" className={Style.editBtn}>{btnText}</button>
    </div>
  )
}

export default EditBtn
