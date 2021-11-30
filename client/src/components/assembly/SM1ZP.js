import RotaryCtrl from "../UI/RotaryCtrl"
import Window from "../UI/Window"

const SM1ZP = (props) => {
    return <Window header={props.title+" ("+props.id+")"} top={props.top} left={props.left}>
        <RotaryCtrl rotation={props.rotation} component={props.id} control="linStage" />
    </Window>
}

export default SM1ZP

