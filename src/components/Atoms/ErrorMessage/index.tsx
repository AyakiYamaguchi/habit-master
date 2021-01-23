import React, { FC } from 'react'
import Style from './ErrorMessage.module.scss'

type Props = {
  errorMessage: string;
}
const ErrorMessage:FC<Props> = ({errorMessage}) => {
  return (
    <div className={Style.message}>
      {errorMessage}
    </div>
  )
}

export default ErrorMessage
