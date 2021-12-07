import { useContext } from 'react'
import styles from "./NavBar.module.css"
import { GiBowlingPropulsion, GiLaserWarning } from "react-icons/gi"
import { ImConnection } from "react-icons/im"
import { BsBox } from "react-icons/bs"
import {MdOutlineScreenRotation} from "react-icons/md"
import { socket, SocketContext } from '../../services/SocketContext';
import { useAppContext } from '../../services/AppContext'
import serverConnection from '../../services/SocketContext';


const NavBar = () => {
    let state = false;

    const appCtx = useAppContext();
    
    return <div id="navbar" className={styles.navbar} >
        <h1>XR Remote Lab</h1>
        <div className={styles.navMenu}>
            <ul>
                <li onClick={(e) => {
                    e.preventDefault();
                    state = serverConnection(socket, state);
                    console.log("Connection status is " + state);
                    if (state === true) { socket.emit('connectionStatus') }
                }}><ImConnection size={29} /></li>
                <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                <li><GiLaserWarning size={29} /></li>
                <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26}/></li>
            </ul>
        </div>

    </div>


}

export default NavBar