import KM100 from "../../assembly/KM100"
import SM1ZP from "../../assembly/SM1ZP"

const MichelsonInterferometer = () => { 
    
    return <div>
        <h1>Michelson Interferometer</h1>
        <KM100 id="km100_1" />
        <KM100 id="km100_2" />
        <SM1ZP id="sm1zp_1" />
        </div>}

export default MichelsonInterferometer