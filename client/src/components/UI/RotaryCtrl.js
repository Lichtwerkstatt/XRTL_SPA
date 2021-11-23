import { useState } from "react"

const RotaryCtrl = (props) => {

    const [rotation, setRotation] = useState(props.rotation)

    const changeRotationHandler=(event)=>{
        setRotation(event.target.value)
    }

    const rotCW_Handler=(event)=>{
        event.preventDefault()
        console.log(props.component," CW rotation: ",rotation)
    }

    const rotCCW_Handler=(event)=>{
        event.preventDefault()
        console.log(props.component," CCW rotation: ",rotation)
    }

    return <form>
        <input type="number" min="0" max="100" value={rotation} onChange={changeRotationHandler}/>
        <button onClick={rotCW_Handler}> CW</button>
        <button onClick={rotCCW_Handler}>CCW</button>
    </form>
} 

export default RotaryCtrl