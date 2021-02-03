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
export const getOnlyDayOfWeek = (dateItem:string) => {
  const dayOfWeek = Moment(dateItem).day()
  return dayOfWeek
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

// カレンダー表示用のひと月分の日付を取得
export const getCalendarDays = (year:number,month:number) => {
  // 1日の曜日を取得
  const first = new Date(year, month - 1, 1).getDay()
  // 月の最終日を取得
  const last = new Date(year, month, 0).getDate()
  // 月初〜月末までの日付配列を作成
  return [0, 1, 2, 3, 4, 5].map(weekIndex => {
    return [0, 1, 2, 3, 4, 5, 6].map(dayIndex => {
      const day = dayIndex + 1 + weekIndex * 7
      return day - 1 < first || last < day - first ? null : day - first
    })
  })
}