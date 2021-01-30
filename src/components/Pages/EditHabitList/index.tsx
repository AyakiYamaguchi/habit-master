import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Style from './EditHabitList.module.scss';
import { AuthContext } from '../../../store/Auth';
import { HabitList } from '../../../store/index';
import {getHabitListDetail} from '../../../apis/FirestoreHabits';
import HabitListForm from '../../Organisms/HabitListForm';
import Header from '../../Organisms/Header';
import Layout from '../../templates/Layout';
type RouteParams = {
  id: string;
}

const EditHabitList = () => {
  const { AuthState } = useContext(AuthContext)
  const [habitList, setHabitList] = useState<HabitList>()
  const {id} = useParams<RouteParams>()
  const history = useHistory()

  const handleCancel = () => {
    history.push('/habitlists/'+ id)
  }
  const getHabitList = () => {
    getHabitListDetail(AuthState.user.uid, id).then((result)=>{
      setHabitList(result)
    })
  }
  useEffect(() => {
    getHabitList()
  }, [])
  return (
    <div>
      <Header title="習慣リストの編集"/>
      <Layout>
        { habitList &&
          <div className={Style.formWrap}>
            <HabitListForm handleCancel={handleCancel} habitList={habitList}/>
          </div>
        }
      </Layout>
    </div>
  )
}

export default EditHabitList
