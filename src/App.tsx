import React, { useReducer } from 'react'
import Dojo from './Dojo'
import { GameContext, GameReducer } from './config/store.js'
import Message from './components/Message'


import './App.css'

const App = () => {
  
  let [state, dispatch] = useReducer(GameReducer, { status: 0 })

  return (
    <GameContext.Provider value={{state, dispatch}}>
      <div className="App">
        <Dojo />
      </div>
      <Message />
    </GameContext.Provider>
  )
}

export default App
