import React from 'react';
import { FieldArray, Formik , Field } from 'formik';
import { initialDayOfWeekProps } from '../../../store/index';
import Style from './style.module.scss';

const HabitListForm = () => {
  const hours = Array.from(new Array(24)).map((v,i) => i)
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
          <div>
            <h2 className={Style.title}>習慣化したい行動</h2>
            <input 
              name="habitName"
              value={props.values.habitName}
              onChange={props.handleChange}
            />
          </div>
          <div>
            <h2 className={Style.title}>行動するタイミング</h2>
            <input 
              name="trigger"
              value={props.values.trigger}
              onChange={props.handleChange}
            />
          </div>
          <div className={Style.section}>
            <h2 className={Style.title}>行動する曜日</h2>
            <FieldArray
              name="dayOfWeekLists"
              render={arrayHelpers => (
                <div className={Style.dayOfWeek__wrap}>
                  {props.values.dayOfWeekLists.map((list,index)=>{
                    return (
                      <div
                        onClick={()=> list.selected = !list.selected }
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
            <Field as="select" name="remindHour">
              {
                hours.map((hour,index)=>{
                  return(
                    <option value={hour}>{hour}</option>
                  )
                })
              }
            </Field>
            <Field as="select" name="remindMin">
              <option value="00">00</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </Field>
          </div>
        </form>
      )}
    />
  )
}

export default HabitListForm
