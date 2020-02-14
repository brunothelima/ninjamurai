import React from 'react';
import PlayerType from '../config/types';
import './Player.css';

const Player = ( props :PlayerType) => {
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
