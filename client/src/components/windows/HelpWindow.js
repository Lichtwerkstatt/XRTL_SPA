import Window from "../UI/experimentUI/Window";
import HelpWindowContent from "./Content/HelpWindowContent";

const HelpWindow = (props) => {
    return (
        <Window
            header="About XR TwinLab"
            id='info'
            top="100"
            left="200"
            width="300"
            height="547"
            footer={'empty'}
        >
            <HelpWindowContent />
        </Window>
    );
};
export default HelpWindow;