import React from 'react';

const MessageInput = ({ sendMessage, currentRoom, newMessage, setNewMessage }) => {

  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage()
    setNewMessage('')
  }

  return(
      <form
        className="send-message-form" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={newMessage}
          placeholder="Type a message..."
          type="text" />
      </form>
  )
}

export default MessageInput;