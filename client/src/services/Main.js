import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import "../Chat/Chat.js";

const userName = 'User ' + parseInt(Math.random() * 10);
var chatOn = true;    //For the Chat window

function Main() {
 
  return (
    <div className="Main">
      <h1>Main.js is executed!</h1>
    </div>
  )
}

export default Main
