import React, { useState, useEffect } from "react";
import { socket } from "../services/socket";
import "./Console.css";

const userName = 'User ' + parseInt(Math.random() * 10);
var consoleOn = true;    //For the Chat window

function Console() {
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
        <div className="FrameCon">
            <div className='Console' id="Console">
  
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

            <div className="Buttons">
                <ul id="On">
                    {/* Button on the left side */}
                    <li id="ConsoleOn" class="ConsoleOn" onClick={(e) => { //onClick the Chat window will appear
                        if (consoleOn === false) {
                            document.getElementById("Console").style.display = "flex";    //Chat is now hidden
                            document.getElementById("ConsoleOff").style.display = "flex"; //Button on the right side will appear
                            document.getElementById("ConsoleOn").style.display = "none"; //Button on the left side will disappear
                            consoleOn = true;    //That for the next click the Chat will disappear
                        } else {
                            console.log('Console could not be minimised!')
                        }
                    }}><span></span></li>

                    {/* Button on the right side */}
                    <li id="ConsoleOff" class="ConsoleOff" onClick={(e) => { //onClick the Chat window will disappear
                        if (consoleOn === true) {
                            document.getElementById("Console").style.display = "none";   //Chat is visible
                            document.getElementById("ConsoleOff").style.display = "none"; //Button on the right side will disappear
                            document.getElementById("ConsoleOn").style.display = "flex"; //Button on the left side will appear
                            consoleOn = false;    //That for the next click the Chat will appear
                        } else {
                            console.log('Console could not be maximised!')

                        }
                    }}><span></span></li>
                </ul>

            </div>
        </div>
    )
}

export default Console
