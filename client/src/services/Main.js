import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { useNavigate } from "react-router-dom";

const userName = 'User ' + parseInt(Math.random() * 10);

function Main() {
  let navigate = useNavigate();
  var [experiment] = useState(-1)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

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

  const ex = (e) => {
    e.preventDefault();
    socket.emit('Experiment', { experiment })
  }
  return (
    <div className="App">
      <h1>Welcome to the experiments!</h1>
      <form onClick={ex}>
        <button type="submit" onClick={(e) => { navigate("/MichelsonInterferometer") }}>Experiment 1</button>
        <button type="submit" onClick={(e) => { experiment = 2 }}>Experiment 2</button>
      </form>

      <form onSubmit={sendMessage}>
        <input type="text" name="message"
          placeholder='Type message'
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
          required
        ></input>
        <button type='submit'>Send</button>
      </form>
      {chat.map((payload, index) => {
        return (
          <h3 key={index}>{payload.userName}: <span>{payload.message}</span></h3>
        )
      })}
    </div>
  )
}

export default Main
