import RotaryCtrl from "../UI/RotaryCtrl"

const SM1ZP = (props) => {
    return <div>
        <h2>SM1ZP</h2>
        <p>id: {props.id}</p>
        <RotaryCtrl rotation={props.rotation} component={props.id} control="linStage"/>
    </div>
}

export default SM1ZP