import React, { FC } from 'react';
import { FieldArray, Formik , Field } from 'formik';
import { initialDayOfWeekProps } from '../../../store/index';
import Style from './style.module.scss';
import SubmitBtn from '../../Atoms/SubmitBtn/SubmitBtn';
import CancelBtn from '../../Atoms/CancelBtn/CancelBtn';

type Props = {
  handleCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void;
}

const HabitListForm:FC<Props> = ({ handleCancel }) => {
  const hours = Array.from(new Array(24)).map((v,i) => i)
  // const onClickDayOfWeek = (index:number) => {
  //   const updatedDayOfWeekLists = habitList.dayOfWeekLists.slice();
  //   updatedDayOfWeekLists[index].selected = !updatedDayOfWeekLists[index].selected;
  //   setHabitList({ ...habitList,dayOfWeekLists: updatedDayOfWeekLists });
  // }
  return (
    <Formik
      initialValues={{
        habitName: '',
        trigger: '',
        dayOfWeekLists: initialDayOfWeekProps,
        remindTime: 0,
      }}
      onSubmit={values => console.log(values)}
      render={(props) => (
        <form onSubmit={props.handleSubmit}>
          <div className={Style.section}>
            <h2 className={Style.title}>習慣化したい行動</h2>
            <input 
              name="habitName"
              placeholder="例：本を1ページ読む"
              value={props.values.habitName}
              onChange={props.handleChange}
              className={Style.inputArea}
            />
          </div>
          <div className={Style.section}>
            <h2 className={Style.title}>行動するタイミング</h2>
            <input 
              name="trigger"
              placeholder="例：朝食を食べたあと"
              value={props.values.trigger}
              onChange={props.handleChange}
              className={Style.inputArea}
            />
          </div>
          <div className={Style.section}>
            <h2 className={Style.title}>行動する曜日</h2>
            <FieldArray
              name="dayOfWeekLists"
              render={() => (
                <div className={Style.dayOfWeek__wrap}>
                  {props.values.dayOfWeekLists.map((list,index)=>{
                    return (
                      <div
                        onClick={()=> {
                          const updatedDayOfWeekLists = props.values.dayOfWeekLists.slice();
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
          <SubmitBtn btnText="登録する"/>
          <CancelBtn btnText="キャンセル" handleClick={handleCancel}/>
        </form>
      )}
    />
  )
}

export default HabitListForm
