import { useState, useContext, useEffect, createContext } from "react";
import { useAppContext } from "./AppContext";
import { Manager } from "socket.io-client";

var manager = new Manager("", { autoConnect: false });
var socket = manager.socket("/");
var SocketContext = createContext();

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(true);
  const [username, setUsername] = useState('');
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

  const setNewURL = (newURL, username) => {
    setUsername(username)
    setURL(newURL);
    socket.disconnect();
    manager = new Manager(newURL, { autoConnect: false });
    socket = manager.socket("/");
    SocketContext = createContext();
  }

  const setNewFont = (newFont) => {
    setFontColor(newFont);
  }

  const toggleConnection = () => {
    if (!connected) {
      socket.connect();
      setConnected(true)
      appCtx.addLog("Client connected to " + URL + " by choice.")
      appCtx.setShowLogin(false)
    } else {
      appCtx.setShowLogin(true);
      setUsername("");
      setNewURL("");
      socket.close();
      setConnected(false)
      appCtx.addLog("Client disconnected by choice.")
    }
  }

  return (
    <SocketContext.Provider value={{ socket, connected, toggleConnection, setNewURL, setNewFont, username, fontColor }}>
      {children}
    </SocketContext.Provider>
  );
}
