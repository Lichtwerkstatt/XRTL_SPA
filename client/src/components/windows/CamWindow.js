import Window from "../UI/experimentUI/Window";
import ViewCam from "../Chat/ViewCamStream";

const InfoWindow = (props) => {
    const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] } //stun:stun.stunprotocol.org
    var peerConnection = new RTCPeerConnection(config);

    return (
        <Window
            header="Top view of experiment"
            top="200"
            left="250"
            title="Cam_1"
            id="Cam_1"
            width="600px"
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