import React, {FC,useState,useContext,useEffect,useCallback} from 'react';
import Style from './CreateHabitList.module.scss'
import { CHANGE_MODAL_STATUS, CREATE_HABIT_LIST, Store } from '../../../store/index';
import HabitListForm from '../../Organisms/HabitListForm'
import Layout from '../../templates/Layout';

const CreateHabitList = () => {
  const handleCancel = () => {
    console.log('cancel')
  }
  return (
    <div>
      <Layout>
        <HabitListForm handleCancel={handleCancel}/>
      </Layout>
    </div>
  )
}

export default CreateHabitList
