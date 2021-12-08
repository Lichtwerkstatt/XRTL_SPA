import { useState } from "react";
import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer";
import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContextProvider } from "./services/SocketContext";
import { AppContextProvider, useAppContext } from "./services/AppContext";
import ExperimentUILayer from "./components/UI/ExperimentUILayer";

const App = () => {

   return (
    <AppContextProvider>
      <SocketContextProvider>
        <VirtualLayer/> 
        <ExperimentUILayer />
        <Console />
        <Chat /> 
        <NavBar/>
      </SocketContextProvider>
    </AppContextProvider>
  );
};

export default App;
