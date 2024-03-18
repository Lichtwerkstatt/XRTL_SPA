import TaskWindowContent from "../experiment/ComponentDescription/Tasks";
import Window from "../UI/experimentUI/Window";

/**
 * Task window
 * 
 * @description This react component returns a window with the content for the task window. 
 *  
 * @returns {React.ReactElement} Task window
 */
const TaskWindow = () => {
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
            <TaskWindowContent />
        </Window>
    );
};
export default TaskWindow;