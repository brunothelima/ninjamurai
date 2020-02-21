import React, { useContext, useEffect } from 'react';
import { Status } from '../config/enums'
import PlayerType from '../config/types';
import { GameContext } from '../config/store'
import './Player.css';

const Player = ( props :PlayerType) => {
  
  const { state } = useContext(GameContext)

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
      `}>
        <img src={require(`../assets/${props.name}_${props.state}.svg`)} alt={props.name} />
        { 
          state.status === Status.FINAL
          ? `${props.name}: ${props.counter}ms` 
          : '' 
        }
    </div>    
  )
}

export default Player
