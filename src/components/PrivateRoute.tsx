import React, { FC, useContext , useEffect , useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../apis/FirebaseConf';
import { AuthContext } from '../store/Auth';
import { SET_USER } from '../store/Auth';
import { Store } from '../store/index';
import { SET_HABIT_LISTS } from '../store/index';
import { fetchHabitList } from '../apis/Firestore';
import Loading from './templates/Loading';

const PrivateRoute:FC = () => {
  const { AuthState, setAuthState } = useContext(AuthContext)
  const { globalState , setGlobalState } = useContext(Store)
  const [loading, setLoading] = useState(true)
  let currentUser = AuthState.user
  const LoginCheck = () => {
    firebase.auth().onAuthStateChanged(function(result) {
      if (result) {
        const user = {
          uid: result.uid,
          userName: result.displayName
        }
        setAuthState({type: SET_USER, payload: {user: user}})

        fetchHabitList(user.uid).then((result)=>{
          console.log(result)
        })
        currentUser = user
        console.log(user)
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
        (!currentUser ?
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
