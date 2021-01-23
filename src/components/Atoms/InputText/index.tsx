import React, { FC } from 'react';
import Style from './InputText.module.scss';
import ErrorMessage from '../ErrorMessage'

type Props = {
  placeholder?: string;
  state: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const InputText:FC<Props> = ({placeholder , state , handleChange, errorMessage}) => {
  return (
    <div>
      { errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
      <input
        className={Style.inputArea}
        type="text"
        placeholder={placeholder}
        value={state}
        onChange={handleChange}
      ></input>
    </div>
  )
}

export default InputText;
