import React, { useState, useEffect, useCallback, useRef } from 'react'
import { usePlayer } from './hooks/usePlayer'
import { Status } from './config/enums'
import Player from './components/Player'
import Message from './components/Message'
import './App.css'

const App = () => {
  const timeout = useRef(0)
  const p1 = usePlayer('P1', 'q')
  const p2 = usePlayer('P2', 'p')
  
  let [status, setStatus] = useState(Status.INITIAL)

  const resetGame = useCallback((): void => {
    p1.reset(); p1.setState('') 
    p2.reset(); p2.setState('')
    setStatus(Status.SET)
    timeout.current = window.setTimeout(() => {
      p1.start(); p2.start()
      setStatus(Status.DRAW)
    }, 5000)
  }, [p1, p2])

  const keypress = useCallback((event: KeyboardEvent): void => {
    const { key } = event

    if ([Status.INITIAL, Status.FINAL].includes(status)) {
      if (key === ' ') {
        clearTimeout(timeout.current)
        resetGame()
      }
    }
  
    if ([p1.key, p2.key].includes(key)) {
      
      if (key === p1.key) p1.stop()
      
      if (key === p2.key) p2.stop()
      
      if (status === Status.SET) {
        setStatus(Status.FAUL)

        if (key === p1.key) p2.setState('failed')
        
        if (key === p1.key) p2.setState('failed')
      
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          resetGame()
        }, 2000)
      }

      if (status === Status.DRAW) {
        setStatus(Status.IDLE)
        
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          setStatus(Status.FINAL)
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
  }, [status, timeout, resetGame, p1, p2])

  useEffect(() => {
    document.addEventListener('keypress', keypress)
    return () => {
      document.removeEventListener('keypress', keypress)
    }
  }, [keypress])

  return (
    <div className="App">
      <div className={`Dojo ${[Status.IDLE, Status.FINAL].includes(status) ? 'Dojo:set' : ''}`}>
        <Player {...p1} status={status} />
        <Player {...p2} status={status} />
      </div>
      <Message status={status}/>
    </div>
  )
}

export default App
