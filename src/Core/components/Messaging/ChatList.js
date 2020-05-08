import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { format } from 'date-fns';

const ChatList = () => {

// const [prevRoom, setPrevRoom] = useState();
//   const history= useHistory();
  
  useEffect(() => {
    // if (history.location.state && history.location.state.createdChannel){
    //   // setCurrentRoom(history.location.state.createdChannel)
    // }
  }, [])


//   const onConvoClick = (channel) => {
   
//   }
  return (
		<div className='chat-list'>
      CHAT LIST
			{/* {convList &&
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
						{/* </li>
					);
				})} */} */}
		</div>
	);
}

export default ChatList;