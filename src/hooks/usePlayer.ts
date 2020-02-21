import { useState, useRef } from 'react'  

export function usePlayer(name: string, key: string) {

  let [state, setState] = useState('')
  let [counter, setCounter] = useState(0)
  const interval = useRef(0)

  function update(start: number) {
    const now = new Date().getTime()
    setCounter(now - start)
  }

  function start() {
    reset()
    const start = new Date().getTime()
    interval.current = window.setInterval(() => { 
      update(start)
    } , 1)
  }
  
  function stop() {
    clearInterval(interval.current)
  }
  
  function reset() {
    setState('')
    setCounter(0)
    stop()
  }
  
  return {
    key,
    name,
    state,
    setState,
    counter,
    start,
    reset,
    stop,
  }
}