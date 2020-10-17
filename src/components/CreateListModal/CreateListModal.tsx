import React, { FC, useContext, useState } from 'react'
import { Store } from '../../store/index'
import Style from './CreateListModal.module.scss'

const CreateListModal:FC = () => {
  const { globalState , setGlobalState } = useContext(Store)
  const [listTitle, setListTitle] = useState('')
  const [showing, setShowing] = useState(false)
  const updateList = (title: string) => {
    setGlobalState({type: 'CREATE_HABIT_LIST', payload: {title: title}})
    setListTitle('')
    setShowing(false)
  }
  return(
    <div>
      { !showing &&
        <div
          className={Style.toggle_btn}
          onClick={() => setShowing(true)}
        >+</div>
      }
      {
        showing &&
          <div className={Style.wrapper}>
            <h2 className={Style.title}>新しい習慣を登録する</h2>
            <input
              className={Style.input_area}
              type="text"
              placeholder="例：読書（20ページ）"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            ></input>
            <div className={Style.btn_wrapper}>
              <button className={Style.submit_btn} onClick={() => updateList(listTitle)}>登録する</button>
              <button className={Style.cancel_btn} onClick={() => setShowing(false)}>キャンセル</button>
            </div>
          </div>
      }
    </div>
  )
}

export default CreateListModal