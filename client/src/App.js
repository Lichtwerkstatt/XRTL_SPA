import NavBar from "./components/UI/NavBar";
import Console from "./components/Console/Console";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import VirtualLayer from "./components/UI/VirtualLayer";
import { SocketContextProvider } from "./services/SocketContext";
import { AppContextProvider } from "./services/AppContext";
import ExperimentUILayer from "./components/UI/ExperimentUILayer";
import Cam from "./components/Chat/Webcam";
import {PopUpContextProvider} from "./services/PopUpContext"
//import { WebView } from 'react-native-webview';

const App = () => {
  process.title = 'XRTLApp';
  return (
    <AppContextProvider>
      <SocketContextProvider>
          <VirtualLayer />
        <PopUpContextProvider>
          <ExperimentUILayer />
          <Console />
          <Chat />
          <Cam />
          <NavBar />
          <Login />
        </PopUpContextProvider>
      </SocketContextProvider>
    </AppContextProvider>
  );
};

export default App;