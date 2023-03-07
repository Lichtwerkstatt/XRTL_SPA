import { useSocketContext } from '../../services/SocketContext';
import HeaterCtrl from '../UI/CtrlUnits/HeaterCtrl';
import Window from '../UI/experimentUI/Window';
import { useEffect } from 'react';


const Heater = (props) => {
    const socketCtx = useSocketContext();


    useEffect(() => {

        return () => {

        }
    }, [socketCtx.socket]);

    useEffect(() => {
        socketCtx.socket.emit('join stream room', { controlId: props.controlIdThermistor, userId: socketCtx.username });

        return () => {

        }
        //Comment needed to prevent a warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                led={props.LED}
            />
        </Window>
    )
}

export default Heater;