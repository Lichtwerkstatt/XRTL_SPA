import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Chat from "./Chat/Chat";
import Console from "./Console/Console"

//import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"

ReactDOM.render(
  <React.StrictMode>
    {/* Inject Experiment here. */}
    {/*<MichelsonInterferometer />*/}
     {/* <App />  */}
     <Console/>
  </React.StrictMode>,
  document.getElementById("root")
);