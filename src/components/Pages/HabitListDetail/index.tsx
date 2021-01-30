import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Style from './HabitListDetail.module.scss';
import { HabitList, ScheduledHabit } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { Store } from '../../../store/index';
import { getHabitListDetail } from '../../../apis/FirestoreHabits';
import Header from '../../Organisms/Header';
import Layout from '../../templates/Layout';
import Calendar from '../../Organisms/Calendar';
import TitleText from '../../Atoms/TitleText';
import EditBtn from '../../Atoms/EditBtn';

type RouteParams = {
  id: string;
}

const HabitListDetail = () => {
  const { AuthState } = useContext(AuthContext)
  const { globalState } = useContext(Store);
  const [habitList, setHabitList] = useState<HabitList>()
  const [scheduledHabits, setScheduledHabits] = useState<ScheduledHabit[]>()
  const {id} = useParams<RouteParams>();
  const getHabitList = () => {
    getHabitListDetail(AuthState.user.uid, id).then((result)=>{
      setHabitList(result)
      const scheduledHabits = globalState.scheduledHabits.filter((list)=>{
        return list.habitListId === id
      })
      setScheduledHabits(scheduledHabits)
    })
  }
  
  useEffect(() => {
    getHabitList()
  }, [])
  return (
    <div>
      <Header title="習慣リスト詳細"/>
      <Layout>
        <TitleText title={'継続レポート'}/>
        {scheduledHabits && 
          <div className={Style.calendarWrap}>
            <Calendar scheduledHabits={scheduledHabits}/>
          </div>
        }
        <TitleText title={'習慣リストの設定'}/>
        <div className={Style.settingArea__wrap}>
          {habitList && 
            <div>
              <div className={Style.settingArea__list_wrap}>
                <h3 className={Style.settingArea__title}>習慣化したい行動</h3>
                <p className={Style.settingArea__item}>{habitList.habitName}</p>
              </div>
              <div className={Style.settingArea__list_wrap}>
                <h3 className={Style.settingArea__title}>行動するタイミング</h3>
                <p className={Style.settingArea__item}>{habitList.trigger}</p>
              </div>
              <div className={Style.settingArea__list_wrap}>
                <h3 className={Style.settingArea__title}>行動する曜日</h3>
                <ul className={Style.settingArea__dayOfWeek_wrap}>
                  {habitList.weeklySch.map((list)=>{
                    return (
                      <li className={
                        `${Style.settingArea__dayOfWeek_item}
                        ${list.selected && Style.settingArea__dayOfWeek_item_selected}`
                        }
                      >{list.dayOfWeek}</li>
                    )
                  })}
                </ul>
              </div>
              <div className={Style.settingArea__list_wrap}>
                <h3 className={Style.settingArea__title}>リマインダー</h3>
                <p className={Style.settingArea__item}>{habitList.remindHour + ':' + habitList.remindMinutes} 時にリマインド通知</p>
              </div>
            </div>
          }
          <div className={Style.settingArea__editBtn_wrap}>
            <Link to={'/habitlists/'+id+'/edit'}>
              <EditBtn btnText={'設定を編集する'}/>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default HabitListDetail
