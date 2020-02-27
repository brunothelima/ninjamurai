import React, { useEffect, useCallback, useContext } from 'react'
import { usePlayer } from '../hooks/usePlayer'
import { useGame } from '../hooks/useGame'
import { GameContext } from '../config/store'
import { Status } from '../config/enums'
import Player from './Player'
import './Game.css'

const Game = () => {
  
  const p1 = usePlayer('P1', 'q')
  const p2 = usePlayer('P2', 'p')
  const game = useGame([p1, p2])
  const { state } = useContext(GameContext)

  const onKeypress = useCallback((event: KeyboardEvent): void => {

    if ([Status.INITIAL, Status.FINAL].includes(state.status) && event.key === ' ') {
      game.reset()  
      return
    }
    
    const player = [p1, p2].find(p => p.key === event.key)
    player?.stop()
  
    if (player && state.status === Status.SET)
      game.faul(player)
  
    if (player && state.status === Status.DRAW)
      game.draw(player)  
    
  }, [game, state, p1, p2])

  useEffect(() => {
    document.addEventListener('keypress', onKeypress)
    return () => {
      document.removeEventListener('keypress', onKeypress)
    }
  }, [onKeypress])

  return (
    // <div className={`Dojo ${[Status.IDLE, Status.FINAL].includes(state.status) ? 'Dojo:set' : ''}`}>
    <div className="Game">
      <Player {...p1} />
      <Player {...p2} />
    </div>
  )
}

export default Game
