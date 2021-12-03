import React, { useState, useEffect } from "react";
import { socket } from "./services/socket";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Main from "./services/Main";
import Error from "./services/ErrorPage";
import MichelsonInterferometer from "./components/UI/RotaryCtrl";


export default function App() {

  return (
    <Router>
      <nav> 
        <Link to="/">Back to the start page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/MichelsonInterferometer" element={<MichelsonInterferometer />}/>
        
        <Route path="*" element= {<Error/>}/>
      </Routes>
    </Router>
  );
}
