import { useAppContext } from "../../services/AppContext";
import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./InfoWindowContent";

const InfoWindow = (props) => {
    const appCtx = useAppContext();

    const handleCloseWindow = () => {
        appCtx.toggleShowInfoWindow();
    };

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