import React, { FC }from 'react';
import Style from './TitleText.module.scss';

type Props = {
  title: string;
}

const TitleText:FC<Props> = ({ title }) => {
  return (
    <div className={Style.titleWrap}>
      <h2 className={Style.titleText}>{title}</h2>
    </div>
  )
}

export default TitleText
