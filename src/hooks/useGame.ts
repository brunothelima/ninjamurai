import { useRef, useContext } from 'react'
import { GameContext } from '../config/store'
import { Status } from '../config/enums'
import PlayerType from '../config/types'

export function useGame(players: PlayerType[]) {

  const timeout = useRef(0)
  const [p1, p2] = players
  const { dispatch } = useContext(GameContext)

  const reset = (): void => {
    p1.reset()
    p2.reset()

    dispatch({ type: 'SET_STATE', payload: Status.SET })

    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      p1.start()
      p2.start()

      dispatch({ type: 'SET_STATE', payload: Status.DRAW })
    }, 5000)
  }

  const faul = (faulty: PlayerType): void => {
    dispatch({ type: 'SET_STATE', payload: Status.FAUL })

    faulty.setState('faulty')

    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      reset()
    }, 2000)
  }

  const draw = (winner: PlayerType): void => {
    dispatch({ type: 'SET_STATE', payload: Status.IDLE })
    const loser = [p1, p2].find(p => p !== winner)

    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      dispatch({ type: 'SET_STATE', payload: Status.FINAL })

      loser?.stop()
      loser?.setState('failed')

      winner.stop()
      winner.setState('winner')
    }, 1500)
  }

  return {
    faul,
    draw,
    reset
  }
}
