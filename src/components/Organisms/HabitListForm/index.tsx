import React, { FC, useContext } from 'react';
import { FieldArray, Formik , Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { initialDayOfWeekProps } from '../../../store/index';
import { Store } from '../../../store/index';
import { AuthContext } from '../../../store/Auth'
import Style from './style.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';
import { setHabitList , getLastHabitListId, addScheduledHabit } from '../../../apis/FirestoreHabits';
import * as yup from 'yup';

type Props = {
  handleCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const HabitListForm:FC<Props> = ({ handleCancel }) => {
  const hours = [...Array(24)].map((_, i) => i)
  const { globalState , setGlobalState } = useContext(Store)
  const { AuthState , setAuthState } = useContext(AuthContext)
  const history = useHistory()
  // ログインユーザーの取得
  const user = AuthState.user
  // 新規習慣リストの場合に、習慣予定リストにも新規登録する処理
  const addHabitSchedule = (userId: string, habitListId: string) => {
    // 新規習慣リストの場合
    if(habitListId === ''){
      getLastHabitListId(user.uid).then((lastHabitListId)=>{
        const today = new Date()
        addScheduledHabit(userId,lastHabitListId,today).then(()=>{
          history.push('/list')
        }).catch((error)=>{
          console.log(error)
        })
      })
    // 既存リストの場合
    }else{
      history.push('/list')
    }
  }
  // バリデーション設定
  const validation = yup.object().shape({
    habitName: yup.string()
      .required('習慣化したい行動が入力されていません'),
    trigger: yup.string()
      .required('行動のタイミングが入力されていません')
  });
  return (
    <Formik
      initialValues={{
        id: '',
        habitName: '',
        trigger: '',
        weeklySch: initialDayOfWeekProps,
        remindHour: 0,
        remindMinutes: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }}
      validationSchema={validation}
      onSubmit={values =>
        setHabitList(user.uid ,values.id ,values).then(()=>{
          addHabitSchedule(user.uid,values.id)
        }).catch((error)=>{
          console.log(error)
        })
      }
      render={(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className={Style.section}>
            <h2 className={Style.title}>習慣化したい行動</h2>
            <ErrorMessage name="habitName" component="div" className={Style.errorMessage}/>
            <input 
              name="habitName"
              placeholder="例：本を1ページ読む"
              value={props.values.habitName}
              onChange={props.handleChange}
              className={`${Style.inputArea} ${props.errors.habitName && Style.errorInputArea}`}
            />
          </div>
          <div className={Style.section}>
            <h2 className={Style.title}>行動するタイミング</h2>
            <ErrorMessage name="trigger" component="div" className={Style.errorMessage}/>
            <input 
              name="trigger"
              placeholder="例：朝食を食べたあと"
              value={props.values.trigger}
              onChange={props.handleChange}
              className={`${Style.inputArea} ${props.errors.trigger && Style.errorInputArea}`}
            />
          </div>
          <div className={Style.section}>
            <h2 className={Style.title}>行動する曜日</h2>
            <FieldArray
              name="dayOfWeekLists"
              render={() => (
                <div className={Style.dayOfWeek__wrap}>
                  {props.values.weeklySch.map((list,index)=>{
                    return (
                      <div
                        onClick={()=> {
                          const updatedDayOfWeekLists = props.values.weeklySch.slice();
                          updatedDayOfWeekLists[index].selected = !updatedDayOfWeekLists[index].selected;
                          props.setFieldValue( "dayOfWeekLists", updatedDayOfWeekLists)}
                        }
                        className={`${Style.dayOfWeek__item} ${list.selected && Style.selected}`}
                        >
                        {list.dayOfWeek}
                      </div>
                    )
                  })}
                </div>
              )}
            />
          </div>
          <div className={Style.section}>
            <h2 className={Style.title}>リマインダー</h2>
            <div className={Style.remindWrap}>
              <div className={Style.remindItemWrap}>
                <Field as="select" name="remindHour" className={Style.remindInput}>
                  {
                    hours.map((hour,index)=>{
                      return(
                        <option value={hour}>{hour}</option>
                      )
                    })
                  }
                </Field>
                <p className={Style.remindText}>時</p>
              </div>
              <div className={Style.remindItemWrap}>
                <Field as="select" name="remindMin" className={Style.remindInput}>
                  <option value="00">00</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </Field>
                <p className={Style.remindText}>分にリマインドする</p>
              </div>
            </div>
          </div>
          <div className={Style.btnWrap}>
            <SubmitBtn btnText="登録する"/>
            <CancelBtn btnText="キャンセル" handleClick={handleCancel}/>
          </div>
        </form>
      )}
    />
  )
}

export default HabitListForm
