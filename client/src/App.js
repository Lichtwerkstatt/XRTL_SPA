import ExperimentUILayer from "./components/UI/experimentUI/ExperimentUILayer";
import VirtualLayer from "./components/UI/experimentUI/VirtualLayer";
import { SocketContextProvider } from "./services/SocketContext";
import { PopUpContextProvider } from "./services/PopUpContext";
import { AppContextProvider } from "./services/AppContext";
import NavBar from "./components/UI/experimentUI/NavBar";
import Console from "./components/Console/Console";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";

/**
 * Assembly of the React components 
 * 
 * @description Within this class, all React components are imported and merged into one component. The resulting React component is then 
 * imported into index.js, where the rendering of the web application is handled.
 * 
 * @returns {React.ReactElement} App, including all the created React components
 */
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
          <NavBar />
          <Login />
        </PopUpContextProvider>
      </SocketContextProvider>
    </AppContextProvider>
  );
};

export default App;