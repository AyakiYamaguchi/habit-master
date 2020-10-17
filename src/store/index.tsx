import React, { createContext, useReducer, FC } from 'react'
import { title } from 'process'
import { finished } from 'stream'

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
{ type: 'EDIT_HABIT_STATUS' , payload: {id: string } } |
{ type: 'CREATE_HABIT_LIST', payload: {title: string}}

const initialState:State = {
  habitLists: []
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'SET_HABIT_LIST':
      return { ...state , habitLists: action.payload.habitLists }
    case 'EDIT_HABIT_STATUS':
      const id = action.payload.id
      return {...state, habitLists: state.habitLists.map((list)=> {
        if( list.id === id ){
          return { ...list, finished: !list.finished }
        }
        return list
      })}
    case 'CREATE_HABIT_LIST':
      const nextId = String(state.habitLists.length +1)
      return { ...state , habitLists: [...state.habitLists, {
        id: nextId,
        title: action.payload.title,
        finished: false,
        scheduled_date: new Date()
      }]}
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