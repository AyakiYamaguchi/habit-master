import React, { FC, useContext , useEffect , useState } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../apis/FacebookAuth'
import { AuthContext } from '../store/Auth'
import { SET_USER } from '../store/Auth'

const PrivateRoute:FC = () => {
  const { AuthState, setAuthState } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  let currentUser = AuthState.user
  const LoginCheck = async() => {
    console.log('実行されました')
    await getCurrentUser().then((result)=> {
      console.log(result)
      // if(result){
      //   const user = {
      //     uid: result.uid,
      //     userName: result.displayName
      //   }
      //   setAuthState({type: SET_USER, payload: {user: user}})
      //   currentUser = user
      // }
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
          <div>Now Loading</div>
        )
      }
    </>
  )
}

export default PrivateRoute
