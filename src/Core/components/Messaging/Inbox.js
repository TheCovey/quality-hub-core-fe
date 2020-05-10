import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import ChatList from "./ChatList";
import "./Messaging.scss";
import io from "socket.io-client";
import axios from "axios";

let socket;

const Inbox = ({ location }) => {

  const redirect = location.pathname.split("/")[3];
  const [currentRoom, setCurrentRoom] = useState(redirect || "ck6e641ap00630760d1ye5sr6ck9ykjhty00fa0760l316vd98");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const ENDPOINT = "localhost:3300";
  const userId = localStorage.getItem("id");
 console.log(userId, 'this')
  useEffect(() => {
    socket = io(ENDPOINT);
    if (currentRoom) {
      socket.emit("join", { userId, room: currentRoom });
      axios
        .get(`http://${ENDPOINT}/api/${currentRoom}`)
        .then((res) => setMessages([...res.data, ...messages]));
    }
    return () => {
      socket.emit("disconnect");
      // console.log("unmount");
      socket.disconnect();
      // socket.off();
    };
  }, [userId]);

  const sendMessage = () => {
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
    console.log(messages, newMessage, socket.id);
  };

  const changeRoom = (roomId) => {
    setMessages([]);
    socket.emit("changeRoom", { userId, room: roomId });
          axios
            .get(`http://${ENDPOINT}/api/${currentRoom}`)
            .then((res) => setMessages([...res.data]));

  };
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // useEffect(() => {
  //   const fetchOldMessages = () => {
  //     setMessages([]);
  //     axios
  //       .get(`http://${ENDPOINT}/api/${currentRoom}`)
  //       .then((res) => setMessages([...res.data]));
  //   };
  //   fetchOldMessages();
  // }, [currentRoom]);

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
              {messages.map((message) => (
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
