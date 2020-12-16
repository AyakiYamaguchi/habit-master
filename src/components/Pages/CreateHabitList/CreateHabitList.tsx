import React, {FC,useState,useContext,useEffect,useCallback} from 'react';
import Style from './CreateHabitList.module.scss'
import { CHANGE_MODAL_STATUS, CREATE_HABIT_LIST, Store } from '../../../store/index';
import HabitListForm from '../../Molecules/HabitListForm/HabitListForm'
import SubmitBtn from '../../Atoms/SubmitBtn/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';
import HabitListItem from '../../Molecules/HabitListItem/HabitListItem';

const CreateHabitList = () => {
  // const { globalState , setGlobalState } = useContext(Store)
  // const [habitName , setHabitName] = useState('')
  // const [trigger, setTrigger] = useState('')
  // const [remindTime, setRemindTime] = useState(0)
  // // 週の選択状態をstateを定義し、初期値をセット
  // const [dayOfWeekLists, setDayOfWeekLists] = useState(defaultDayOfWeekProps)
  // // 曜日選択時にStateを更新する処理
  // const onClickDayOfWeek = (index:number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   const updatedDayOfWeekLists = dayOfWeekLists.slice();
  //   updatedDayOfWeekLists[index].selected = !updatedDayOfWeekLists[index].selected;
  //   setDayOfWeekLists(updatedDayOfWeekLists);
  // }
  // // submitボタンクリック時に、値をセットする処理を追加

  // const handleChangeHabitName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const listTitle = e.target.value;
  //   setHabitName(listTitle);
  // },[habitName])

  // const handleChangeTrigger = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const updateTrigger = e.target.value;
  //   setTrigger(updateTrigger);
  // },[trigger])

  // const handleChangeRemindTime = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const updateRemindTime = e.target.value;
  //   setRemindTime(updateRemindTime);
  // },[remindTime])


  // const onCreateHabitList = () => {
  //   setGlobalState({type: CREATE_HABIT_LIST, payload: {title: habitName}})
  //   setHabitName('')
  //   setGlobalState({type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  // }
  // const changeModalStatus = () => {
  //   setGlobalState({type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  // }
  return (
    <div>
      {/* <HabitListForm
        habitName={habitName}
        trigger={trigger}
        dayOfWeekLists={dayOfWeekLists}
        remindTime={remindTime}
        handleChangeHabitName={handleChangeHabitName}
        handleChangeTrigger={handleChangeTrigger}
        handleClickDayOfWeek={onClickDayOfWeek}
        handleChangeRemindTime={handleChangeRemindTime}
      />
      <div className={Style.btnWrap}>
        <SubmitBtn btnText="登録する" handleClick={onCreateHabitList}/>
        <CancelBtn btnText="キャンセル" handleClick={changeModalStatus}/>
      </div> */}
    </div>
  )
}

export default CreateHabitList
