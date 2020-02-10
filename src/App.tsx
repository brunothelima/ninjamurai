import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Status, Keys } from './Enums'
import { useCounter } from './useCounter'
import './App.css';


const App = () => {

  let [ status, setStatus ] = useState(Status.INITIAL)
  let [ winner, setWinner ] = useState('')
  let [ faulty, setFaulty ] = useState('')
  let timeout = useRef(0)
  
  const p1Counter = useCounter() 
  const p2Counter = useCounter() 
  
  const hasWinner = (): boolean => status === Status.IDLE || status === Status.FINAL
  
  const isWinner = (key: string) : boolean => winner === key
  
  const isFaulty = (key: string) : boolean => faulty === key

  const resetGame = useCallback((): void => {
    setWinner('')
    setFaulty('')
    setStatus(Status.SET)
    timeout.current = window.setTimeout(() => {
      setStatus(Status.DRAW)
      p1Counter.start()
      p2Counter.start()
      // timeout.current = window.setTimeout(() => {
      //   document.dispatchEvent(new KeyboardEvent('keypress', { key: 'p'}));
      // }, 2000)
    }, 5000)
  }, [p1Counter, p2Counter])
  
  const keypress = useCallback((event: KeyboardEvent): void => {
    const { key } = event
    if (key === Keys.START && [Status.INITIAL, Status.FINAL].includes(status)) {
      clearTimeout(timeout.current)
      resetGame()
    }
    if (key === Keys.P1DRAW ||  key === Keys.P2DRAW) {
      
      if (key === Keys.P1DRAW) {
        p1Counter.stop()
      }
      
      if (key === Keys.P2DRAW) {
        p2Counter.stop()
      }
      
      if (status === Status.SET) {
        setStatus(Status.FAUL)
        setFaulty(key)
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          resetGame()
        }, 2000)
        return
      }
      if (status === Status.DRAW) {
        setStatus(Status.IDLE)
        timeout.current = window.setTimeout(() => {
          setStatus(Status.FINAL)
          setWinner(key)
          setFaulty((key === Keys.P1DRAW) ? Keys.P2DRAW : Keys.P1DRAW)
        }, 2000)
        return
      }
    }
    
  }, [status, timeout, resetGame, p1Counter, p2Counter])
  
  useEffect(() => {
    document.addEventListener('keypress', keypress)
    return () => {
      document.removeEventListener('keypress', keypress)
    }
  }, [keypress])

  return (
    <div className="NinjaDuel">
      <div className={`Dojo ${ hasWinner() ? 'Dojo--idle' : '' }`}>
        {faulty}
        <div className={`P1 
          ${isWinner(Keys.P1DRAW) ? 'Winner' : '' }
          ${isFaulty(Keys.P1DRAW) ? 'Loser' : '' }
        `}></div>
        <div className={`P2 
          ${isWinner(Keys.P2DRAW) ? 'Winner' : '' }
          ${isFaulty(Keys.P2DRAW) ? 'Loser' : '' }
        `}></div>
      </div>
      <div className="Counter">
        <span>{ `P1: ${p1Counter.counter}` }</span>
        <span>{ `P2: ${p2Counter.counter}` }</span>
      </div>
      <div className="Message">
        <p>
          <hr></hr> 
          { (status === Status.INITIAL) ? 'Press spacebar to start' : '' }
          { (status === Status.SET) ? 'Get Ready...' : '' }
          { (status === Status.DRAW) ? 'Draw!' : '' }
          { (status === Status.IDLE) ? '~~Mistery~~' : '' }
          { (status === Status.FAUL) ? `The faul is on ${isFaulty(Keys.P1DRAW) ? 'Player 1' : 'Player 2' }` : '' }
          { (status === Status.FINAL) ? `The winner is ${isWinner(Keys.P1DRAW) ? 'Player 1' : 'Player 2' }` : '' }
        </p>
      </div>
    </div>
  );
}

export default App;
