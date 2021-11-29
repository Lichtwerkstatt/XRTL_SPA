import RotaryCtrl from "../UI/RotaryCtrl"
import Window from "../UI/Window"

const KM100 = (props) => {
    return <Window header={props.title + " ("+ props.id+")"} footer={props.footer}>
        <RotaryCtrl rotation={props.rotationTop} component={props.id} control="top" />
        <RotaryCtrl rotation={props.rotationBottom} component={props.id} control="bottom" />
        </Window>
}

export default KM100