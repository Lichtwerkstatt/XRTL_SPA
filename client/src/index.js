import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
//import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"
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