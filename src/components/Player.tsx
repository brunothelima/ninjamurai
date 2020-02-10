import React from 'react';
import './Player.css';

interface Props {
  name: string,
  counter: number,
  faulty: boolean,
  winner: boolean
}

const Player = ({ name, counter, faulty, winner }: Props) => {

  return (
    <div className={`Player 
      ${ (faulty) ? 'Player:faulty' : '' } 
      ${ (winner) ? 'Player:winner' : '' }` }>
      { 
        counter && (faulty || winner) 
          ? `${name}: ${counter}` 
          : '' 
      }
    </div>
  )
}

export default Player
