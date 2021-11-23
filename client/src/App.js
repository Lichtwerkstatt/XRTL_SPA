import React, { useState, useEffect } from "react";
import io from 'socket.io-client'

const socket = io('http://localhost:7000')
const userName = 'User ' + parseInt(Math.random() * 10)
function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  var [experiment] = useState(-1)

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
        <button type="submit" onClick={(e) => { experiment = 1 }}>Experiment 1</button>
        <button type="submit" onClick={(e) => { experiment = 2 }}>Experiment 2</button>
      </form>
      

      <h3>Alles darunter kommt weg</h3> 
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
  );
}

export default App;