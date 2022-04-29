import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "./AppContext";
import { Manager } from "socket.io-client";

var URLglobal = ""; //http://192.168.1.42:7000"   //192.168.4.1:7000   Raspberry Pi ID oder wlan 192.168.1.?

var manager = new Manager(URLglobal, { autoConnect: false });
var socket = manager.socket("/");
var SocketContext = React.createContext();

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(true);
  const [userId, setUserId] = useState('');
  const [URL, setURL] = useState('');
  const [fontColor, setFontColor] = useState('white');
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

  const setNewUsername = (newUsername) => {
    console.log(newUsername)
    setUserId(newUsername);
    
  }

  const setNewURL = (newURL, user) => {
    setURL(newURL);
    URLglobal = newURL;
    socket.disconnect();
    manager = new Manager(URLglobal, { autoConnect: false });
    socket = manager.socket("/");
    SocketContext = React.createContext();
    console.log(user);
    socket.emit("userId", (user))
  }

  const setNewFont = (newFont) => {
    setFontColor(newFont);
  }

  const getNewUsername = () => {
    return userId;
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
