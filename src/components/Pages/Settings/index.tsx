import React, { FC , useContext } from 'react';
import { AuthContext} from '../../../store/Auth';
import { DELETE_USER } from '../../../store/Auth';
import Header from '../../Organisms/Header';
import Footer from '../../Organisms/Footer';
import { SignOut } from '../../../apis/FacebookAuth';

const Settings:FC = () => {
  const {AuthState, setAuthState} = useContext(AuthContext)
  const ClickSignOut = async() => {
    await SignOut().then((result)=> {
      console.log(result)
      console.log('ログアウト成功')
      setAuthState({type: DELETE_USER})
    }).catch((error)=>{
      alert(error)
    })
  }
  return (
    <div>
      <Header title="各種設定"/>
      <p>{`アカウント名：${AuthState.user?.userName}`}</p>
      <p>{`uid：${AuthState.user?.uid}`}</p>
      <button onClick={ClickSignOut}>サインアウト</button>
      <Footer selectedMenu="settings"/>
    </div>
  )
}

export default Settings
