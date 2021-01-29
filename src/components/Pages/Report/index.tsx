import React, { useContext } from 'react';
import Footer from '../../Organisms/Footer';
import Header from '../../Organisms/Header';
import { Store } from '../../../store/index';
import Style from './Report.module.scss';
import Calendar from '../../Organisms/Calendar';

const Report = () => {
  const { globalState, setGlobalState } = useContext(Store)
  const scheduledHabits = globalState.scheduledHabits;
  return (
    <div>
      <Header title={'レポート'}/>
        <div className={Style.calendarWrap}>
          <Calendar scheduledHabits={scheduledHabits}/>
        </div>
        <div className={Style.statusDescription__wrap}>
          <span className={Style.statusDescription__finishedCircle}></span>
          <p className={Style.statusDescription__text}>すべて完了</p>
          <span className={Style.statusDescription__unFinishedCircle}></span>
          <p className={Style.statusDescription__text}>一部完了</p>
        </div>
      <Footer selectedMenu={'report'}/>
    </div>)
}

export default Report