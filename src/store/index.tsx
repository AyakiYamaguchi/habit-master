import React, { createContext, useReducer, FC } from 'react'

export const SET_GOAL = 'SET_GOAL'
export const SET_HABIT_LISTS = 'SET_HABIT_LISTS'
export const SET_HABIT_RESULT_LIST = 'SET_HABIT_RESULT_LIST'
export const EDIT_HABIT_RESULT_STATUS = 'EDIT_HABIT_RESULT_STATUS'
export const CREATE_HABIT_LIST = 'CREATE_HABIT_LIST'
export const SET_SELECTED_HABIT_LIST_DATE = 'SET_SELECTED_HABIT_LIST_DATE'
export const CHANGE_MODAL_STATUS = 'CHANGE_MODAL_STATUS'

export type HabitList = {
  id: string;
  habitName: string;
  trigger: string;
  weeklySch: {};
  remindHour: number;
  remindMinutes: number;
}

export type HabitResultList = {
  id: string;
  finished: boolean;
  finishedDateTime: Date;
  finishedYear: number;
  finishedMonth: number;
  finishedDate: number;
  finishedHour: number;
  finishedMin: number;
}

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
{ type: 'CREATE_HABIT_LIST', payload: {title: string}} |
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
    case CREATE_HABIT_LIST:
      const nextId = String(state.habitLists.length +1)
      const today = new Date()
      return { ...state , habitLists: [...state.habitResultLists, {
        id: nextId,
        habitName: 'test',
        trigger: 'test',
        weeklySch: {},
        remindHour: 12,
        remindMinutes: 12,
        // id: nextId,
        // finished: false,
        // scheduled: today,
        // scheduledYear: today.getFullYear(),
        // scheduledMonth: today.getMonth() + 1,
        // scheduledDate: today.getDate(),
      }]}
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