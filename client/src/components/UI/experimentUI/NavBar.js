
import { MdOutlineScreenRotation, MdInfoOutline } from "react-icons/md"
import { useSocketContext } from '../../../services/SocketContext'
import { useAppContext } from '../../../services/AppContext'
import { GiLaserWarning } from "react-icons/gi"
import Tooltip from '@mui/material/Tooltip'
import { ImConnection } from "react-icons/im"
import { BsCamera } from 'react-icons/bs'
import styles from "../CSS/NavBar.module.css"
import { BsBox } from "react-icons/bs"
import { FaTags } from "react-icons/fa"
import { memo } from "react"
import {isEqual} from 'lodash';

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
                <Tooltip title="Connnection">
                    <li onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }}><ImConnection size={29} color={connectionStatusColor} /></li>
                </Tooltip>

                <Tooltip title="2D model">
                    <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                </Tooltip>

                <Tooltip title="Laser beam">
                    <li onClick={appCtx.toggleShowBeam}><GiLaserWarning size={29} color={showBeamColor} /></li>
                </Tooltip>

                <Tooltip title="Rotation">
                    <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26} color={autoRotateColor} /></li>
                </Tooltip>

                <Tooltip title="Labels">
                    <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>
                </Tooltip>

                <Tooltip title="Webcam">
                    <li onClick={appCtx.toggleShowWebcam}><BsCamera size={26} color={cameraStatusColor} /></li>
                </Tooltip>

                <Tooltip title="Information">
                    <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>
                </Tooltip>

            </ul>
        </div>
    </div>
}
export default memo(NavBar, isEqual)