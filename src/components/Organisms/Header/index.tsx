import React, { FC } from 'react'
import Style from './Header.module.scss'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


type Props = {
  title: string;
  hideBackBtn?: boolean; 
}

const Header:FC<Props> = (props) => {
  const history = useHistory()
  return (
    <div className={Style.header__wrap}>
      <div className={Style.header__title}>
        {props.title}
      </div>
      { !props.hideBackBtn &&
        <div className={Style.header__backBtn} onClick={()=> history.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} className={Style.arrowIcon}/>
        </div>
      }
    </div>
  )
}

export default Header