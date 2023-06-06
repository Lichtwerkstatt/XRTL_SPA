import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';
import { useAppContext } from '../../services/AppContext';

const Heater = (props) => {
    const appCtx = useAppContext();
    var width = window.innerWidth

    if (appCtx.smallSettingTemp) {
        width = '673px'
    } else if (!appCtx.smallSettingTemp) {
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
            />
        </Window>
    )
}
export default Heater;