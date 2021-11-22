const RotaryCtrl = (props) => {

    const rotCW_Handler=()=>{
        console.log("handling CW rotation")
    }

    const rotCCW_Handler=()=>{
        console.log("handling CCW rotation")
    }

    return <form>
        <input type="number" min="0" max="100" />
        <button onClick={rotCW_Handler}> CW</button>
        <button onClick={rotCCW_Handler}>CCW</button>
    </form>
} 

export default RotaryCtrl