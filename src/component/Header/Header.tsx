import React, { FC } from 'react'
import Style from './Header.module.scss'

type Props = {
  title: string;
}

const Header:FC<Props> = (props) => {

  return (
    <div>
      <div className={Style.header}>
        {props.title}
      </div>
    </div>
  )
}

export default Header