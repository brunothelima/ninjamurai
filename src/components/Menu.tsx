import React, { useContext } from 'react';
import { Status } from '../config/enums'
import { GameContext } from '../config/store'
import './Menu.css'

const Menu = () => {
  
  const { state } = useContext(GameContext)

  const onStart = (): void => {
    document.dispatchEvent(new KeyboardEvent('keypress', {'key': ' '}));
  }

  return (
    <div className="Menu">
      <div className="Menu__status">
        { (state.status === Status.INITIAL) ? 'Lets Fight!' : '' }
        { (state.status === Status.SET) ? 'Get Ready' : '' }
        { (state.status === Status.DRAW) ? 'Draw' : '' }
        { (state.status === Status.FAUL) ? 'Ouch' : '' }
        { (state.status === Status.IDLE) ? 'The winner is' : '' }
      </div>
      {state.status === Status.INITIAL &&
        <div className="Menu__buttons">
          <button>Options</button>  
          <button onClick={onStart}>Start</button>  
        </div>
      }
    </div>
  )
}

export default Menu
