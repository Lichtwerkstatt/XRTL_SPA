import { useState, useContext, useEffect, createContext } from "react";
import { useAppContext } from "./AppContext";
import { Manager } from "socket.io-client";

var manager = new Manager("", { autoConnect: false });
var SocketContext = createContext();
var jwt = require('jsonwebtoken');
var socket = manager.socket("/");

export function useSocketContext() {
  return useContext(SocketContext);
}

export function SocketContextProvider({ children }) {
  const [fontColor, setFontColor] = useState('white');
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [URL, setURL] = useState('');

  const appCtx = useAppContext();

  useEffect(() => {
    const connect = (e) => {
      setConnected(true);

      appCtx.addLog("Server : Client connected to " + URL);
      appCtx.setSocket(socket);
      appCtx.setUsername(username);
    }

    const disconnect = (e) => {
      setConnected(false)
      appCtx.addLog("Server : Client disconnect.")
    }

    socket.on('connect', connect);

    socket.on('disconnect', disconnect)

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

  }

  const toggleConnection = (username) => {
    if (!connected) {
      var payload = { sub: username }
      //How to admin :)
      var key = username === 'admin' ? username : 'keysecret'
      var token = jwt.sign(payload, key, { header: { kid: username === 'admin' ? 'admin' : 'client' } });


      socket.auth = { token: token }
      socket.connect();
      socket.emit('userId', username)
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
    <SocketContext.Provider value={{ socket, connected, toggleConnection, setNewURL, setFontColor, username, fontColor, helperEmit }}>
      {children}
    </SocketContext.Provider>
  );
}
