import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { useNavigate } from "react-router-dom";
import "../Chat/Chat.js";


const userName = 'User ' + parseInt(Math.random() * 10);
var chatOn = true;    //For the Chat window

function Main() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message', { userName, message })
    setMessage('')
  };

  return (
    <div className="OuterChater">
      <h1>Chat</h1>
      <div className="Chat" id="Chat">
        <ul id="On">
          <li class="ChatOn" onClick={(e) => { //onClick the Chat window will disappear
            if (chatOn == true) {
              document.getElementById("Chat").style.display = "none";   //Chat is now hidden
              chatOn = false;    //That for the next click the Chat will appear
            } else {
              document.getElementById("Chat").style.display = "flex";   //Chat is visible
              chatOn = true;    //That for the next click the Chat will disappear
            }
          }}><span></span></li>
        </ul>

        <div className="Messages">
          {chat.map((payload, index) => {
            return (
              <b key={index}>{payload.userName}: <span>{payload.message}</span></b>
            )
          })}

          <form onSubmit={sendMessage}>
            <input type="text" name="message"
              placeholder='Type message'
              value={message}
              onChange={(e) => { setMessage(e.target.value) }}
              required
            ></input>
            <button classe="Chat Send" type='submit'>Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Main
