import React, {FC,useState,useContext,useEffect,useCallback} from 'react';
import Style from './CreateHabitList.module.scss'
import { useHistory } from 'react-router-dom';
import { CHANGE_MODAL_STATUS, CREATE_HABIT_LIST, Store } from '../../../store/index';
import HabitListForm from '../../Organisms/HabitListForm'
import Layout from '../../templates/Layout';
import Header from '../../Organisms/Header'

const CreateHabitList = () => {
  const history = useHistory()
  const handleCancel = () => {
    history.push('/habitlists')
  }
  return (
    <div>
      <Header title="習慣リストの新規作成"/>
      <Layout>
        <div className={Style.formWrap}>
          <HabitListForm handleCancel={handleCancel}/>
        </div>
      </Layout>
    </div>
  )
}

export default CreateHabitList
