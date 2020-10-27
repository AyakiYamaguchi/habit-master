import React , { useState , useContext, useCallback } from 'react'
import { CHANGE_MODAL_STATUS, Store } from '../../../store/index'
import Style from './CreateHabitListForm.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';
import InputText from '../../Atoms/InputText/InputText';
import { CREATE_HABIT_LIST } from '../../../store/index';

const CreateHabitListForm = () => {
  const { globalState , setGlobalState } = useContext(Store)
  const [habitListTitle , setHabitListTitle] = useState('')

  const handleChangeListTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const listTitle = e.target.value;
    setHabitListTitle(listTitle);
    console.log(e.target.value)
  },[])

  const onCreateHabitList = useCallback(() => {
    setGlobalState({type: CREATE_HABIT_LIST, payload: {title: habitListTitle}})
  },[])
  const changeModalStatus = () => {
    setGlobalState({type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }
  return (
    <div>
      <h2 className={Style.title}>新しい習慣を登録する</h2>
      <InputText placeholder="例：読書（20ページ）" state={habitListTitle} handleChange={handleChangeListTitle}/>
      <div className={Style.btnWrap}>
        <SubmitBtn btnText="登録する" handleClick={onCreateHabitList}/>
        <CancelBtn btnText="キャンセル" handleClick={changeModalStatus}/>
      </div>
    </div>
  );
}

export default CreateHabitListForm;
