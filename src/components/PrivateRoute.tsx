import React, { FC, useContext , useEffect , useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../apis/FirebaseConf';
import { AuthContext } from '../store/Auth';
import { SET_USER } from '../store/Auth';
import { Store } from '../store/index';
import { SET_HABIT_LISTS, SET_SCHEDULED_HABITS } from '../store/index';
import { fetchHabitList, addScheduledHabit, fetchScheduledHabit } from '../apis/FirestoreHabits';
import { getUserIdLists } from '../apis/FirestoreUsers';
import Loading from './templates/Loading';

const PrivateRoute:FC = () => {
  const { AuthState, setAuthState } = useContext(AuthContext)
  const { globalState , setGlobalState } = useContext(Store)
  const [loading, setLoading] = useState(true)
  let currentUserId = AuthState.user.uid
  const LoginCheck = () => {
    firebase.auth().onAuthStateChanged(function(result) {
      if (result) {
        const user = {
          uid: result.uid,
          userName: result.displayName
        }
        // ユーザー情報を保存
        setAuthState({type: SET_USER, payload: {user: user}})

        // 習慣リストマスタを取得
        fetchHabitList(user.uid).then((result)=>{
          console.log(result)
          setGlobalState({type: SET_HABIT_LISTS, payload: {habitLists: result}})
        })
        // 
        fetchScheduledHabit(user.uid).then((result)=>{
          console.log(result)
          setGlobalState({ type: SET_SCHEDULED_HABITS , payload: {scheduledHabits: result}})
        })
      }
      // 全ユーザーのID一覧を取得
      getUserIdLists().then((users)=>{
        users.map((id,index)=>{
          // ユーザーごとの習慣リストマスタを取得
          const userId = id
          fetchHabitList(userId).then((habitLists)=>{
            if(habitLists.length > 0){
              // 習慣リストマスタから習慣実行予定リストを作成
              habitLists.map((list,index)=>{
                // addScheduledHabit(userId, list.id).then(()=>{
                //   console.log('リストの保存に成功しました')
                // }).catch((error)=>{
                //   console.log(error)
                // })
                console.log(list)
              })
            }
          })
        })
      })
      
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
