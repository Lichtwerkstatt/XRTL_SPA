import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';

const Heater = (props) => {

    return (
        <Window
            id={props.id}
            componentList={[props.controlIdHeater, props.controlIdThermistor]}
            header={props.title}
            top={props.top}
            left={props.left}
            height='340px'
            width='673px'
        >
            <HeaterCtrl
                component={props.controlIdHeater}
                componentT={props.controlIdThermistor}
            />
        </Window>
    )
}
export default Heater;