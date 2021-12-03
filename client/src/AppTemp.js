import MichelsonInterferometer from "./components/experiment/MichelsonInterferometer/MichelsonInterferometer"
import NavBar from "./components/UI/NavBar"
import Console from "./Console/Console"
import Chat from "./Chat/Chat"

const AppTemp = () => {
   return <>
    <NavBar />
    <MichelsonInterferometer />
    <Console/>
    <Chat/>
   </>
   
   
}

export default AppTemp