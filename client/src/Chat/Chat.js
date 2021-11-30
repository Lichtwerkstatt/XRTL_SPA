import React, { useState, useEffect } from "react";
import { socket } from "../services/socket";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

const userName = 'User ' + parseInt(Math.random() * 10);
var chatOn = true;    //For the Chat window

function Chat() {
  let navigate = useNavigate();
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

        <button type="submit" onClick={(e) => { navigate("/MichelsonInterferometer") }}>Experiment 1</button>
        <button type="submit" onClick={(e) => { navigate("/MichelsonInterferometer") }}> Experiment 2</button>

      <button onClick={(e) => { //onClick the Chat window will disappear
          if (chatOn == true) {
            document.getElementById("Chat").style.display = "none";   //Chat is now hidden
            chatOn = false;    //That for the next click the Chat will appear
          } else {
            document.getElementById("Chat").style.display = "flex";   //Chat is visible
            chatOn = true;    //That for the next click the Chat will disappear
          }

        }}>Chat</button>
      <div className="Chat" id="Chat">
        <div className="Messages">
        {chat.map((payload, index) => {
          return (
            <b key={index}>{payload.userName}: <span>{payload.message}</span></b>
          )
        })}
         </div>
        <form onSubmit={sendMessage}>
          <input type="text" name="message"
            placeholder='Type message'
            value={message}
            onChange={(e) => { setMessage(e.target.value) }}
            required
          ></input>
          <button type='submit'>Send</button>
        </form>

       
      </div>
      <b>HALLO</b>
    </div>
  )
}

export default Chat
