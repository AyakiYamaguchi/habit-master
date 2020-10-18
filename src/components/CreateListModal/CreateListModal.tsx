import React, { FC, useContext, useState } from 'react'
import { Store } from '../../store/index'
import Style from './CreateListModal.module.scss'

const CreateListModal:FC = () => {
  const { globalState , setGlobalState } = useContext(Store)
  const [listTitle, setListTitle] = useState('')
  const [showing, setShowing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  let isError = false
  const updateList = (title: string) => {
    setGlobalState({type: 'CREATE_HABIT_LIST', payload: {title: title}})
    setListTitle('')
    setShowing(false)
  }
  const validate = (inputValue: string) => {
    setListTitle(inputValue)

    if (inputValue === ''){
      setErrorMessage('習慣が入力されていません')
      isError = true
    } else if (inputValue.length > 30) {
      setErrorMessage('30文字以内で入力してください')
      isError = true
    } else {
      isError = false
    }

  }
  return(
    <div>
      { !showing &&
        <div
          className={Style.toggle_btn}
          onClick={()=>setShowing(true)}
        >+</div>
      }
      {
        // showing &&
          <div className={`${Style.wrapper} ${showing ? Style.open_modal : Style.close_modal}`}>
            <h2 className={Style.title}>新しい習慣を登録する</h2>
            { isError && <p className="error_message">{errorMessage}</p>}
            <input
              className={`${Style.input_area} ${isError && Style.error_input_area}`}
              type="text"
              placeholder="例：読書（20ページ）"
              value={listTitle}
              onChange={(e) => validate(e.target.value)}
            ></input>
            <div className={Style.btn_wrapper}>
              <button className={Style.submit_btn} onClick={() => updateList(listTitle)}>登録する</button>
              <button onClick={()=>setShowing(false)} className={Style.cancel_btn}>キャンセル</button>
            </div>
          </div>
      }
    </div>
  )
}

export default CreateListModal