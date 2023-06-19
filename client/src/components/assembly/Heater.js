import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';

const Heater = (props) => {
    var width = window.innerWidth

    if (props.setting) {
        width = '673px'
    } else if (!props.setting) {
        width = '350px'
    }

    return (
        <Window
            id={props.id}
            componentList={[props.controlIdHeater, props.controlIdThermistor]}
            header={props.title}
            top={props.top}
            left={props.left}
            height='340px'
            width={width}
        >
            <HeaterCtrl
                component={props.controlIdHeater}
                componentT={props.controlIdThermistor}
                setting={props.setting}
                setSetting={props.setSetting}
            />
        </Window>
    )
}
export default Heater;