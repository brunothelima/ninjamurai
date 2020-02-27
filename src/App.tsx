import React, { useReducer } from 'react'
import Game from './components/Game'
import { GameContext, GameReducer, initialState } from './config/store'
import Message from './components/Message'

const App = () => {
  
  let [state, dispatch] = useReducer(GameReducer, initialState)
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <Game />
      <Message />
    </GameContext.Provider>
  )
}

export default App
