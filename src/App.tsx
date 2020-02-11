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
  let [faulty, setFaulty] = useState('')
  let [winner, setWinner] = useState('')
  let [failed, setFailed] = useState('')
  let [status, setStatus] = useState(Status.INITIAL)

  const reset = useCallback((): void => {
    p1.reset() 
    p2.reset()
    setFaulty('')
    setWinner('')
    setFailed('')
    setStatus(Status.SET)
    timeout.current = window.setTimeout(() => {
      p1.start()
      p2.start()
      setStatus(Status.DRAW)
    }, 5000)
  }, [p1, p2])

  const keypress = useCallback((event: KeyboardEvent): void => {
    const { key } = event

    if ([Status.INITIAL, Status.FINAL].includes(status)) {
      if (key === Keys.START) {
        clearTimeout(timeout.current)
        reset()
      }
    }
  
    if (key === Keys.P1 || key === Keys.P2) {
      
      if (key === Keys.P1) p1.stop()
      
      if (key === Keys.P2) p2.stop()

      if (status === Status.SET) {
        setFaulty(key)
        setStatus(Status.FAUL)
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          reset()
        }, 2000)
      }

      if (status === Status.DRAW) {
        setStatus(Status.IDLE)
        timeout.current = window.setTimeout(() => {
          p1.stop() 
          p2.stop()
          setWinner(key)
          setStatus(Status.FINAL)
          setFailed((key === Keys.P1) ? Keys.P2 : Keys.P1)
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
      <div className={`Dojo ${[Status.IDLE, Status.FINAL].includes(status) ? 'Dojo:set' : ''}`}>
        <Player
          name="P1"
          winner={winner === Keys.P1}
          faulty={faulty === Keys.P1}
          failed={failed === Keys.P1}
          result={status === Status.FINAL ? p1.counter : 0 }
        />
        <Player
          name="P2"
          winner={winner === Keys.P2}
          faulty={faulty === Keys.P2}
          failed={failed === Keys.P2}
          result={status === Status.FINAL ? p2.counter : 0 }
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
