import React, { FC , useContext, useEffect, useState } from 'react';
import Style from './Settings.module.scss';
import firebase from '../../../apis/FirebaseConf';
import { AuthContext} from '../../../store/Auth';
import { DELETE_USER } from '../../../store/Auth';
import Header from '../../Organisms/Header';
import Footer from '../../Organisms/Footer';
import { SignOut } from '../../../apis/FirebaseAuth';
import Layout from '../../templates/Layout';
import TitleText from '../../Atoms/TitleText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DeleteBtn from '../../Atoms/DeleteBtn';

type User = {
  displayName: string | null;
  email: string | null;
  providerId: string | undefined;
}

const Settings:FC = () => {
  const { setAuthState } = useContext(AuthContext)
  const [ user, setUser ] = useState<User>()
  const getLoginInfo = () => {
    firebase.auth().onAuthStateChanged((result)=>{
      if (result) {
        const user = {
          displayName: result.displayName,
          email: result.email,
          providerId: result.providerData[0]?.providerId,
        }
        setUser(user)
      }
    })
  }
  const ClickSignOut = async() => {
    await SignOut().then((result)=> {
      console.log(result)
      console.log('ログアウト成功')
      setAuthState({type: DELETE_USER})
    }).catch((error)=>{
      alert(error)
    })
  }

  useEffect(() => {
    getLoginInfo()
  },[])
  return (
    <div>
      <Header title="各種設定" hideBackBtn={true}/>
      <Layout>
        <TitleText title="アカウント設定"/>
        { user && 
            <div className={Style.accountArea__wrap}>
              <div className={Style.accountArea__icon_wrap}>
                <FontAwesomeIcon icon={faUserCircle} className={Style.accountArea__accountIcon}/>
              </div>
              {
                user.providerId === 'facebook.com' &&
                  <div className={Style.accountArea__provider}>Facebookアカウントでログイン中</div>
              }
              <div className={Style.accountArea__item_wrap}>
                <div className={Style.accountArea__item_label}>アカウント名</div>
                <div className={Style.accountArea__item_data}>{user.displayName && user.displayName}</div>
              </div>
              <div className={Style.accountArea__item_wrap}>
                <div className={Style.accountArea__item_label}>メールアドレス</div>
                <div className={Style.accountArea__item_data}>{user.email}</div>
              </div>
              <div className={Style.deleteBtn_wrap}>
                <DeleteBtn btnText={'サインアウト'} handleClick={ClickSignOut}/>
              </div>
            </div>
        }
      </Layout>
      
      <Footer selectedMenu="settings"/>
    </div>
  )
}

export default Settings
