import React, { FC, useContext , useEffect } from 'react'
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { getCurrentUser } from './apis/FacebookAuth'
import { AuthContext } from './store/Auth'
import { SET_USER } from './store/Auth'

const PrivateRoute:FC = ({children}) => {
  const { AuthState, setAuthState } = useContext(AuthContext)
  let currentUser = AuthState.user
  const LoginCheck = async() => {
    await getCurrentUser().then((result)=> {
      if(result){
        const user = {
          uid: result.uid,
          userName: result.displayName
        }
        setAuthState({type: SET_USER, payload: {user: user}})
      }
    })
  }
  useEffect(() => {
    LoginCheck()
  },[AuthState.user])
  return (
    <>
      { !currentUser ?
        <Router>
          <Redirect to='/login' />
        </Router>
        :
        <div>
          { children }
        </div>
      }
    </>
  )
}

export default PrivateRoute
