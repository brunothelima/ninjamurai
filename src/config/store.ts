import { createContext } from 'react'
import { Status } from './enums'

interface StateType {
  status: number
}

interface ActionType {
  type: string,
  payload: number
}

export interface GameStateType {
  state: StateType,
  dispatch: (action: ActionType) => void
}

export const initialState = { 
  status: Status.INITIAL 
}

export const GameReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'SET_STATE':
      return { 
        ...state,
        status: action.payload 
      }
    default:
      return state
  }
}

export const GameContext = createContext({} as GameStateType)
