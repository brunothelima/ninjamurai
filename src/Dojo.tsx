import React, { useEffect, useCallback, useRef, useContext } from 'react'
import { usePlayer } from './hooks/usePlayer'
import { GameContext } from './config/store.js'
import { Status } from './config/enums'

import Player from './components/Player'
import Message from './components/Message'

import './Dojo.css'

const Dojo = () => {
  
  const p1 = usePlayer('P1', 'q')
  const p2 = usePlayer('P2', 'p')
  const timeout = useRef(0)
  
  const { state, dispatch } = useContext(GameContext)

  const resetGame = useCallback((): void => {
  
    p1.reset()
    p2.reset()
    dispatch({type: 'SET_STATE', payload: Status.SET})
  
    timeout.current = window.setTimeout(() => {
  
      p1.start()
      p2.start()
      dispatch({type: 'SET_STATE', payload: Status.DRAW})
  
    }, 5000)
  
  }, [dispatch, p1, p2])

  const keypress = useCallback((event: KeyboardEvent): void => {
    const { key } = event

    if (key === ' ' && [Status.INITIAL, Status.FINAL].includes(state.status)) {
      clearTimeout(timeout.current)
      resetGame()  
    }
  
    if ([p1.key, p2.key].includes(key)) {
      
      if (key === p1.key) p1.stop()
      
      if (key === p2.key) p2.stop()
      
      if (state.status === Status.SET) {
        dispatch({type: 'SET_STATE', payload: Status.FAUL})

        if (key === p1.key) p2.setState('failed')
        
        if (key === p2.key) p2.setState('failed')
        
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          resetGame()
        }, 2000)
      }

      if (state.status === Status.DRAW) {
        dispatch({type: 'SET_STATE', payload: Status.IDLE})
        clearTimeout(timeout.current)
        
        timeout.current = window.setTimeout(() => {
          dispatch({type: 'SET_STATE', payload: Status.FINAL})
          
          if (key === p1.key) {
            p1.setState('winner')
            p2.setState('failed')
          } 

          if (key === p2.key) {
            p2.setState('winner')
            p1.setState('failed')
          }

        }, 2000)
      }
    }
  }, [state, timeout, dispatch, resetGame, p1, p2])

  useEffect(() => {
    document.addEventListener('keypress', keypress)
    return () => {
      document.removeEventListener('keypress', keypress)
    }
  }, [keypress])

  return (
    <>
      <div className={`Dojo ${[Status.IDLE, Status.FINAL].includes(state.status) ? 'Dojo:set' : ''}`}>
        <Player {...p1} />
        <Player {...p2} />
      </div>
      <Message />
    </>
  )
}

export default Dojo
