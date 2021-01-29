import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Style from './HabitListDetail.module.scss';
import { HabitList } from '../../../store/index';
import { AuthContext } from '../../../store/Auth';
import { gethabitListDetail } from '../../../apis/FirestoreHabits'
import Header from '../../Organisms/Header';
import Layout from '../../templates/Layout';

type RouteParams = {
  id: string;
}

const HabitListDetail = () => {
  const { AuthState } = useContext(AuthContext)
  const [habitList, setHabitList] = useState<HabitList>()
  const {id} = useParams<RouteParams>();
  const getHabitList = () => {
    gethabitListDetail(AuthState.user.uid, id).then((result)=>{
      setHabitList(result)
    })
  }
  useEffect(() => {
    getHabitList()
  }, [])
  return (
    <div>
      <Header title="習慣リスト詳細"/>
      <Layout>
        <h2 className={Style.title}>習慣リスト設定</h2>
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
        </div>
        <h2 className={Style.title}>継続レポート</h2>
      </Layout>
    </div>
  )
}

export default HabitListDetail
