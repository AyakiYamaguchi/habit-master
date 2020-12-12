import React , { useState , useContext, useCallback } from 'react'
import { CHANGE_MODAL_STATUS, Store } from '../../../store/index'
import Style from './CreateHabitListForm.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';
import InputText from '../../Atoms/InputText/InputText';
import { CREATE_HABIT_LIST } from '../../../store/index';

// 週選択のデフォルト状態の変数を定義
const defaultDayOfWeekProps = [
  { dayOfWeek: '日',selected: false },
  { dayOfWeek: '月',selected: false },
  { dayOfWeek: '火',selected: false },
  { dayOfWeek: '水',selected: false },
  { dayOfWeek: '木',selected: false },
  { dayOfWeek: '金',selected: false },
  { dayOfWeek: '土',selected: false },
]

const CreateHabitListForm= () => {
  const { globalState , setGlobalState } = useContext(Store)
  const [habitListTitle , setHabitListTitle] = useState('')
  const [trigger, setTrigger] = useState('')
  const [remindTime, setRemindTime] = useState('')
  // 週の選択状態をstateを定義し、初期値をセット
  const [DayOfWeekLists, setDayOfWeekLists] = useState(defaultDayOfWeekProps)
  // 曜日選択時にStateを更新する処理
  const onClickDayOfWeek = (index:number) => {
    const updatedDayOfWeekLists = DayOfWeekLists.slice();
    updatedDayOfWeekLists[index].selected = !updatedDayOfWeekLists[index].selected;
    setDayOfWeekLists(updatedDayOfWeekLists);
  }
  // submitボタンクリック時に、値をセットする処理を追加

  const handleChangeListTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const listTitle = e.target.value;
    setHabitListTitle(listTitle);
  },[habitListTitle])

  const handleChangeTrigger = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const updateTrigger = e.target.value;
    setTrigger(updateTrigger);
  },[trigger])

  const onCreateHabitList = () => {
    setGlobalState({type: CREATE_HABIT_LIST, payload: {title: habitListTitle}})
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
          state={habitListTitle}
          handleChange={handleChangeListTitle}
        />
      </div>
      <div className={Style.section}>
        <h2 className={Style.title}>行動するタイミング</h2>
        <InputText
          placeholder="例：朝食を食べたあと"
          state={habitListTitle}
          handleChange={handleChangeTrigger}
        />
      </div>
      <div className={Style.section}>
        <h2 className={Style.title}>行動する曜日</h2>
        <div className={Style.dayOfWeek__wrap}>
          {DayOfWeekLists.map((list,index)=>{
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
            className={Style.remindInput}
            onChange={(e)=>setRemindTime(e.target.value)}
          />
          <p className={Style.remindText}>時にリマインド配信</p>
        </div>
      </div>
      <div className={Style.btnWrap}>
        <SubmitBtn btnText="登録する" handleClick={onCreateHabitList}/>
        <CancelBtn btnText="キャンセル" handleClick={changeModalStatus}/>
      </div>
    </div>
  );
}

export default CreateHabitListForm;
