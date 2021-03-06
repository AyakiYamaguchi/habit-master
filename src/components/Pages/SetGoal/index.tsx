import React , { useState, useContext } from 'react';
import InputStep from '../../Molecules/InputStep';
import TitleText from '../../Atoms/TitleText';
import InputGoal from '../../Organisms/InputGoal';
import Style from './SetGoal.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn';
import {Store} from '../../../store/index';
import { SET_GOAL } from '../../../store/index';

const SetGoal = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const [goal, setGoal] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleChangeGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const goal = e.target.value;
    setGoal(goal);
    setErrorMessage('');
  }
  const handleClickSubmit = () => {
    // const errorInfo = validateRequired(goal, '目標が入力されていません')
    // if (errorInfo) {
    //   setErrorMessage(errorInfo)
    // } else {
    //   setGlobalState({ type: SET_GOAL , payload: { goal: goal }})
    // }
  }
  const handleClickCancel = () => {
    console.log('キャンセルボタン')
  }

  return (
    <div className={Style.wrap}>
      <InputStep stepNum={3} currentStep={1} />
      <TitleText title={'目標を設定しましょう'} />
      <p className={Style.description}>
        新しい習慣を身に着けたときに、自分がどう変わっているか想像してみましょう。
        想像した未来の自分の姿を目標に書いてみてください。
        目標が具体的であると、より効果的です。
      </p>
      <InputGoal goal={goal} handleChange={handleChangeGoal} errorMessage={errorMessage}/>
      <div className={Style.btnWrap}>
        <SubmitBtn btnText="この目標ではじめる" handleClick={handleClickSubmit}/>
        <CancelBtn btnText="あとで目標を設定する" handleClick={handleClickCancel}/>
      </div>
      <p className={Style.description}>
        目標がないけれどとりあえず始めたいという方でも大丈夫です。
        続けているうちにきっと目標が見つかります。
      </p>
    </div>
  )
}

export default SetGoal
