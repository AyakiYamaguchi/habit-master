import React, { FC, useContext } from 'react';
import { FieldArray, Formik , Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { Store ,HabitList, ScheduledHabit ,ADD_SCHEDULED_HABIT, CREATE_HABIT_LIST, UPDATE_HABIT_LIST } from '../../../store/index';
import { AuthContext } from '../../../store/Auth'
import Style from './style.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn';
import { setHabitList , getLastHabitListId, addScheduledHabit, fetchScheduledHabit, getHabitListDetail } from '../../../apis/FirestoreHabits';
import * as yup from 'yup';

type Props = {
  handleCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
  habitList: HabitList;
}

const HabitListForm:FC<Props> = ({ handleCancel, habitList }) => {
  const hours = [...Array(24)].map((_, i) => i)
  const { setGlobalState } = useContext(Store)
  const { AuthState } = useContext(AuthContext)
  const history = useHistory()
  // ログインユーザーの取得
  const user = AuthState.user
  // 新規習慣リストの場合に、習慣予定リストにも新規登録する処理
  const addHabitSchedule = (userId: string, habitListId: string, habitList: HabitList) => {
    // 新規習慣リストの場合
    if(habitListId === ''){
      setGlobalState({type: CREATE_HABIT_LIST, payload: {habitList: habitList}})
      getLastHabitListId(user.uid).then((lastHabitListId)=>{
        const today = new Date()
        addScheduledHabit(userId,lastHabitListId,today).then((result)=>{
          fetchScheduledHabit(userId,result.id).then((result)=>{
            const scheduledHabit = Object.assign({id: result.id}, result.data())  as ScheduledHabit
            setGlobalState({ type: ADD_SCHEDULED_HABIT, payload: {scheduledHabit: scheduledHabit}})
            history.push('/habitlists')
          })
        }).catch((error)=>{
          console.log(error)
        })
      })
    // 既存リストの場合
    }else{
      getHabitListDetail(userId, habitListId).then((result)=>{
        setGlobalState({ type: UPDATE_HABIT_LIST, payload: { habitlist: result } })
        history.push('/habitlists/'+ habitListId)
      })
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
      initialValues={habitList}
      validationSchema={validation}
      onSubmit={values =>
        setHabitList(user.uid ,values.id ,values).then(()=>{
          addHabitSchedule(user.uid,values.id,values)
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
                <Field as="select" name="remindMinutes" className={Style.remindInput}>
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
