import React, { useState, useEffect } from 'react';
import { connectToRoom } from './methods';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

const ChatList = ({ setCurrentRoom, currentRoom, convList, theCurrentUser, setTheCurrentUser}) => {

const [clickFast, setClickFast] = useState();
const [prevRoom, setPrevRoom] = useState();
  const history= useHistory();
  
  useEffect(() => {
    if (history.location.state && history.location.state.createdChannel){
      setCurrentRoom(history.location.state.createdChannel)
    }
  }, [])

  useEffect(()=>{
    if(clickFast){
      onConvoClick(clickFast)
    }
  },[clickFast])

  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    if (currentRoom && currentRoom.id && theCurrentUser && theCurrentUser.roomSubscriptions[prevRoom.id] ){ 
      theCurrentUser.roomSubscriptions[prevRoom.id].cancel();
      connectToRoom(currentRoom.id, chatLog, setChatLog, setTheCurrentUser)
    }
   else if (currentRoom && currentRoom.id){
      connectToRoom(currentRoom.id, chatLog, setChatLog, setTheCurrentUser)
    }
  },[currentRoom])


  const onConvoClick = (channel) => {
     const  messageElements =  document.getElementById('message-list-div').childNodes;

  for(let x=0; x < messageElements.length; x++){
    for(let y=0; y< chatLog.length; y++){
      if(messageElements[x] &&  chatLog[y] && messageElements[x].id !== chatLog[y].id){
       messageElements[x].remove()
      }
    }    
  }
      setCurrentRoom(channel)
      setPrevRoom(currentRoom);      
  }
  return (
		<div className='chat-list'>
			{convList &&
				convList.map((channel, idx) => {
					return (
						<li
							onClick={() => setClickFast(channel)}
							key={idx}
							style={
								channel.id === currentRoom.id
									? { fontWeight: '900', backgroundColor: '#e7f2fe' }
									: { fontWeight: '100' }
							}>
							<div className='chat-conv-detail'>
								<span>{channel.displayName}</span>
								<span className='chat-timestamp'>
                  {channel.lastMessageAt ?
                  format(new Date(), 'Mdyy') ===
									format(new Date(channel.lastMessageAt), 'Mdyy')
										? format(new Date(channel.lastMessageAt), 'p')
										: format(new Date(channel.lastMessageAt), 'M/d/yy') : null}
								</span>
							</div>

							{channel.id === currentRoom.id ? null : channel.unreadCount ===
							  0 ? null : (
								<div className='chat-unread'>
									<span>{channel.unreadCount}</span>
								</div>
							)}
              {/* <div onClick={() => deleteConv(channel.id)}>X</div> */}
						</li>
					);
				})}
		</div>
	);
}

export default ChatList;