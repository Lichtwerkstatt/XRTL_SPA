import RotaryCtrl from "../UI/RotaryCtrl"

const KM100 = (props) => {
    console.log(props)
    return <div>
        <h2>KM100</h2>
        <p>id: {props.id}</p>
        <RotaryCtrl rotation={props.rotationTop} />
        <RotaryCtrl rotation={props.rotationBottom}/>
    </div>
}

export default KM100