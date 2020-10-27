import React, { createContext, useReducer, FC } from 'react'
import { title } from 'process'
import { finished } from 'stream'

export const SET_HABIT_LIST = 'SET_HABIT_LIST'
export const EDIT_HABIT_STATUS = 'EDIT_HABIT_STATUS'
export const CREATE_HABIT_LIST = 'CREATE_HABIT_LIST'
export const SET_SELECTED_HABIT_LIST_DATE = 'SET_SELECTED_HABIT_LIST_DATE'
export const CHANGE_MODAL_STATUS = 'CHANGE_MODAL_STATUS'

export type HabitList = {
  id: string;
  title: string;
  finished: boolean;
  scheduledDate: Date;
}

type State = {
  habitLists: HabitList[];
  selectedDate: Date;
  isModalOpen: boolean;
}

type Action =
{ type: 'SET_HABIT_LIST' , payload: {habitLists: HabitList[]} } |
{ type: 'EDIT_HABIT_STATUS' , payload: {id: string } } |
{ type: 'CREATE_HABIT_LIST', payload: {title: string}} |
{ type: 'SET_SELECTED_HABIT_LIST_DATE', payload: {selectedDate: Date}} |
{ type: 'CHANGE_MODAL_STATUS' , payload: {isModalOpen: boolean}}

const initialState:State = {
  habitLists: [],
  selectedDate: new Date(),
  isModalOpen: false,
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case SET_HABIT_LIST:
      return { ...state , habitLists: action.payload.habitLists }
    case EDIT_HABIT_STATUS:
      const id = action.payload.id
      return {...state, habitLists: state.habitLists.map((list)=> {
        if( list.id === id ){
          return { ...list, finished: !list.finished }
        }
        return list
      })}
    case CREATE_HABIT_LIST:
      const nextId = String(state.habitLists.length +1)
      return { ...state , habitLists: [...state.habitLists, {
        id: nextId,
        title: action.payload.title,
        finished: false,
        scheduledDate: new Date()
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