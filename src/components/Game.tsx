import React, { useEffect } from 'react'
import { usePlayer } from '../hooks/usePlayer'
import { useGame } from '../hooks/useGame'
import Player from './Player'
import './Game.css'

const Game = () => {
  const p1 = usePlayer('P1', 'q')
  const p2 = usePlayer('P2', 'p')
  
  const { keypress } = useGame([p1, p2])

  useEffect(() => {
    document.addEventListener('keypress', keypress)
    return () => {
      document.removeEventListener('keypress', keypress)
    }
  }, [keypress])

  return (
    // <div className={`Dojo ${[Status.IDLE, Status.FINAL].includes(state.status) ? 'Dojo:set' : ''}`}>
    <div className="Game">
      <Player {...p1} />
      <Player {...p2} />
    </div>
  )
}

export default Game
