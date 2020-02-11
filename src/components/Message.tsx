import React from 'react';
import { Status, Keys } from '../config/enums'
import './Message.css'

interface MessageProps {
  status: number,
  winner: string,
  faulty: string,
}

const Message = ({ status, winner, faulty }: MessageProps) => {
  return (
    <div className="Message">
      { (status === Status.INITIAL) ? 'Press spacebar to start' : '' }
      { (status === Status.SET) ? 'Get Ready...' : '' }
      { (status === Status.DRAW) ? 'Draw!' : '' }
      { (status === Status.IDLE) ? '~~Mistery~~' : '' }
      { (status === Status.FAUL && faulty === Keys.P1) ? 'The faul is on Player 1' : '' }
      { (status === Status.FAUL && faulty === Keys.P2) ? 'The faul is on Player 2' : '' }
      { (status === Status.FINAL && winner === Keys.P1) ? 'The winner is Player 1' : '' }
      { (status === Status.FINAL && winner === Keys.P2) ? 'The winner is Player 2' : '' }
    </div>
  )
}

export default Message
