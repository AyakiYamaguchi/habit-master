import React, { useContext, useState } from 'react'
import Style from '../Signup/Signup.module.scss';
import Logo from '../../../images/logo_blue.png';
import { Formik , ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import SubmitBtn from '../../Atoms/SubmitBtn';
import Layout from '../../templates/Layout';
import { SignInWithEmailAndPassword } from '../../../apis/FirebaseAuth';
import { AuthContext, SET_USER, User } from '../../../store/Auth';

const SingIn = () => {
  const { setAuthState } = useContext(AuthContext)
  const [authError, setAuthError] = useState('')
  const history = useHistory()

  const setUser = (user: User) => {
    setAuthState({type: SET_USER, payload: {user: user}})
    history.push('/habitlists')
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
  })

  const handleAuthError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/wrong-password":
        setAuthError('メールアドレスまたはパスワードに誤りがあります')
        break;
      default:
        setAuthError('エラーが発生しました。しばらくしてから再度お試しください')
        console.log(errorCode)
    }
  }

  return (
    <Formik 
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validation}
      onSubmit={values => {
        SignInWithEmailAndPassword(values.email, values.password)
          .then((result)=>{
            // error codeが存在する場合はエラー判定
            if(result.code){
              handleAuthError(result.code)
            }else{
              setUser(result)
            }
          })
          .catch((error)=>{
            alert(error)
          })
      }}

      render={(props) => (
        <div className={Style.container}>
          <Layout>
            <h1 className={Style.logo_wrap}>
              <img src={Logo} className={Style.logo_img}/>
            </h1>

            { authError && <div className={Style.form__error_message}>{authError}</div> }

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
              
              <div className={Style.submitBtn_wrap}>
                <SubmitBtn btnText="ログイン"/>
              </div>
            </form>
          </Layout>
        </div>
      )}
    />
  )
}

export default SingIn
