import React, { createContext, useReducer, FC } from 'react'
import HabitLists from '../components/HabitLists/HabitLists'

export type HabitList = {
  id: string;
  title: string;
  finished: boolean;
  scheduled_date: Date;
}

type State = {
  habitLists: HabitList[];
}

type Action =
{ type: 'SET_HABIT_LIST' , payload: {habitLists: HabitList[]} } |
{ type: 'ADD_HABIT_STATUS' }

const initialState:State = {
  habitLists: []
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'SET_HABIT_LIST':
      return { ...state , habitLists: action.payload.habitLists }
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