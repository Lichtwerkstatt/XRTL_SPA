import Window from "../UI/experimentUI/Window";
import WelcomeWindowContent from "./Content/WelcomeWindowContent";

const WelcomeWindow = (props) => {
    return (
        <Window
            header="XR TwinLab Welcome"
            id='welcome'
            top="100"
            left="200"
            width="300"
            height="547"
            footer={'empty'}
            topper={'none'}
        >
            <WelcomeWindowContent />
        </Window>
    );
};
export default WelcomeWindow;