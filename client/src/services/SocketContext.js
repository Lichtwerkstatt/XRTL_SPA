import { useState, useContext, useEffect, createContext } from "react";
import { useAppContext } from "./AppContext";
import { Manager } from "socket.io-client";

var manager = new Manager("", { autoConnect: false });
var socket = manager.socket("/");
var SocketContext = createContext();
var jwt = require('jsonwebtoken');

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [URL, setURL] = useState('');
  const [fontColor, setFontColor] = useState('white');
  const appCtx = useAppContext();

  useEffect(() => {
    const connect = (e) => {
      setConnected(true)
      appCtx.addLog("Server : Client connected to " + URL)
      appCtx.setSocket(socket);
      appCtx.setUsername(username);
    }

    const disconnect = (e) => {
      setConnected(false)
      appCtx.addLog("Server : Client disconnect.")
    }

    socket.on('connect', connect);

    socket.on('disconnect', disconnect)

    /*  if (appCtx.lastClosedComponent === 'screen' || appCtx.lastClosedComponent === 'heater') {
       socket.emit("leave stream room", { controlId: appCtx.lastClosedComponent , userId: username });
       appCtx.toogleLastComp();
     } */

    return (() => {
      socket.removeAllListeners('connect', connect)
      socket.removeAllListeners('disconnect', disconnect)
    })
  })

  const helperEmit = (event, payload) => {
    socket.emit(event, payload)
  }

  const setNewURL = (newURL, username) => {
    socket.disconnect();
    manager = new Manager(newURL, { autoConnect: false });
    socket = manager.socket("/");
    SocketContext = createContext();
    setURL(newURL);
    setUsername(username);
  }

  const setNewFont = (newFont) => {
    setFontColor(newFont);
  }

  const toggleConnection = (username, accessCode) => {
    if (!connected) {
      var payload = {
        sub: username,
        code: accessCode,
        component: 'client',
        iat: Date.now(),
      }

      var token = jwt.sign(payload, "keysecret");
      socket.auth = { token: token }
      socket.connect();

      setConnected(true)
      appCtx.addLog("Client connected by choice.")
    } else {
      setConnected(false)
      setUsername("");
      setNewURL("");
      socket.close();
      appCtx.addLog("Client disconnected by choice.")
    }
  }

  return (
    <SocketContext.Provider value={{ socket, connected, toggleConnection, setNewURL, setNewFont, username, fontColor, helperEmit }}>
      {children}
    </SocketContext.Provider>
  );
}
