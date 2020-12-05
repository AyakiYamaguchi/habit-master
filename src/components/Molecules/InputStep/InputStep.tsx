import React, { FC } from 'react';
import Style from './InputStep.module.scss';

type Props = {
  stepNum: number;
  currentStep: number;
}
const InputStep:FC<Props> = ({ stepNum, currentStep }) => {
  // ステップ表示用の配列を作成
  const steps = []
  for(let i = 1; i <= stepNum; i++) {
    const num = i
    if(i === currentStep) {
      steps.push(
        {
          step: num,
          selected: true
        }
      )
    } else {
      steps.push(
        {
          step: num,
          selected: false
        }
      )
    }
  }
  return (
    <div>
      <ul className={Style.stepWrap}>
        {
          steps.map(item => {
            return <li className={
              `${Style.stepItem} 
               ${item.selected ? Style.selected : Style.unselected}`
            }
              >{item.step}</li>
          })
        }
      </ul>
    </div>
  )
}

export default InputStep
