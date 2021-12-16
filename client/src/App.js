import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContextProvider } from "./services/SocketContext";
import { AppContextProvider } from "./services/AppContext";
import ExperimentUILayer from "./components/UI/ExperimentUILayer";
import Webcam from "./components/UI/Webcam"
const App = () => {

   return (
    <AppContextProvider>
      <SocketContextProvider>
        <Webcam/>
{/*      <VirtualLayer/> 
        <ExperimentUILayer />
        <Console />
        <Chat /> 
        <NavBar/> */}
      </SocketContextProvider>
    </AppContextProvider>
  );
};

export default App;
