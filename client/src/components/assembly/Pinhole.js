import BS_Background from './media/BS_outline.png';
import PinholeCtrl from '../UI/CtrlUnits/LaserCtrl';
import Window from '../UI/experimentUI/Window';

const Pinhole = (props) => {

    return (
        <Window
            id={props.controlId}
            componentList={[props.controlId]}
            header={props.title}
            top={props.top}
            left={props.left}
            height='240px'
            width='250px'
            background={BS_Background}
        >
            <PinholeCtrl
                component={props.controlId}
            />

        </Window>
    )
};
export default Pinhole;
