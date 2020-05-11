import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from './resolvers';

const ChatListItem = ({room, changeRoom, currentRoom}) => {


		const { data } = useQuery(GET_USER, {
			variables: { id: room.user_1 === localStorage.getItem('id') ? room.user_2 : room.user_1 }})
	console.log(data)
    return(
<li
							onClick={() => changeRoom(room.id)}
							key={room.id}
							style={
								room.id === currentRoom
									? { fontWeight: '900', backgroundColor: '#e7f2fe' }
									: { fontWeight: '100' }
							}>
								{data && data.user.first_name}
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
    )
}

export default ChatListItem;