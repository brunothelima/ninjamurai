import React, { useContext } from 'react';
import { Status } from '../config/enums'
import { GameContext } from '../config/store.js'
import './Message.css'

const Message = () => {
  
  const { state } = useContext(GameContext)

  return (
    <div className="Message">
      { (state.status === Status.INITIAL) ? 'Press spacebar to start' : '' }
      { (state.status === Status.SET) ? 'Get Ready...' : '' }
      { (state.status === Status.DRAW) ? 'Draw!' : '' }
      { (state.status === Status.FAUL) ? '~~Nope~~' : '' }
      { (state.status === Status.IDLE) ? '~~Mistery~~' : '' }
    </div>
  )
}

export default Message
