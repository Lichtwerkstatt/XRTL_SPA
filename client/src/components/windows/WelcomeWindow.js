import WelcomeWindowContent from "./Content/WelcomeWindowContent";
import Window from "../UI/experimentUI/Window";

const WelcomeWindow = (props) => {
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '480px'
    }
    else if (576 < width && width < 768) {
        width = '510px'
        height = '440px'
    }
    else if (768 < width && width < 1000) {
        width = '510px'
        height = '440px'
    } else {
        width = '510px'
        height = '460px'
    }

    return (
        <Window
            header="XR TwinLab Welcome"
            id='welcome'
            top="100"
            left="200"
            width={width}
            height={height}
            footer={'empty'}
            topper={'none'}
        >
            <WelcomeWindowContent width={width} />
        </Window>
    );
};
export default WelcomeWindow;