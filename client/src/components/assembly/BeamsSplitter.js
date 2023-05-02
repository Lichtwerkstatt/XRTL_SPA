import BesmSplitterCtrl from '../UI/CtrlUnits/BeamSplitterCtrl';
import Window from '../UI/experimentUI/Window';

const BeamSplitter = (props) => {

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
            <BesmSplitterCtrl
                component={props.controlId}
                led={props.led}
            />

        </Window>
    )
};
export default BeamSplitter;
