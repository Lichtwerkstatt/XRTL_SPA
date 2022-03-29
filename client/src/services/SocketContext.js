import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "./AppContext";
import { Manager } from "socket.io-client";

var URL = "http://localhost:7000";      //"http://192.168.1.42:7000"   //192.168.4.1:7000   Raspberry Pi ID oder wlan 192.168.1.?

const manager = new Manager(URL, { autoConnect: false });
const socket = manager.socket("/");
const SocketContext = React.createContext();

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const appCtx = useAppContext()
  const [username, setUsername] = useState('');
  const [URL, setURL] = useState('');
  const [fontColor, setFontColor] = useState('white');


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

  const setNewUsername = (newUsername) => {
    setUsername(newUsername);
  }

  const setNewURL = (newURL) => {
    setURL(newURL);
  }

  const setNewFont = (newFont) => {
    setFontColor(newFont);
  }

  const getNewUsername = () => {
    return username;
  }

  const getNewURL = () => {
    console.log(URL)
    return URL;
  }

  const getNewFont = () => {
    return fontColor;
  }

  const toggleConnection = () => {
    //console.log(connected)
    if (!connected) {
      console.log(socket.connect());
      setConnected(true)
      appCtx.addLog("Client connected to " + URL + " by choice.")
      appCtx.setShowLogin(false)
    } else {
      appCtx.setShowLogin(true);
      setNewUsername("");
      setNewURL("");
      console.log(socket.close())
      setConnected(false)
      appCtx.addLog("Client disconnected by choice.")
    }
  }

  return (
    <SocketContext.Provider value={{ socket, connected, toggleConnection, setNewURL, setNewUsername, setNewFont, getNewURL, getNewUsername, getNewFont }}>
      {children}
    </SocketContext.Provider>
  );
}
