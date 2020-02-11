import React from 'react';
import './Player.css';

interface PlayerProps {
  name: string,
  result: number,
  faulty: boolean,
  winner: boolean
  failed: boolean
}

const Player = ({ name, result, faulty, winner, failed }: PlayerProps) => {
  return (
    <div className={`Player 
      ${ (faulty) ? 'Player:faulty' : '' } 
      ${ (winner) ? 'Player:winner' : '' }
      ${ (failed) ? 'Player:failed' : '' }
    `}>
      { result ? `${name}: ${result}ms` : '' }
    </div>
  )
}

export default Player
