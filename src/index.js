import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";

import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"

ReactDOM.render(
  <React.StrictMode>
    {/* Inject Experiment here. */}
    <MichelsonInterferometer />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
