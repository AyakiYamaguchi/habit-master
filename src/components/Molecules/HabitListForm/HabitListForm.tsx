import React , { useState , useContext, useCallback } from 'react'
import { CHANGE_MODAL_STATUS, Store } from '../../../store/index'
import Style from './HabitListForm.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';
import InputText from '../../Atoms/InputText/InputText';
import { UPDATE_HABIT_LIST } from '../../../store/index';
import { defaultDayOfWeekProps } from '../../../store/index'

const HabitListForm= () => {
  const { globalState , setGlobalState } = useContext(Store)
  const [habitList,setHabitList] = useState({
    habitName: '',
    trigger: '',
    dayOfWeekLists: defaultDayOfWeekProps,
    remindTime: 0,
  })
  // 曜日選択時にStateを更新する処理
  const onClickDayOfWeek = (index:number) => {
    const updatedDayOfWeekLists = habitList.dayOfWeekLists.slice();
    updatedDayOfWeekLists[index].selected = !updatedDayOfWeekLists[index].selected;
    setHabitList({ ...habitList,dayOfWeekLists: updatedDayOfWeekLists });
  }

  const handleChangeListTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updateHabitName = e.target.value;
    setHabitList({...habitList, habitName: updateHabitName });
  },[habitList.habitName])

  const handleChangeTrigger = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updateTrigger = e.target.value;
    setHabitList({ ...habitList, trigger: updateTrigger });
  },[habitList.trigger])

  const handleChangeRemindTime = useCallback((e: React.ChangeEvent<HTMLInputElement>)=>{
    const updateRemindTime = Number(e.target.value);
    setHabitList({...habitList, remindTime: updateRemindTime})
  },[habitList.remindTime])

  const updateHabitLists = () => {
    setGlobalState({type: UPDATE_HABIT_LIST, payload: {title: habitList}})
    setHabitListTitle('')
    setGlobalState({type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }
  const changeModalStatus = () => {
    setGlobalState({type: CHANGE_MODAL_STATUS, payload: {isModalOpen: !globalState.isModalOpen}})
  }
  return (
    <div>
      <div className={Style.section}>
        <h2 className={Style.title}>習慣化したい行動</h2>
        <InputText
          placeholder="本を1ページ読む"
          state={habitList.habitName}
          handleChange={handleChangeListTitle}
        />
      </div>
      <div className={Style.section}>
        <h2 className={Style.title}>行動するタイミング</h2>
        <InputText
          placeholder="例：朝食を食べたあと"
          state={habitList.trigger}
          handleChange={handleChangeTrigger}
        />
      </div>
      <div className={Style.section}>
        <h2 className={Style.title}>行動する曜日</h2>
        <div className={Style.dayOfWeek__wrap}>
          {habitList.dayOfWeekLists.map((list,index)=>{
            return(
              <div 
                onClick={()=>onClickDayOfWeek(index)}
                className={`${Style.dayOfWeek__item} ${list.selected && Style.selected}`}
              >
                {list.dayOfWeek}
              </div>
            )
          })}
        </div>
      </div>
      <div className={Style.section}>
        <h2 className={Style.title}>リマインダー</h2>
        <div className={Style.remindWrap}>
          <input 
            type='tel'
            value={habitList.remindTime}
            className={Style.remindInput}
            onChange={handleChangeRemindTime}
          />
          <p className={Style.remindText}>時にリマインド配信</p>
        </div>
      </div>
      <div className={Style.btnWrap}>
        <SubmitBtn btnText="登録する" handleClick={updateHabitLists}/>
        <CancelBtn btnText="キャンセル" handleClick={changeModalStatus}/>
      </div>
    </div>
  );
}

export default HabitListForm;
