import ManualWindowContent from "../experiment/ComponentDescription/Tasks";
import Window from "../UI/experimentUI/Window";

const ManualWindow = (props) => {
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '480px'
    } else {
        width = '510px'
        height = '440px'
    }

    return (
        <Window
            header="XR TwinLab - Adaptive Optic"
            id='manual'
            top="100"
            left="1000"
            width={width}
            height={height}
            footer={'none'}
            topper={'none'}
        >
            <ManualWindowContent />
        </Window>
    );
};
export default ManualWindow;