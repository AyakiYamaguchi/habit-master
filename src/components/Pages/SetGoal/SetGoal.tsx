import React from 'react'
import InputStep from '../../Molecules/InputStep/InputStep'
import TitleText from '../../Atoms/TitleText/TitleText'
const SetGoal = () => {
  return (
    <div>
      <InputStep stepNum={3} currentStep={1} />
      <TitleText title={'目標を設定しましょう'} />
    </div>
  )
}

export default SetGoal
