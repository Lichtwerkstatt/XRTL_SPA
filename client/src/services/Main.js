import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import { useNavigate } from "react-router-dom";

function Main() {
  let navigate = useNavigate();
  var [experiment] = useState(-1)

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
    </div>
  )
}

export default Main
