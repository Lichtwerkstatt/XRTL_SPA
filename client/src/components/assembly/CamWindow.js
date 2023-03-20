import Window from "../UI/experimentUI/Window";
import ViewCam from "../Chat/ViewCamStream";

const InfoWindow = (props) => {
    const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] } //stun:stun.stunprotocol.org
    var peerConnection = new RTCPeerConnection(config);

    return (
        <Window
            id="Cam_1"
            componentList={['Cam_1']}
            header="Top view of experiment"
            top="200"
            left="250"
            width="640px"
            footer={'empty'}
        >
            <ViewCam
                component="Cam_1"
                peer={peerConnection}
            />
        </Window>
    );
};
export default InfoWindow;
