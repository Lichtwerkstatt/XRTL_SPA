import ReactDOM from "react-dom";
import React from "react";
import App from "./App";
import "./index.css"

/**
 * Recat app rendering in browser
 * 
 * @description Handling the rendering of the React app within the browser. Is the JavaScript entry point.
 * 
 * @returns {React.ReactElement} React App for the display within the browser
 */

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById("root")
);