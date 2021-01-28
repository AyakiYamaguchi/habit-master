import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HabitList } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { gethabitListDetail } from '../../../apis/FirestoreHabits'
import Header from '../../Organisms/Header';
import Layout from '../../templates/Layout';

type RouteParams = {
  id: string;
}

const HabitListDetail = () => {
  const { AuthState } = useContext(AuthContext)
  const [habitList, setHabitList] = useState<HabitList>()
  const {id} = useParams<RouteParams>();
  const getHabitList = () => {
    gethabitListDetail(AuthState.user.uid, id).then((result)=>{
      setHabitList(result)
    })
  }
  useEffect(() => {
    getHabitList()
  }, [])
  return (
    <div>
      <Header title="習慣リスト詳細"/>
      <Layout>
        <div>{habitList && habitList.habitName}</div>
      </Layout>
    </div>
  )
}

export default HabitListDetail
