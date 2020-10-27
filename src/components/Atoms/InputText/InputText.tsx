import React, { FC } from 'react';
import Style from './InputText.module.scss';

type Props = {
  placeholder?: string;
  state: string;
  handleChange?: Function;
}

const InputText:FC<Props> = ({placeholder , state , handleChange}) => {
  return (
    <div>
      <input
        className={Style.inputArea}
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={(e) => handleChange}
      ></input>
    </div>
  )
}

export default InputText;
