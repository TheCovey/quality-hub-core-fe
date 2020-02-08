import React, { useState } from 'react';
import { handleSubmit } from '../../../InterviewQ/components/CoachForm/subs/Functions';

const MessageInput = ({ sendMessage, currentRoom }) => {

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setMessage(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(message, currentRoom.id)
    setMessage('')
  }

  return(
      <form
        className="send-message-form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={message}
          placeholder="Type a message..."
          type="text" />
      </form>
  )
}

export default MessageInput;