import React, { createContext, useReducer, FC } from 'react'

export const SET_GOAL = 'SET_GOAL'
export const SET_HABIT_LISTS = 'SET_HABIT_LISTS'
export const SET_HABIT_RESULT_LIST = 'SET_HABIT_RESULT_LIST'
export const EDIT_HABIT_RESULT_STATUS = 'EDIT_HABIT_RESULT_STATUS'
export const CREATE_HABIT_LIST = 'CREATE_HABIT_LIST'
export const UPDATE_HABIT_LIST = 'UPDATE_HABIT_LIST'
export const SET_SELECTED_HABIT_LIST_DATE = 'SET_SELECTED_HABIT_LIST_DATE'
export const CHANGE_MODAL_STATUS = 'CHANGE_MODAL_STATUS'

export type HabitList = {
  id?: string;
  habitName: string;
  trigger: string;
  weeklySch: {}[];
  remindHour: number;
  remindMinutes: number;
}

export type HabitResultList = {
  id: string;
  scheduledDateTime: Date;
  scheduledYear: number;
  scheduledMonth: number;
  scheduledDate: number;
  finished: boolean;
  finishedDateTime: Date;
}

export const defaultDayOfWeekProps = [
  { dayOfWeek: '日',selected: false },
  { dayOfWeek: '月',selected: false },
  { dayOfWeek: '火',selected: false },
  { dayOfWeek: '水',selected: false },
  { dayOfWeek: '木',selected: false },
  { dayOfWeek: '金',selected: false },
  { dayOfWeek: '土',selected: false },
]

type State = {
  habitResultLists: HabitResultList[];
  habitLists: HabitList[];
  goal: string;
  selectedDate: Date;
  isModalOpen: boolean;
}

type Action =
{ type: 'SET_GOAL' , payload: { goal: string }} |
{ type: 'SET_HABIT_LISTS' , payload: { habitLists: HabitList[]}} |
{ type: 'SET_HABIT_RESULT_LIST' , payload: {habitResultLists: HabitResultList[]} } |
{ type: 'EDIT_HABIT_RESULT_STATUS' , payload: {id: string } } |
{ type: 'CREATE_HABIT_LIST', payload: {habitList: HabitList} }|
{ type: 'UPDATE_HABIT_LIST', payload: {habitlist: HabitList , currentListId: string}} |
{ type: 'SET_SELECTED_HABIT_LIST_DATE', payload: {selectedDate: Date}} |
{ type: 'CHANGE_MODAL_STATUS' , payload: {isModalOpen: boolean}}

const initialState:State = {
  habitResultLists: [],
  habitLists: [],
  goal: '',
  selectedDate: new Date(),
  isModalOpen: false,
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case SET_GOAL:
      return { ...state, goal: action.payload.goal }
    case SET_HABIT_LISTS:
      return { ...state, habitLists: action.payload.habitLists }
    case SET_HABIT_RESULT_LIST:
      return { ...state , habitResultLists: action.payload.habitResultLists }
    case EDIT_HABIT_RESULT_STATUS:
      const id = action.payload.id
      return {...state, habitResultLists: state.habitResultLists.map((list)=> {
        if( list.id === id ){
          return { ...list, finished: !list.finished }
        }
        return list
      })}
    case UPDATE_HABIT_LIST:
      // const nextId = String(state.habitLists.length +1)
      return {
        ...state , habitlist: state.habitLists.map((list,index)=>{
          // 同じリストIDが存在する場合はフォームの値で更新
          if(list.id === action.payload.currentListId){
            return { ...list, 
              habitName: 'test',
              trigger: '',
              weeklySch: [],
              remindHour: 0,
            }
          }
          return list
        })
      }
    case CREATE_HABIT_LIST:
      return { ...state , habitLists: [...state.habitLists, action.payload.habitList]}
    case SET_SELECTED_HABIT_LIST_DATE:
      return { ...state, selectedDate: action.payload.selectedDate}
    case CHANGE_MODAL_STATUS:
      return {...state, isModalOpen: action.payload.isModalOpen}
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