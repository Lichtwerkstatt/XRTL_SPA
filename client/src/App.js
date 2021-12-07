import { useState } from "react";
import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer";
import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContext } from "./services/SocketContext";

const AppTemp = () => {

  const [autoRotate, toggleAutoRotate] = useState('true')

  return (
    <SocketContext.Provider>
      <VirtualLayer autoRotate={autoRotate} />
      <NavBar toggleRotate={() => toggleAutoRotate(!autoRotate)} />
      <MichelsonInterferometer />
      <Console />
      <Chat />
    </SocketContext.Provider>
  );
};

export default AppTemp;
