import React , { useState } from 'react';
import InputStep from '../../Molecules/InputStep/InputStep';
import TitleText from '../../Atoms/TitleText/TitleText';
import EditGoal from '../../Organisms/EditGoal/EditGoal';
const SetGoal = () => {
  const [goal, setGoal] = useState('')
  const handleChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const goal = e.target.value;
    setGoal(goal);
  }
  return (
    <div>
      <InputStep stepNum={3} currentStep={1} />
      <TitleText title={'目標を設定しましょう'} />
      <EditGoal goal={goal} handleChange={handleChangeGoal}/>
    </div>
  )
}

export default SetGoal
