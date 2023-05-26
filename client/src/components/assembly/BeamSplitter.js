import BeamSplitterCtrl from '../UI/CtrlUnits/BeamSplitterCtrl';
import Window from '../UI/experimentUI/Window';

const BeamSplitter = (props) => {

    return (
        <Window
            id={props.controlId}
            componentList={[props.controlId]}
            header={props.title}
            top={props.top}
            left={props.left}
            height='240px'
            width='250px'
        >
            <BeamSplitterCtrl
                component={props.controlId}
            />

        </Window>
    )
};
export default BeamSplitter;
