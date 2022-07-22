
import styles from "./NavBar.module.css"
import { GiLaserWarning } from "react-icons/gi"
import { ImConnection } from "react-icons/im"
import { BsBox } from "react-icons/bs"
import { FaTags } from "react-icons/fa"
import { MdOutlineScreenRotation, MdInfoOutline } from "react-icons/md"
import { useSocketContext } from '../../services/SocketContext'
import { useAppContext } from '../../services/AppContext'
import { BsCamera } from 'react-icons/bs'
const NavBar = () => {

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    let connectionStatusColor = ""
    if (socketCtx.connected) { connectionStatusColor = "white" }
    let autoRotateColor = ""
    if (appCtx.autoRotate) { autoRotateColor = "white" }
    let showTagsColor = ""
    if (appCtx.showTags) { showTagsColor = "white" }
    let cameraStatusColor = "";
    if (appCtx.showWebcam) { cameraStatusColor = "white" }
    let showBeamColor = "";
    if (appCtx.showBeam) { showBeamColor = "white" }
    let showInfoWindowColor = "";
    if (appCtx.showInfoWindow) { showInfoWindowColor = "white" }

    return <div id="navbar" className={styles.navbar} >
        <h1>XR TwinLab</h1>
        <div className={styles.navMenu}>
            <ul>
                <li onClick={appCtx.toggleLogin}><ImConnection size={29}
                    color={connectionStatusColor} /></li>
                <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                <li onClick={appCtx.toggleShowBeam}><GiLaserWarning size={29} color={showBeamColor} /></li>

                <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26} color={autoRotateColor} /></li>
                <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>

                <li onClick={appCtx.toggleShowWebcam}><BsCamera size={26}
                    color={cameraStatusColor} /></li>

                <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>

            </ul>
        </div>
    </div>
}
export default NavBar