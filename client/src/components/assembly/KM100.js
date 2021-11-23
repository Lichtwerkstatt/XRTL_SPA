import RotaryCtrl from "../UI/RotaryCtrl"

const KM100 = (props) => {
    console.log(props)
    return <div>
        <h2>KM100</h2>
        <p>id: {props.id}</p>
        <RotaryCtrl rotation={props.rotationTop} component={props.id} />
        <RotaryCtrl rotation={props.rotationBottom} component={props.id}/>
    </div>
}

export default KM100