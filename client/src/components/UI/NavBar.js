import { useContext } from 'react'
import styles from "./NavBar.module.css"
import { GiBowlingPropulsion, GiLaserWarning } from "react-icons/gi"
import { ImConnection } from "react-icons/im"
import { BsBox } from "react-icons/bs"
import {MdOutlineScreenRotation} from "react-icons/md"
import { useSocketContext } from '../../services/SocketContext'
import { useAppContext } from '../../services/AppContext'
import serverConnection from '../../services/SocketContext';
import { socket } from '../../services/SocketContext_old'
import { connect } from 'socket.io-client'


const NavBar = () => {
    let state = false;

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

      let connectionStatusColor = ""
    if (socketCtx.connected) {connectionStatusColor="white"}
    
    return <div id="navbar" className={styles.navbar} >
        <h1>XR Remote Lab</h1>
        <div className={styles.navMenu}>
            <ul>
                <li onClick={socketCtx.toggleConnection}><ImConnection size={29}
                color={connectionStatusColor} /></li>
                <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                <li><GiLaserWarning size={29} /></li>
                <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26}/></li>
            </ul>
        </div>

    </div>


}

export default NavBar