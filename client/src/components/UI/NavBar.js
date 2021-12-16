
import styles from "./NavBar.module.css"
import { GiLaserWarning } from "react-icons/gi"
import { ImConnection } from "react-icons/im"
import { BsCamera } from 'react-icons/bs'
import { BsBox } from "react-icons/bs"
import { MdOutlineScreenRotation } from "react-icons/md"
import { useSocketContext } from '../../services/SocketContext'
import { useAppContext } from '../../services/AppContext'

const NavBar = () => {

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    let connectionStatusColor = ""
    if (socketCtx.connected) { connectionStatusColor = "white" }


    return <div id="navbar" className={styles.navbar} >
        <h1>XR Remote Lab</h1>
        <div className={styles.navMenu}>
            <ul>
                <li onClick={socketCtx.toggleConnection}><ImConnection size={29}
                    color={connectionStatusColor} /></li>
                <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                <li><GiLaserWarning size={29} /></li>
                <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26} /></li>
                <li onClick={appCtx.toggleShowWebcam}><BsCamera size={26} /></li>
            </ul>
        </div>
    </div>
}

export default NavBar