import React, { useEffect, useState, useReducer } from "react";
import MessageInput from "./MessageInput";
import ChatList from "./ChatList";
import "./Messaging.scss";
import io from "socket.io-client";
import axios from "axios";
import { initState, messageReducer } from './chatReducer'

let socket;

const Inbox = () => {

  const [state, dispatch] = useReducer(messageReducer, initState)

  const lastChat = localStorage.getItem('chatId');
  const [currentRoom, setCurrentRoom] = useState(lastChat);
  const [newMessage, setNewMessage] = useState("");

  const ENDPOINT = "localhost:3300";
  const userId = localStorage.getItem("id");

  useEffect(() => {
    socket = io(ENDPOINT);
    if (currentRoom) {
      socket.emit("join", { userId, room: currentRoom });
      axios
        .get(`http://${ENDPOINT}/api/${currentRoom}`)
        .then((res) => dispatch({ type: 'FETCH_HISTORY_SUCCESS', payload: res.data}));
    }
    socket.on("message", (message) => {
      dispatch({ type: 'UPDATE_LIVE_MESSAGE', payload: message});
    });
    return () => {
      socket.emit("disconnect");
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = (roomId) => {
    if (newMessage) {
      socket.emit("sendMessage", newMessage, currentRoom, userId);
      const savedMessage = {
        sender: userId,
        content: newMessage,
      };
      axios
        .post(`http://${ENDPOINT}/api/${currentRoom}`, savedMessage)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const changeRoom = (roomId) => {
    setCurrentRoom(roomId)
    localStorage.setItem('chatId', roomId)
    socket.emit("changeRoom", { userId, room: roomId });
          axios
            .get(`http://${ENDPOINT}/api/${roomId}`)
            .then((res) => dispatch({ type: 'FETCH_HISTORY_SUCCESS', payload: res.data}));
  };

  return (
    <div className="inbox-container">
      <aside className="inbox-left-sidebar">
        <div className="chat-sidebar-header">
          <h3 onClick={changeRoom}>Chat</h3>
          <p>Select a conversation to chat</p>
        </div>
        <ChatList
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          changeRoom={changeRoom}
        />
      </aside>
      <section className="chat-screen">
        {/* <header className="chat-header">{currentRoom.displayName}</header> */}
        <div className="message-container-container">
          <div className="message-container" id="messageContainer">
            <ul className="chat-messages" id="message-list-div">
              {state.messages.map((message) => (
                <li
                  key={message.created_at}
                  className={
                    message.sender === userId
                      ? "messageDiv sentMessage"
                      : "messageDiv"
                  }
                >
                  {message.content}
                </li>
              ))}
            </ul>
            <div name="chatAnchor"></div>
          </div>
        </div>
        <div className="chat-footer">
          <MessageInput
            sendMessage={sendMessage}
            currentRoom={currentRoom}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </div>
      </section>
    </div>
  );
};

export default Inbox;
