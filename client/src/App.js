import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContextProvider } from "./services/SocketContext";
import { AppContextProvider } from "./services/AppContext";
import ExperimentUILayer from "./components/UI/ExperimentUILayer";
import Cam from "./components/Chat/Webcam";


const App = () => {

  return (
    <AppContextProvider>
      <SocketContextProvider>
        {/*         <VirtualLayer/> 
        <ExperimentUILayer />
      <Chat />  */}
        <Cam />
        <Console />
        <NavBar />
      </SocketContextProvider>
    </AppContextProvider>
  );
};

export default App;
