import WelcomeWindowContent from "../experiment/ComponentDescription/WelcomeWindowContent";
import Window from "../UI/experimentUI/Window";

/**
 * Welcome window
 * 
 * @description This react component returns a window with the content for the welcome window.
 *  
 * @returns {React.ReactElement} Welcome window
 */
const WelcomeWindow = (props) => {
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '480px'
    }
    else {
        width = '510px'
        height = '460px'
    }

    return (
        <Window
            header="XR TwinLab Welcome"
            id='welcome'
            componentList={['welcome']}
            top={100}
            left={200}
            width={width}
            height={height}
            footer={'none'}
            topper={'none'}
        >
            <WelcomeWindowContent width={width} />
        </Window>
    );
};
export default WelcomeWindow;