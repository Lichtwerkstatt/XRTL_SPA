import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./Content/InfoWindowContent";

const InfoWindow = (props) => {
    return (
        <Window
            header="About XR TwinLab"
            id='info'
            top="250"
            left="200"
            width="600px"
            footer={'empty'}
        >
            <InfoWindowContent />
        </Window>
    );
};
export default InfoWindow;