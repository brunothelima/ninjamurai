import { useRef, useContext } from 'react'
import { GameContext } from '../config/store'
import { Status } from '../config/enums'
import Player from '../config/types'

export function useGame(players: Player[]) {

  const { state, dispatch } = useContext(GameContext)
  const [ p1, p2 ] = players
  const timeout = useRef(0)

  const reset = (): void => {

    p1.reset()
    p2.reset()
    
    dispatch({type: 'SET_STATE', payload: Status.SET})
    
    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
  
      p1.start()
      p2.start()

      dispatch({type: 'SET_STATE', payload: Status.DRAW})
  
    }, 5000)
  }

  const faul = (key: string): void => {
    
    dispatch({type: 'SET_STATE', payload: Status.FAUL})
    
    if ( key === p1.key ) 
      p1.setState('faulty')
    
    if ( key === p2.key ) 
      p2.setState('faulty')
    
    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      reset()
    }, 2000)
    
  }
  
  const draw = (key: string): void => {
    dispatch({type: 'SET_STATE', payload: Status.IDLE})
        
    clearTimeout(timeout.current)
    timeout.current = window.setTimeout(() => {
      dispatch({type: 'SET_STATE', payload: Status.FINAL})

      p1.stop()
      p2.stop()
      
      if (key === p1.key) {
        p1.setState('winner')
        p2.setState('failed')
      } 

      if (key === p2.key) {
        p2.setState('winner')
        p1.setState('failed')
      }
    }, 1500)
  }

  const keypress = (event: KeyboardEvent): void => {
    const { key } = event

    if ([Status.INITIAL, Status.FINAL].includes(state.status) && key === ' ') {
      reset()  
    }
  
    if ([p1.key, p2.key].includes(key)) {
      
      if (key === p1.key) 
        p1.stop()
      
      if (key === p2.key) 
        p2.stop()
      
      if (state.status === Status.SET)
        faul(key)
    
      if (state.status === Status.DRAW)
        draw(key)  
    }
  }

  return {
    faul,
    draw,
    reset,
    keypress
  }
}

