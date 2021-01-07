// 日付をYYYYMMDD形式の文字列に変換
export const getYMDStr = (date: Date) => {
  const Y = date.getFullYear()
  const M = ("00" + (date.getMonth()+1)).slice(-2)
  const D = ("00" + date.getDate()).slice(-2)

  return Y + M + D
}