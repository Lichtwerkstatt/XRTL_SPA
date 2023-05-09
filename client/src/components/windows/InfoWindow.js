import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./Content/InfoWindowContent";

const InfoWindow = (props) => {
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '545px'
    }
    else if (576 < width && width < 768) {
        width = '600px'
        height = '480px'
    }
    else if (768 < width && width < 1000) {
        width = '600px'
        height = '510px'
    } else {
        width = '600px'
        height = '500px'
    }

    return (
        <Window
            header="About XR TwinLab"
            id='info'
            top="250"
            left="200"
            width={width}
            height={height}
            footer={'empty'}
            topper={'para'}
        >
            <InfoWindowContent />
        </Window>
    );
};
export default InfoWindow;