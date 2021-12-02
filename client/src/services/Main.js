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
        <ul id="On">
          <li id="ChatOn" class="ChatOn" onClick={(e) => { //onClick the Chat window will disappear
            
              document.getElementById("Chat").style.display = "flex";   //Chat is now hidden
              document.getElementById("ChatOff").style.display = "flex";
              document.getElementById("ChatOn").style.display = "none";
              chatOn = false;    //That for the next click the Chat will appear
            
          }}><span></span></li>
          
          
          <li id="ChatOff" class="ChatOff" onClick={(e) => { //onClick the Chat window will disappear
            
              document.getElementById("Chat").style.display = "none";   //Chat is visible
              document.getElementById("ChatOff").style.display = "none";
              document.getElementById("ChatOn").style.display = "flex";
              chatOn = true;    //That for the next click the Chat will disappear
            
          }}><span></span></li>

        </ul>
      <div className="Chat" id="Chat">

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
