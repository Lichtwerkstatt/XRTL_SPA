import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "./AppContext";

const { Manager } = require("socket.io-client")


const URL = "http://localhost:7000"   //192.168.4.1:7000   Raspberry Pi ID oder wlan 192.168.1.?

const manager = new Manager(URL, { autoConnect: false })
const socket = manager.socket("/")

const SocketContext = React.createContext();

export function useSocketContext() {
  const [username, setUsername] = useState('');
  const [URL, setURL] = useState('');

  const setNewUsername = (newUsername) => {
    setUsername(newUsername);
  }

  const setNewURL = (newURL) => {
    setURL(newURL);
  }
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(false);


  const appCtx = useAppContext()

  useEffect(() => {
    socket.on('connect', (e) => {
      setConnected(true)
      appCtx.addLog("Server : Client connected to " + URL)
    })
    socket.on('disconnect', (e) => {
      setConnected(false)
      appCtx.addLog("Server : Client disconnect.")
    })
    socket.on('status', payload => {
      if (payload.status.busy) { appCtx.addBusyComp(payload.componentId) } else {
        appCtx.removeBusyComp(payload.componentId)
      }
    })
  })


//trigger einfügen?, damit bei auflösen der Connection login angezeigt wird??
  const toggleConnection = () => {
    console.log(connected)
    if (!connected) {
      console.log(socket.connect());
      setConnected(true)
      appCtx.addLog("Client connected to " + URL + " by choice.")
    } else {
      console.log(socket.close())
      setConnected(false)
      appCtx.addLog("Client disconnected by choice.")
    }
  }

  return (
    <SocketContext.Provider value={{ socket, connected, toggleConnection }}>
      {children}
    </SocketContext.Provider>
  );
}
