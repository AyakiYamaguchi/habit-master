import React, {FC,useState,useContext,useEffect,useCallback} from 'react';
import Style from './CreateHabitList.module.scss'
import { useHistory } from 'react-router-dom';
import { HabitList, initialDayOfWeekProps } from '../../../store/index';
import HabitListForm from '../../Organisms/HabitListForm'
import Layout from '../../templates/Layout';
import Header from '../../Organisms/Header'

const CreateHabitList = () => {
  const history = useHistory()
  const handleCancel = () => {
    history.push('/habitlists')
  }
  const initialHabitList:HabitList = {
    id: '',
    habitName: '',
    trigger: '',
    weeklySch: initialDayOfWeekProps,
    remindHour: '9',
    remindMinutes: '00',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div>
      <Header title="習慣リストの新規作成"/>
      <Layout>
        <div className={Style.formWrap}>
          <HabitListForm handleCancel={handleCancel} habitList={initialHabitList}/>
        </div>
      </Layout>
    </div>
  )
}

export default CreateHabitList
