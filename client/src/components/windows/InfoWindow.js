import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./InfoWindowContent";

const InfoWindow = (props) => {
    return (
        <Window
            header="About XR TwinLab"
            id='info'
            top="10"
            left="20"
            width="30"
            height="80"
            footer={'empty'}
        >
            <InfoWindowContent />
        </Window>
    );
};
export default InfoWindow;