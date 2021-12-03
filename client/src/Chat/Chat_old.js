import React, { useState, useEffect } from "react";
import { socket } from "../services/socket";
import "./Chat.css";

const userName = 'User ' + parseInt(Math.random() * 10);
var chatOn = true;    //For the Chat window

function Chat() {
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

      <ul id="On">
        {/* Button on the left side */}
        <li id="ChatOn" class="ChatOn" onClick={(e) => { //onClick the Chat window will appear
          if (chatOn === false) {
            document.getElementById("Frame").style.display = "flex";    //Chat is now hidden
            document.getElementById("ChatOff").style.display = "flex"; //Button on the right side will appear
            document.getElementById("ChatOn").style.display = "none"; //Button on the left side will disappear
            chatOn = true;    //That for the next click the Chat will disappear
          } else {
            console.log('Chat could not be minimised!')
          }
        }}><span></span></li>

        {/* Button on the right side */}
        <li id="ChatOff" class="ChatOff" onClick={(e) => { //onClick the Chat window will disappear
          if (chatOn === true) {
            document.getElementById("Frame").style.display = "none";   //Chat is visible
            document.getElementById("ChatOff").style.display = "none"; //Button on the right side will disappear
            document.getElementById("ChatOn").style.display = "flex"; //Button on the left side will appear
            chatOn = false;    //That for the next click the Chat will appear
          } else {
            console.log('Chat could not be maximised!')

          }
        }}><span></span></li>

      </ul>
      <div className="Frame" id="Frame">
        <div className="Chat" id="Chat">
          <h1>Chat</h1>
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
    </div>
  )
}

export default Chat
