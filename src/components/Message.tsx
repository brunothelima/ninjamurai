import React from 'react';
import { Status } from '../config/enums'
import './Message.css'

interface MessageProps {
  status: number,
}

const Message = ({ status }: MessageProps) => {
  return (
    <div className="Message">
      { (status === Status.INITIAL) ? 'Press spacebar to start' : '' }
      { (status === Status.SET) ? 'Get Ready...' : '' }
      { (status === Status.DRAW) ? 'Draw!' : '' }
      { (status === Status.IDLE) ? '~~Mistery~~' : '' }
    </div>
  )
}

export default Message
