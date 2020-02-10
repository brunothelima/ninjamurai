import { useState, useRef } from 'react'  

export function useCounter() {

  let [counter, setCounter] = useState(0)
  const interval = useRef(0)

  function update(start: number) {
    setCounter(new Date().getTime() - start)
  }

  function stop() {
    clearInterval(interval.current)
  }
  
  function start() {
    stop()
    update(0)
    const moment = new Date().getTime()
    interval.current = window.setInterval(() => { 
      update(moment)
    } , 1)
  }
  
  return {
    counter,
    start,
    stop
  }
}