import Window from "../UI/experimentUI/Window";
import InfoWindowContent from "./Content/InfoWindowContent";

const InfoWindow = (props) => {
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '650px'
    }
    else if (576 < width && width < 768) {
        width = '600px'
        height = '517px'
    }
    else if (768 < width && width < 992) {
        width = '600px'
        height = '517px'
    } else {
        width = '600px'
        height = '517px'
    }

    return (
        <Window
            header="About XR TwinLab"
            id='info'
            top="200"
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