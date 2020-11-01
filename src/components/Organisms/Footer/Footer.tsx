import React, { FC } from 'react';
import Style from './Footer.module.scss'
import SelectedListIcon from '../../../images/selected_list_icon.png';
import UnselectedListIcon from '../../../images/unselected_list_icon.png';
import SelectedReportIcon from '../../../images/selected_report_icon.png';
import UnselectedReportIcon from '../../../images/unselected_report_icon.png'
import SelectedSettingIcon from '../../../images/selected_setting_icon.png'
import UnselectedSettingIcon from '../../../images/unselected_setting_icon.png'

type Props = {
  selectedMenu: string;
}

const Footer:FC<Props> = (Props) => {
  const menuIcons = [
    {
      text: 'List',
      pathname: 'list',
      selectedIcon: SelectedListIcon,
      unselectedIcon: UnselectedListIcon,
    },
    {
      text: 'Report',
      pathname: 'report',
      selectedIcon: SelectedReportIcon,
      unselectedIcon: UnselectedReportIcon,
    },
    {
      text: 'Settings',
      pathname: 'settings',
      selectedIcon: SelectedSettingIcon,
      unselectedIcon: UnselectedSettingIcon,
    }
  ]

  return(
    <>
      <div className={Style.footer}>
        <ul className={Style.menu_wrapper}>
          {
            menuIcons.map((menuItem)=>{
              return(
                <li className={Style.menu_item}>
                  { Props.selectedMenu === menuItem.pathname ? (
                    <>
                      <img src={menuItem.selectedIcon} className={Style.icon}/>
                      <p className={Style.selected_text}>{menuItem.text}</p>
                    </>
                  ) : (
                    <>
                      <img src={menuItem.unselectedIcon} className={Style.icon}/>
                      <p className={Style.unselected_text}>{menuItem.text}</p>
                    </>
                  )}
                </li>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}

export default Footer