import React, { useContext, useEffect } from 'react';
import { Status } from '../config/enums'
import PlayerType from '../config/types';
import { GameContext } from '../config/store'
import './Player.css';

const Player = ( props :PlayerType) => {
  
  const { state } = useContext(GameContext)

  const result = () => ` ${props.counter}ms`

  useEffect(() => {
    if (state.status === Status.IDLE) {
      props.setState('moving')
    }
  }, [props, state])
  
  return (
    <div className={`Player 
      ${ (props.state === 'faulty') ? 'Player:faulty' : '' } 
      ${ (props.state === 'winner') ? 'Player:winner' : '' }
      ${ (props.state === 'failed') ? 'Player:failed' : '' }
      ${ [Status.IDLE, Status.FINAL].includes(state.status) ? 'Player:moving' : ''}
      `}>
        <img src={require(`../assets/${props.name}_${props.state}.svg`)} alt={props.name} />
        <div className="Player__result">
          { props.name }
          { [Status.FINAL, Status.DRAW].includes(state.status) ? result() : '' }
        </div>
    </div>    
  )
}

export default Player
