import React, { FC } from 'react'
import TitleText from '../../Atoms/TitleText/TitleText'
import Style from './InputGoal.module.scss'

type Props = {
  goal?: string;
  errorMessage?: string;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputGoal:FC<Props> = ({goal, errorMessage, handleChange}) => {
  return (
    <div className={Style.wrap}>
      <TitleText title="わたしの目標" />
      <div className={Style.textAreaWrap}>
        { errorMessage && <p className={Style.errorMessage}>{errorMessage}</p>}
        <textarea
          className={`${Style.textArea} ${errorMessage && Style.error}`}
          onChange={handleChange}
        >{goal}</textarea>
      </div>
    </div>
  )
}

export default InputGoal
