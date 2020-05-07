// import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
// import { tokenUrl, instanceLocator } from './config';

// const chatManager = new ChatManager({
//   instanceLocator,
//   userId: localStorage.getItem('id') ? localStorage.getItem('id') : 'none',
//   tokenProvider: new TokenProvider({
//     url: tokenUrl
//   })
// })

// export  const startDM = (recipient, recipientId, sender, history) => {
//   const userId = localStorage.getItem('id')

//   chatManager.connect()
//   .then(currentUser => {
//     currentUser.createRoom({
//     id: `${userId}-${recipientId}`,
//     name: `${sender}-${recipient}`,
//     private: true,
//     addUserIds: [userId, recipientId],
//   }).then(room => {
//     	history.push({
// 				pathname: '/interviewq/inbox',
// 				state: {
// 					createdChannel: {
// 						name: `${sender}-${recipient}`,
//             id: `${userId}-${recipientId}`,
//             createdByUserId: `${userId}`,
//             displayName: `${recipient}`
// 					},
// 				},
//       })
//   })
//   .catch(err => {
//     console.log(`Error creating room ${err}`)
//     // history.push('/interviewq/inbox')
//   })
// })
// }

// export const checkRooms = (setRooms) => {
//   chatManager.connect()
//   .then(currentUser => {
//     // console.log(currentUser)
//     setRooms(currentUser.rooms)
//   })
// }

// export const getRooms = (setConvList, setTheCurrentUser, setToggle, toggle, roomList, setRoomList) => {
//   // console.log("GET ROOMSSS!!!@ AHHGHGH!!!!")
//   let list;
//   // console.log(setRoomList)
//   // console.log(roomList)
//   chatManager.connect({
//     // onAddedToRoom: room => {
//       onRoomUpdated: room =>{
//         console.log(room)
//         // console.log(roomList)
//         // if(setToggle){
//           if(list){
//             let changed = true;
//             for(let i =0; i< list.length; i++){
//               if(list[i].id===room.id){
//                 console.log(room.id);
//                 list[i] = room;
//                 changed = false;
//                 break;
//               }
//             }
//             if(changed==true){
//               list.push(room);
//             }


//             // console.log(room)
//             setConvList(list.map(channel => {
//               const splitName= channel.name.split('-');
//               console.log(splitName)
//             if (channel.createdByUserId === localStorage.getItem('id')){
//               console.log('first')
//               return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[1], unreadCount: channel.unreadCount, lastMessageAt: channel.lastMessageAt }
//             }  else{
//               console.log('second')
//               return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[0], unreadCount: channel.unreadCount, lastMessageAt: channel.lastMessageAt }
//             }
//             }))
//           }
//           // console.log("UPDATED ROOM")
//           // setToggle(toggle+1);
//         // }
//       }
//       // },
//     }).then(currentUser => {
      

//   // setTheCurrentUser(currentUser);
// // setRoomList(currentUser.rooms);
// list = currentUser.rooms
//   setConvList(currentUser.rooms.map(channel => {
//     const splitName= channel.name.split('-');
//   if (channel.createdByUserId === localStorage.getItem('id')){
//     console.log('third', channel.createdByUserId, splitName[1])
//     return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[1], unreadCount: channel.unreadCount, lastMessageAt: channel.lastMessageAt }
//   }  
//   console.log('fourth', channel.createdByUserId, splitName[0])
//     return { name: channel.name, id: channel.id, createdByUserId: channel.createdByUserId, displayName: splitName[0], unreadCount: channel.unreadCount, lastMessageAt: channel.lastMessageAt }
//   }))
// })
// }

// // export const deleteConv = roomId => {
// // 	chatManager.connect().then(currentUser => {
// // 		currentUser
// // 			.deleteRoom({ roomId: roomId })
// // 			.then(() => {
// // 				console.log(`Deleted room with ID: ${roomId}`);
// // 			})
// // 			.catch(err => {
// // 				console.log(`Error deleted room ${roomId}: ${err}`);
// // 			});
// // 	});
// // };

// export const connectToRoom = (roomId, chatLog, setChatLog, setTheCurrentUser) => {
//   chatManager.connect()
//   .then(currentUser => {

//       let messageObj;
//       let messageArray = [];
      
//       currentUser.subscribeToRoom({
//         roomId: roomId,
//         hooks: {
//           onMessage: message => {
//             const messageElements = document.getElementById('message-list-div')
// 						.childNodes;
//             messageObj = { text: message.text, senderId: message.senderId };
//             messageArray.push(messageObj);
//             setChatLog(messageArray);
//             setTheCurrentUser(currentUser);
// 					const messageDiv = document.createElement('li');
//           messageDiv.textContent = `${message.text}`;
          
// 					messageDiv.id = message.id;
// 					let check = false;
// 					for (let x = 0; x < messageElements.length; x++) {
// 						if (messageElements[x].id == message.id) {
// 							check = true;
// 						}
// 					}
// 					if (!check) {
// 						document.querySelector('.chat-messages').appendChild(messageDiv);
// 						if (message.senderId === localStorage.getItem('id')) {
// 							messageDiv.classList.add('sentMessage');
// 						}
// 					}
//           // return;
//           currentUser.setReadCursor({

//             roomId: roomId,

//             position: message.id,

//           });
//           document.querySelector('#messageContainer').scrollTop = 10000000;
//           //return;
// 				},
// 			},
//     });
    
//    })
//  } 

const io = require('socket.io-client')

// const socket = io.connect('http://localhost:3000')

// export function registerHandler(onMessageReceived) {
//   socket.on('message', onMessageReceived)
// }

// export function unregisterHandler() {
//   socket.off('message')
// }

// socket.on('error', function (err) {
//   console.log('received socket error:')
//   console.log(err)
// })

// export function register(name, cb) {
//   socket.emit('register', name, cb)
// }

// export function join(chatroomName, cb) {
//   socket.emit('join', chatroomName, cb)
// }

// export function leave(chatroomName, cb) {
//   socket.emit('leave', chatroomName, cb)
// }

// export function message(chatroomName, msg, cb) {
//   socket.emit('message', { chatroomName, message: msg }, cb)
// }

// export function getChatrooms(cb) {
//   socket.emit('chatrooms', null, cb)
// }

// export function getAvailableUsers(cb) {
//   socket.emit('availableUsers', null, cb)
// }