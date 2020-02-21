import React, { useContext, useEffect } from 'react';
import { Status } from '../config/enums'
import PlayerType from '../config/types';
import { GameContext } from '../config/store.js'
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
    `}>{ 
      <img src={require(`../assets/${props.name}.svg`)} alt={props.name} />
      // !! props.state && 
      // ! ['faulty'].includes(props.state) 
      //   ? `${props.name}: ${props.counter}ms` 
      //   : '' 
    }</div>
  )
}

export default Player
