import RotaryCtrl from "../UI/RotaryCtrl"
import Modal from "../UI/Modal"

const KM100 = (props) => {
    return <div>
        <h2>KM100</h2>
        <p>id: {props.id}</p>
        <RotaryCtrl rotation={props.rotationTop} component={props.id} control="top" />
        <RotaryCtrl rotation={props.rotationBottom} component={props.id} control="bottom" />
        </div>
}

export default KM100