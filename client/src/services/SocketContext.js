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
    const Auth = (color) => {
      setFontColor(color);
      socket.emit('newUserInfo', username)
    }

    const connect = (e) => {
      setConnected(true)
      appCtx.addLog("Server : Client connected to " + URL)
    }

    const disconnect = (e) => {
      setConnected(false)
      appCtx.addLog("Server : Client disconnect.")
    }

    socket.on('connect', connect);

    socket.on('disconnect', disconnect)

    socket.on('Auth', Auth);

    if (appCtx.lastClosedComponent === 'screen') {
      socket.emit("leave stream room", { controlId: 'screen', userId: username });
      appCtx.toogleLastComp();
    }

    if (appCtx.lastClosedComponent === 'overview') {
      socket.emit("leave stream room", { controlId: 'overview', userId: username });
      appCtx.toogleLastComp();
     /*  socket.emit('watcher disconnect');
      appCtx.toogleLastComp(); */
    }

    return (() => {
      socket.removeAllListeners('Auth', Auth)
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
    if (username && username.includes('digiPHOTON')) {
      setUsername('Supervisor')
    } else {
      setUsername(username);
    }
  }

  const setNewFont = (newFont) => {
    setFontColor(newFont);
  }

  const toggleConnection = (username) => {
    if (!connected) {
      var payload = {
        sub: username,
        component: 'client',
        iat: Date.now(),
        exp: Date.now() + 1800000,
      }

      var token = jwt.sign(payload, "keysecret");
      socket.auth = { token: token }
      //secure: true, rejectUnauthorized: false}
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
