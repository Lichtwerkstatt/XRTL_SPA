import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';

const Heater = (props) => {

    return (
        <Window
            id={props.controlId}
            header={props.id}
            componentlist={[]}
            top={props.top}
            left={props.left}
            height='340px'
            width='623px'
        >
            <HeaterCtrl
                component={props.controlId}
                led={props.led}
            />

        </Window>
    )
};
export default Heater;
