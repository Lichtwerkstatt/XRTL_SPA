import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Chat from "./Chat/Chat";
import Console from "./Console/Console"

import App from "./App";
import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"
import AppTemp from "./AppTemp"

ReactDOM.render(
  <React.StrictMode>
    {/* Inject Experiment here. */}
    {/*<MichelsonInterferometer />*/}
    {/* <App /> */}    
    <AppTemp />
  </React.StrictMode>,
  document.getElementById("root")
);