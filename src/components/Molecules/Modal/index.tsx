import React , { FC } from 'react';
import Style from './Modal.module.scss';

type Props = {
  children: React.ReactNode;
}
const Modal:FC<Props> = ({children}) => {
  const isOpen = false
  return(
    <div className={`${Style.ModalWrap} ${isOpen ? Style.openModal : Style.closeModal }`}>
      { children }
    </div>
  )
}

export default Modal