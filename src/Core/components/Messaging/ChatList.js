import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { format } from 'date-fns';
import axios from 'axios';

const ChatList = ({currentRoom, setCurrentRoom, changeRoom}) => {
  
	const [allRooms, setAllRooms] = useState([])

  useEffect(() => {
	axios.get(`http://localhost:3300/api/rooms/${localStorage.getItem("id")}`)
	.then(res => setAllRooms(res.data))
	.catch(err => console.log(err))
  }, [])

const onRoomClick = (roomId) => {
	setCurrentRoom(roomId)
	changeRoom(roomId)
}
console.log(currentRoom)
  return (
		<div className='chat-list'>
			 {
				allRooms.map((channel, idx) => {
					return (
						<li
							onClick={()=> onRoomClick(channel)}
							key={channel.id}
							style={
								channel === currentRoom
									? { fontWeight: '900', backgroundColor: '#e7f2fe' }
									: { fontWeight: '100' }
							}>
								{channel.id}
							{/* <div className='chat-conv-detail'>
								<span>{channel.displayName}</span>
								<span className='chat-timestamp'> */}
                  {/* {channel.lastMessageAt ?
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
							)} */}
               {/* <div onClick={() => deleteConv(channel.id)}>X</div>  */}
						</li>
					);
				})} 
		</div>
	);
}

export default ChatList;