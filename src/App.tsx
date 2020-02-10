import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useCounter } from './hooks/useCounter'
import { Status, Keys } from './config/enums'
import Player from './components/Player'
import Message from './components/Message'
import './App.css'

const App = () => {

  const timeout = useRef(0)
  const p1 = useCounter()
  const p2 = useCounter()

  let [winner, setWinner] = useState('')
  let [faulty, setFaulty] = useState('')
  let [status, setStatus] = useState(Status.INITIAL)
  

  const reset = useCallback((): void => {
    setWinner('')
    setFaulty('')
    setStatus(Status.SET)
    p1.reset(); p2.reset()
    timeout.current = window.setTimeout(() => {
      setStatus(Status.DRAW)
      p1.start(); p2.start()
    }, 5000)
  }, [p1, p2])

  const keypress = useCallback((event: KeyboardEvent): void => {
    const { key } = event

    if (key === Keys.START && [Status.INITIAL, Status.FINAL].includes(status)) {
      clearTimeout(timeout.current)
      reset()
    }
    
    if (key === Keys.P1) p1.stop()
    
    if (key === Keys.P2) p2.stop()

    if (key === Keys.P1 || key === Keys.P2) {

      if (status === Status.SET) {
        setFaulty(key)
        setStatus(Status.FAUL)
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => reset(), 2000)
      }

      if (status === Status.DRAW) {
        setStatus(Status.IDLE)
        timeout.current = window.setTimeout(() => {
          setWinner(key)
          setStatus(Status.FINAL)
          p1.stop(); p2.stop()
        }, 2000)
      }
    }

  }, [status, timeout, reset, p1, p2])

  useEffect(() => {
    document.addEventListener('keypress', keypress)
    return () => {
      document.removeEventListener('keypress', keypress)
    }
  }, [keypress])

  return (
    <div className="App">
      <div className={`Dojo 
        ${[Status.IDLE, Status.FINAL].includes(status) ? 'Dojo:set' : ''}
      `}>
        <Player
          name="P1"
          winner={winner === Keys.P1}
          faulty={faulty === Keys.P1}
          // active={status === Status.FINAL}
          counter={winner ? p1.counter : 0}
        />
        <Player
          name="P2"
          winner={winner === Keys.P2}
          faulty={faulty === Keys.P2}
          // active={status === Status.FINAL}
          counter={winner ? p2.counter : 0}
        />
      </div>
      <Message
        status={status}
        winner={winner}
        faulty={faulty}
      />
    </div>
  )
}

export default App
