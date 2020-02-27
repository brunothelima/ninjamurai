import React, { useReducer } from 'react'
import Game from './components/Game'
import { GameContext, GameReducer, initialState } from './config/store'
import Menu from './components/Menu'

const App = () => {
  
  let [state, dispatch] = useReducer(GameReducer, initialState)
  
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      <Game />
      <Menu />
    </GameContext.Provider>
  )
}

export default App
