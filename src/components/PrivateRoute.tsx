import React, { FC, useContext , useEffect , useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../apis/FirebaseConf';
import { AuthContext } from '../store/Auth';
import { SET_USER } from '../store/Auth';
import { Store } from '../store/index';
import { SET_HABIT_LISTS, SET_SCHEDULED_HABITS } from '../store/index';
import { fetchHabitList, fetchScheduledHabits } from '../apis/FirestoreHabits';
import Loading from './templates/Loading';

const PrivateRoute:FC = () => {
  const { AuthState, setAuthState } = useContext(AuthContext)
  const { globalState , setGlobalState } = useContext(Store)
  const [loading, setLoading] = useState(true)
  let currentUserId = AuthState.user.uid
  const LoginCheck = () => {
    firebase.auth().onAuthStateChanged(function(result) {
      console.log(result?.providerData[0]?.providerId)
      if (result) {
        const user = {
          uid: result.uid,
          displayName: result.displayName
        }
        // ユーザー情報を保存
        setAuthState({type: SET_USER, payload: {user: user}})
        // 習慣リストマスタを取得
        fetchHabitList(user.uid).then((result)=>{
          console.log(result)
          setGlobalState({type: SET_HABIT_LISTS, payload: {habitLists: result}})
        })
        // 
        fetchScheduledHabits(user.uid).then((result)=>{
          console.log(result)
          setGlobalState({ type: SET_SCHEDULED_HABITS , payload: {scheduledHabits: result}})
        })
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    LoginCheck()
  },[])

  return (
    <>
      { !loading ?
        ( currentUserId === "" ?
          <Redirect to='/login' /> : <></>
        ) : (
          <div>
            <Loading />
          </div>
        )
      }
    </>
  )
}

export default PrivateRoute
