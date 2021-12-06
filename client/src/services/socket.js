
/* import io from 'socket.io-client'

//export const socket = io.connect("http://192.168.4.1:7000")
export const socket = io.connect("http://192.168.4.1:7000") */

import socketio from "socket.io-client";
import React from "react";

export const socket = socketio('"http://192.168.4.1:7000"',  {transports: ['websocket']});
export const SocketContext = React.createContext();
