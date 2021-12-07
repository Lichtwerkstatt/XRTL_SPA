import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"
import NavBar from "./components/UI/NavBar"
import Console from "./Console/Console"
import Chat from "./Chat/Chat"
import VirtualLayer from "./components/UI/VirtualLayer"

const AppTemp = () => {
   return <>
   <VirtualLayer />
    <NavBar />
    <MichelsonInterferometer />
    <Console addLog="App started..."/>
    <Chat/>
    
    <Chat/>
   </>
}

export default AppTemp