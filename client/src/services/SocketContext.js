import { useState, useContext, useEffect, createContext } from "react";
import { useAppContext } from "./AppContext";
import { Manager } from "socket.io-client";

// To create the JSON Web Token
var jwt = require('jsonwebtoken');
//Manager is used because due to its ability to reconnect if the connection to the sever was disrupted
var manager = new Manager("", { autoConnect: false });
var SocketContext = createContext();
var socket = manager.socket("/");

export function useSocketContext() {
  return useContext(SocketContext);
}

/**
 * SocketContext
 * 
 * @description This ContextProvider holds the connection to the server in the variable socket. After 
 * successfull establishing a connection to the server, the socket variable can be used to recieve events from the server 
 * or send events to it, if imported, within a React component.  
 * 
 * @returns {React.Context} Socket context
 */
export function SocketContextProvider({ children }) {
  // Color in used within the chat and in which the LED rings flashes, when adjusted
  const [fontColor, setFontColor] = useState('white');
  // Holds the information if connection to the server was sucessfull
  const [connected, setConnected] = useState(false);
  // Contains the username set during the login process
  const [username, setUsername] = useState('');
  // Contains the server adress set during in the login component
  const [URL, setURL] = useState('');

  const appCtx = useAppContext();

  useEffect(() => {
    // If connection was successfull, than this event is recieved
    const connect = (e) => {
      setConnected(true);

      // to set globally these information
      appCtx.addLog("Server : Client connected to " + URL);
      appCtx.setSocket(socket);
      appCtx.setUsername(username);
    }

    // If connection was disconnected
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

  // During the login process is this function called, to set globally the server adress to connect to and
  // the username of the web application client
  const setNewURL = (newURL, username) => {
    socket.disconnect();
    manager = new Manager(newURL, { autoConnect: false });
    socket = manager.socket("/");
    SocketContext = createContext();
    setURL(newURL);

    if (username && username.includes('digiPHOTON') && username.includes('digiPHOTON')) {
      setUsername('Supervisor')
    } else {
      setUsername(username);
    }
  }

  // Establishs a connetion to a server or disconnects from it
  const toggleConnection = (username) => {
    if (!connected) {
      // Creation of the JSON Web Token payload
      var payload = { sub: username, component: 'client', }
      // Encryption of the JSON Web Token 
      var token = jwt.sign(payload, "keysecret");

      // Insertion of the token into the socket 
      socket.auth = { token: token }
      // Trying th establish a connection to the serveradress 
      socket.connect();
      // To inform the other users of the web application, that a new client connected to the server
      socket.emit('newUser', username)
      setConnected(true)
      appCtx.addLog("Client connected by choice.")
    } else {
      //Disconnects from the server
      setConnected(false)
      setUsername("");
      setNewURL("");
      socket.close();
      appCtx.addLog("Client disconnected by choice.")
    }
  }

  return (
    <SocketContext.Provider value={{ socket, connected, setConnected, toggleConnection, setNewURL, setFontColor, username, fontColor }}>
      {children}
    </SocketContext.Provider>
  );
}
