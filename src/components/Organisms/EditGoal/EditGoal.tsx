import React, { FC } from 'react'
import TitleText from '../../Atoms/TitleText/TitleText'
import Style from './EditGoal.module.scss'

type Props = {
  goal?: string;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditGoal:FC<Props> = ({goal , handleChange}) => {
  return (
    <div className={Style.wrap}>
      <TitleText title="わたしの目標" />
      <textarea className={Style.textArea} onChange={handleChange}>{goal}</textarea>
    </div>
  )
}

export default EditGoal
