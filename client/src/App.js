import React, { useState, useEffect } from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    setSocket(io('http://localhost:3000'));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socket.connected);
      console.log("Connection!!!");
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });

  }, [socket]);

  // manage socket connection
  const handleSocketConnection = () => {
    if (socketConnected)
      socket.disconnect();
    else {
      socket.connect();
    }
  }

  return (
    <div className="App">
      <h1>HAllo </h1>
    </div>
  );
}

export default App;