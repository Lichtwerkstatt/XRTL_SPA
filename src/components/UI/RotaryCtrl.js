import { useState } from "react"

const RotaryCtrl = (props) => {
    console.log(props.rotation)

    const [rotation, setRotation] = useState(props.rotation)

    const rotCW_Handler=()=>{
        console.log("handling CW rotation")
    }

    const rotCCW_Handler=()=>{
        console.log("handling CCW rotation")
    }

    return <form>
        <input type="number" min="0" max="100" value={rotation}/>
        <button onClick={rotCW_Handler}> CW</button>
        <button onClick={rotCCW_Handler}>CCW</button>
    </form>
} 

export default RotaryCtrl