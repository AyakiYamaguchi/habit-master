import Moment from 'moment'

// 開始日から◯日分の""過去の""yyyymmdd形式の配列を作成
export const getDateLists = (StartDate: Date ,days: number) => {
  const dateLists:string[] = []
  for ( let i = 0 ; i < days; i++){
    let date = Moment(StartDate).add(-i, 'days').format("YYYYMMDD")
    dateLists.push(date)
  }
  return dateLists
}

// 指定した日付の日情報のみを取得
export const getOnlyDate = (dateItem:string) => {
  const date = Moment(dateItem).date()
  return date
}

// 指定した日付の曜日情報を取得
export const getDayStrJP = (dateItem:string) => {
  const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ]
  const day = Moment(dateItem).day()
  return dayOfWeekStr[day]
}

// 日付をYYYYMMDD形式の文字列に変換
export const getYMDStr = (dateItem: Date) => {
  const dateStr = Moment(dateItem).format("YYYYMMDD")
  return dateStr
}