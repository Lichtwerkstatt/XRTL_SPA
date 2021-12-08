import React, { useState, useContext, useEffect } from "react";

const {Manager} = require("socket.io-client")

const manager = new Manager("http://localhost:7000", {autoConnect: false})
const socket = manager.socket("/")

const SocketContext = React.createContext();

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
      socket.on('connect', (e)=> {
          setConnected(true)
          console.log("connected!",e)
      })
      socket.on('disconnect', (e) => {
          setConnected(false)
          console.log('disconnected', e)
      })
  })

  const toggleConnection = () => {
      console.log(connected)
      if (!connected) {
          console.log(socket.connect());
          setConnected(true)
      } else {
          console.log(socket.close())
          setConnected(false)
      }
  }
  
  return (
    <SocketContext.Provider value={{ socket, connected, toggleConnection }}>
      {children}
    </SocketContext.Provider>
  );
}
