import KM100 from "../../assembly/KM100"
import SM1ZP from "../../assembly/SM1ZP"

const MichelsonInterferometer = () => { 
    
    return <div>
        <h1>Michelson Interferometer</h1>
        <KM100 id="km100_1" rotationTop="0" rotationBottom="0" />
        <KM100 id="km100_2" rotationTop="0" rotationBottom="0" />
        <SM1ZP id="sm1zp_1" rotation="0"/>
        </div>}


export default MichelsonInterferometer