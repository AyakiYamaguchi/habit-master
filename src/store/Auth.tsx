import React, { createContext, useReducer, FC } from 'react'
export const SET_USER = 'SET_USER'
export const DELETE_USER = 'DELETE_USER'

export type User = {
  uid: string;
  userName: string | null;
}

type State = {
  user: User | null;
}

type Action =
{ type: 'SET_USER', payload: {user: User}} |
{ type: 'DELETE_USER'}

const initialState = {
  user: null,
}

const reducer = (state: State ,action: Action) => {
  switch(action.type){
    case SET_USER:
      return { ...state, user: action.payload.user }
    case DELETE_USER:
      return { ...state, user: null}
    default:
      return state
  }
}

type ContextType = {
  AuthState: State,
  setAuthState: React.Dispatch<Action>
}

export const AuthContext = createContext({} as ContextType )

export const AuthProvider:FC = ({children}) => {
  const [AuthState, setAuthState] = useReducer( reducer, initialState )
  return (
    <AuthContext.Provider value={{AuthState, setAuthState}}>
      { children }
    </AuthContext.Provider>
  )
}
