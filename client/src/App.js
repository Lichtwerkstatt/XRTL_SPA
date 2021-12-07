import { useState } from "react";
import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer";
import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContextProvider } from "./services/SocketContext";
import { AppContextProvider, useAppContext } from "./services/AppContext";

const App = () => {

   return (
    <AppContextProvider>
      <SocketContextProvider>
        {/* <VirtualLayer/> */}
        <NavBar/>
        {/* <MichelsonInterferometer />
        <Console />
        <Chat /> */}
      </SocketContextProvider>
    </AppContextProvider>
  );
};

export default App;
