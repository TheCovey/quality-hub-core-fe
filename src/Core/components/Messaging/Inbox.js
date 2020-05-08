import React, { useEffect, useState } from 'react';
// import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatList from './ChatList';
// import { useQuery } from '@apollo/react-hooks';
// import { GET_QH_USER } from './resolvers';
import './Messaging.scss';
import io from 'socket.io-client'

let socket

const Inbox = ({ location }) => {
  
  // const {data: qhUser} = useQuery(GET_QH_USER);
  
  const [currentRoom] = useState('none');
  // const [roomList, setRoomList] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  
  const ENDPOINT = 'localhost:3300'
  const userId = localStorage.getItem('id')
  const room = 'testRoom'
  
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join', {userId, room})

      return () => {
        socket.emit('disconnect');
        console.log('unmount')
        socket.disconnect()
        // socket.off();
      }
  }, [userId])

  useEffect(() => {
    socket.on('sendMessage', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  // useEffect(()=> {
  //   socket.emit('disconnect');
  //   socket.disconnect()
  //   console.log('heck')
  // }, [newMessage])


    const sendMessage = (text, roomId) => {
      if(newMessage){
        socket.emit('message', newMessage, room, userId)
      }
      console.log(messages, newMessage, socket.id)
  }

  // useEffect(() => {
  //   document.querySelector('#messageContainer').scrollTop = 10000000;
  // }, [theCurrentUser])
// const chatContainer=document.getElementsByName('messageContainer');
// // const chatAnchor = document.getElementsByName('chatAnchor');
// const chatAnchor = useRef();
// // const chatContainer = useRef();
// useEffect(() => {
//   chatContainer[0].scrollTo(0, chatContainer[0].scrollHeight);
//   // console.log(chatContainer[0].scrollHeight)

//   // chatAnchor.scrollIntoView({ behavior: "smooth" })
// }, [currentRoom, convList]);
      return(
    <div className='inbox-container'>
      <aside className="inbox-left-sidebar">
        <div className='chat-sidebar-header'>
        <h3>Chat</h3>
        <p>Select a conversation to chat</p>
        </div>
        <ChatList />
      </aside>
            <section className="chat-screen">
              {/* <header className="chat-header">{currentRoom.displayName}</header> */}
              <div className='message-container-container'>
              <div className='message-container'  id='messageContainer'>
              <ul className="chat-messages" id='message-list-div'>
                {/* <li className='messageDiv'>This is a test message</li>
                <li className='messageDiv sentMessage'>Sent Message</li> */}
              </ul>
              <div name='chatAnchor' ></div>
              </div>
              </div>
              <div className="chat-footer">
              <MessageInput sendMessage={sendMessage} currentRoom={currentRoom} newMessage={newMessage} setNewMessage={setNewMessage}/>
              </div>
            </section>
  </div>
  )
}

export default Inbox;