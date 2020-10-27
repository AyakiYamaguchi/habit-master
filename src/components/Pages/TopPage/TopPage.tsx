import React , { FC } from 'react'
import Style from './TopPage.module.scss'
import Logo from '../../../images/logo.png'

const TopPage:FC = () => {
  return(
    <div className={Style.wrapper}>
      <div className={Style.background}>
        <h1 className={Style.service_logo}><img src={Logo} className={Style.logo_img}/></h1>
        <h2 className={Style.top_message}>JUST DO IT.</h2>
        <div>
          <a className={Style.signup_btn}>メールアドレスで登録</a>
          <p className={Style.btn_between}>or</p>
          <a className={Style.signup_btn}>Facebookアカウントで登録</a>
          <a className={Style.login_text}>ログインはこちら</a>
        </div>
      </div>
    </div>
  )
}

export default TopPage