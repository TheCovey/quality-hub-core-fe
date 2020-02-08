import React, { useEffect, useState, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ChatList from './ChatList';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator } from './config';
import { getRooms } from './methods.js';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_QH_USER, CREATE_CHATUSER } from './resolvers';
import './Messaging.scss';

const Inbox = () => {

  const {data: qhUser} = useQuery(GET_QH_USER);
  
  const [convList, setConvList] = useState();
  const [currentRoom, setCurrentRoom] = useState('none');
  const [theCurrentUser, setTheCurrentUser] = useState();
  const [toggle, setToggle]  = useState(0);
  const [scrolled, setScrolled] = useState(false)

  const chatManager = new ChatManager({
    instanceLocator,
    userId: localStorage.getItem('id') ? localStorage.getItem('id') : 'none',
    tokenProvider: new TokenProvider({
      url: tokenUrl
    })
  })

  // const getRooms = () => {
  //   chatManager.connect({
  //     onAddedToRoom: room => {
  //     }
  //   }).then(currentUser => {
  //     setConvList(currentUser.rooms.map(channel => {
  //       return { name: channel.name, id: channel.id }
  //     }))
  //   })
  // }
  const [roomList, setRoomList] = useState();

    useEffect(() => {
      getRooms(setConvList, setTheCurrentUser, setToggle, toggle, roomList, setRoomList);
      
    }, [toggle])

    const sendMessage = (text, roomId) => {
      chatManager.connect()
    .then(currentUser => {
      currentUser.sendMessage({
        text: text,
        roomId: roomId
      })
    })
  }

  useEffect(() => {
    document.querySelector('#messageContainer').scrollTop = 10000000;
  }, [theCurrentUser])
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
        {convList ? <ChatList convList={convList} theCurrentUser={theCurrentUser} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} setTheCurrentUser={setTheCurrentUser} /> : <p className='no-messages'> You don't have any conversations yet! </p>}
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
              {currentRoom === 'none' ? <h3>Select a conversation to chat</h3> : <MessageInput sendMessage={sendMessage} currentRoom={currentRoom}/>}
              </div>
            </section>
  </div>
  )
}

export default Inbox;