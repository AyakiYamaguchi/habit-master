import React, {FC,useState,useContext,useEffect,useCallback} from 'react';
import Style from './CreateHabitList.module.scss'
import { CHANGE_MODAL_STATUS, CREATE_HABIT_LIST, Store } from '../../../store/index';
import HabitListForm from '../../Organisms/HabitListForm'

const CreateHabitList = () => {
  const handleCancel = () => {
    console.log('cancel')
  }
  return (
    <div>
      <HabitListForm handleCancel={handleCancel}/>
    </div>
  )
}

export default CreateHabitList
