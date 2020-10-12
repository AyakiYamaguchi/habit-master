import React , { FC } from 'react'
import Style from './Layout.module.scss'

const Layout:FC = (children) => {
  return(
    <div className={Style.wrapper}>
      {children}
    </div>
  )
}

export default Layout