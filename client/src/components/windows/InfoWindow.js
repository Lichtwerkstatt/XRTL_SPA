import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./InfoWindowContent";

const InfoWindow = (props) => {
    return (
        <Window
            header="About XR TwinLab"
            id='info'
            top="250"
            left="200"
            footer={'empty'}
            width="600px"
        >
            <InfoWindowContent />
        </Window>
    );
};
export default InfoWindow;