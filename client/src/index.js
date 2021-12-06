import React from "react";
import ReactDOM from "react-dom";
//import App from "./App";
//import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"
import AppTemp from "./AppTemp"
import "./index.css"

ReactDOM.render(
  <>
    {/* Inject Experiment here. */}
    {/*<MichelsonInterferometer />*/}
    {/* <App /> */}  
    <AppTemp />
    
  </>,
  document.getElementById("root")
);