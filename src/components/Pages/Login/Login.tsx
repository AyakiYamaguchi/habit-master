import React , { FC , useContext, useEffect } from 'react';
import { BrowserRouter as Router , Redirect, useHistory } from 'react-router-dom';
import Style from './Login.module.scss';
import Logo from '../../../images/logo.png';
import { FacebookLogin } from '../../../apis/FacebookAuth';
import { AuthContext } from '../../../store/Auth';
import { SET_USER } from '../../../store/Auth';


const Login:FC = () => {
  const {AuthState, setAuthState} = useContext(AuthContext)
  // React Router の history API が React Hooks の一種として使える
  const history = useHistory()
  let currentUser
  const ClickFacebookLogin = async() => {
    await FacebookLogin().then((result)=>{
      const user = {
        uid: result.uid,
        userName: result.displayName
      }
      setAuthState({ type: SET_USER , payload: { user: user }})
      currentUser = user
      history.push('/list')
    }).catch((error)=> {
      console.log(error)
    })
  };
  useEffect(() => {
    currentUser = AuthState.user
  }, [])
  return(
    <>
    {
      !currentUser ? (
        <div className={Style.wrapper}>
          <div className={Style.background}>
            <h1 className={Style.service_logo}><img src={Logo} className={Style.logo_img}/></h1>
            <h2 className={Style.top_message}>JUST DO IT.</h2>
            <div>
              <a className={Style.signup_btn}>メールアドレスで登録</a>
              <p className={Style.btn_between}>or</p>
              <a className={Style.signup_btn} onClick={ClickFacebookLogin}>Facebookアカウントで登録</a>
              <a className={Style.login_text}>ログインはこちら</a>
            </div>
          </div>
        </div>
      ) : (
        <Router>
          <Redirect to='/list'/>
        </Router>
      )
    }
    </>
  )
}

export default Login