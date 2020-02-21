import { createContext } from 'react'

export const GameContext = createContext();

export const GameReducer = (state, action) => {
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
