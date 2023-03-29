import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./InfoWindowContent";

const InfoWindow = (props) => {
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
            <InfoWindowContent />
        </Window>
    );
};
export default InfoWindow;