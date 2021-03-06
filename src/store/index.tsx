import React, { createContext, useReducer, FC } from 'react'
export const SET_GOAL = 'SET_GOAL'
export const SET_HABIT_LISTS = 'SET_HABIT_LISTS'
export const SET_SCHEDULED_HABITS = 'SET_SCHEDULED_HABITS'
export const ADD_SCHEDULED_HABIT = 'ADD_SCHEDULED_HABIT'
export const EDIT_HABIT_RESULT_STATUS = 'EDIT_HABIT_RESULT_STATUS'
export const CREATE_HABIT_LIST = 'CREATE_HABIT_LIST'
export const UPDATE_HABIT_LIST = 'UPDATE_HABIT_LIST'
export const SET_SELECTED_HABIT_LIST_DATE = 'SET_SELECTED_HABIT_LIST_DATE'
export const CHANGE_MODAL_STATUS = 'CHANGE_MODAL_STATUS'


export type HabitList = {
  id: string;
  habitName: string;
  trigger: string;
  weeklySch: {dayOfWeek:string; selected: boolean;}[];
  remindHour: string;
  remindMinutes: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ScheduledHabit = {
  id: string;
  habitListId: string;
  scheduledDateTime: Date;
  scheduledYear: number;
  scheduledMonth: number;
  scheduledDate: number;
  finished: boolean;
  finishedDateTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const initialDayOfWeekProps = [
  { dayOfWeek: '日',selected: false },
  { dayOfWeek: '月',selected: false },
  { dayOfWeek: '火',selected: false },
  { dayOfWeek: '水',selected: false },
  { dayOfWeek: '木',selected: false },
  { dayOfWeek: '金',selected: false },
  { dayOfWeek: '土',selected: false },
]

type State = {
  scheduledHabits: ScheduledHabit[];
  habitLists: HabitList[];
  goal: string;
}

type Action =
{ type: 'SET_GOAL' , payload: { goal: string }} |
{ type: 'SET_HABIT_LISTS' , payload: { habitLists: HabitList[]}} |
{ type: 'SET_SCHEDULED_HABITS' , payload: { scheduledHabits: ScheduledHabit[]}} |
{ type: 'ADD_SCHEDULED_HABIT', payload: { scheduledHabit: ScheduledHabit }} |
{ type: 'EDIT_HABIT_RESULT_STATUS' , payload: {id: string }} |
{ type: 'CREATE_HABIT_LIST', payload: { habitList: HabitList }}|
{ type: 'UPDATE_HABIT_LIST', payload: { habitlist: HabitList }} ;

const initialState:State = {
  scheduledHabits: [],
  habitLists: [],
  goal: '',
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case SET_GOAL:
      return { ...state, goal: action.payload.goal }
    case SET_HABIT_LISTS:
      return { ...state, habitLists: action.payload.habitLists }
    case SET_SCHEDULED_HABITS:
      return { ...state , scheduledHabits: action.payload.scheduledHabits }
    case ADD_SCHEDULED_HABIT:
      const newScheduledHabits = [...state.scheduledHabits, action.payload.scheduledHabit]
      return { ...state , scheduledHabits: newScheduledHabits }
    case EDIT_HABIT_RESULT_STATUS:
      const id = action.payload.id
      return {...state, scheduledHabits: state.scheduledHabits.map((list)=> {
        if( list.id === id ){
          return { ...list, finished: !list.finished }
        }
        return list
      })}
    case UPDATE_HABIT_LIST:
      const habitList = action.payload.habitlist
      const updatedHabitLists = state.habitLists.map((list)=>{
        if(habitList.id === list.id){
          return habitList
        }
        return list
      })
      return { ...state, habitLists: updatedHabitLists}
    case CREATE_HABIT_LIST:
      const newHabitLists = [...state.habitLists, action.payload.habitList]
      return { ...state , habitLists: newHabitLists}
    default:
      return state
  }
}

type ContextType = {
  globalState: State,
  setGlobalState: React.Dispatch<Action>
}

export const Store = createContext({} as ContextType )

// Provider を定義
export const StoreProvider:FC = ({ children }) => {
  const [globalState , setGlobalState ] = useReducer( reducer, initialState )
  return (
    <Store.Provider value={{ globalState, setGlobalState }}>
      { children }
    </Store.Provider>
  )
}

export const selectedDateScheduleLists = () => {
  
}