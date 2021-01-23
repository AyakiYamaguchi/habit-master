import React , { FC, useContext } from 'react';
import Style from './Modal.module.scss';
import {Store} from '../../../store/index';

type Props = {
  children: React.ReactNode;
}
const Modal:FC<Props> = ({children}) => {
  const { globalState, setGlobalState } = useContext(Store)
  const isOpen = globalState.isModalOpen
  return(
    <div className={`${Style.ModalWrap} ${isOpen ? Style.openModal : Style.closeModal }`}>
      { children }
    </div>
  )
}

export default Modal