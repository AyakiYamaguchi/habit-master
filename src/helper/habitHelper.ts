
export const convertScheduledHabit = (habitListId: string ,createdDate: Date) => {
  const today = new Date()
  const scheduledHabit = {
    habitListId: habitListId,
    scheduledDateTime: createdDate,
    scheduledYear: createdDate.getFullYear(),
    scheduledMonth: createdDate.getMonth(),
    scheduledDate: createdDate.getDate(),
    finished: false,
    finishedDateTime: null,
    createdAt: today,
    updatedAt: today,
  }
  return scheduledHabit
}