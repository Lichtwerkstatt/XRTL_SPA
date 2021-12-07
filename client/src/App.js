import { useState } from "react";
import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer";
import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContext } from "./services/SocketContext";
import { AppContextProvider, useAppContext } from "./services/AppContext";

const App = () => {

   return (
    <AppContextProvider>
      <SocketContext.Provider>
        <VirtualLayer/>
        <NavBar/>
        <MichelsonInterferometer />
        <Console />
        <Chat />
      </SocketContext.Provider>
    </AppContextProvider>
  );
};

export default App;
