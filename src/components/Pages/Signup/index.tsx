import React from 'react'
import Style from './Signup.module.scss';
import Logo from '../../../images/logo_blue.png';
import { useFormik, Formik , ErrorMessage } from 'formik';
import * as yup from 'yup';
import SubmitBtn from '../../Atoms/SubmitBtn';
import Layout from '../../templates/Layout';

const Signup = () => {

  const ClickFacebookLogin = () => {
    console.log('login')
  }
  const validation = yup.object().shape({
    email: yup.string()
      .email('形式がemailではありません')
      .required('メールアドレスがが入力されていません'),
    password: yup.string()
      .min(8, 'パスワードは最低8文字です')
      .matches(/^[a-zA-Z0-9]+$/, { message: 'パスワードは英数字のみ利用可能です' })
      .matches(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {message: 'パスワードは半角英数字8文字以上で設定してください'})
      .required('パスワードは必須です'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'パスワードと確認用パスワードが一致しません。')
      .required('確認用パスワードは必須です'),
  })
  return (
    <Formik 
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validation}
      onSubmit={values => {
        console.log(values)
      }}

      render={(props) => (
        <div className={Style.container}>
          <Layout>
            <h1 className={Style.logo_wrap}>
              <img src={Logo} className={Style.logo_img}/>
            </h1>
            
            <form onSubmit={props.handleSubmit} className={Style.form__wrap}>
              <div className={Style.form__section}>
                <label htmlFor="email" className={Style.form__label}>メールアドレス</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={props.handleChange}
                  value={props.values.email}
                  className={Style.form__input}
                />
                <ErrorMessage name="email" component="div" className={Style.form__error_message}/>
              </div>

              <div className={Style.form__section}>
                <label htmlFor="password" className={Style.form__label}>パスワード（半角英数字8文字以上）</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={props.handleChange}
                  value={props.values.password}
                  className={Style.form__input}
                />
                <ErrorMessage name="password" component="div" className={Style.form__error_message}/>
              </div>
              
              <div className={Style.form__section}>
                <label htmlFor="password" className={Style.form__label}>パスワード（確認用）</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={props.handleChange}
                  value={props.values.confirmPassword}
                  className={Style.form__input}
                />
                <ErrorMessage name="confirmPassword" component="div" className={Style.form__error_message}/>
              </div>
              
              <div className={Style.submitBtn_wrap}>
                <SubmitBtn btnText="新規登録"/>
              </div>
            </form>

            <div>
              <p className={Style.btn_between}>or</p>
              <button className={Style.signup_btn} onClick={ClickFacebookLogin}>
                Facebookアカウントで登録
              </button>
            </div>
          </Layout>
        </div>
      )}
    />
  )
}

export default Signup
