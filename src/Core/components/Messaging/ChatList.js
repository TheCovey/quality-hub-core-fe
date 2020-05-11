import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatListItem from './ChatListItem'

const ChatList = ({currentRoom, changeRoom}) => {
  
	const [allRooms, setAllRooms] = useState([])

  useEffect(() => {
	axios.get(`http://localhost:3300/api/rooms/${localStorage.getItem("id")}`)
	.then((res) => {
		setAllRooms(res.data)
	})
	.catch(err => console.log(err))
  }, [])

  return (
		<div className='chat-list'>
			 {
				allRooms.map((room) => {
					return (
						<ChatListItem room={room} changeRoom={changeRoom} currentRoom={currentRoom} />
					);
				})} 
		</div>
	);
}

export default ChatList;