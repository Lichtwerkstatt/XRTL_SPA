import Window from "../UI/experimentUI/Window";
import ViewCam from "../Chat/ViewCamStream";

const InfoWindow = (props) => {
    const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] } //stun:stun.stunprotocol.org
    var peerConnection = new RTCPeerConnection(config);
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '370px'
        height = '278px'
    }
    else if (576 < width && width < 768) {
        width = '500px'
        height = '375px'
    }
    else if (768 < width && width < 1000) {
        width = '600px'
        height = '450px'
    } else {
        width = '750px'
        height = '563px'
    }


    return (
        <Window
            header="Top View of Experiment"
            top="200"
            left="250"
            title="Cam_1"
            id="Cam_1"
            width={width}
            height={height}
            footer={'empty'}
            topper={'none'}
        >
            <ViewCam
                title="Cam_1"
                component="Cam_1"
                peer={peerConnection}
            />
        </Window>
    );
};
export default InfoWindow;