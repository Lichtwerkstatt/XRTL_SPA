import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { MdOutlineScreenRotation, MdInfoOutline } from 'react-icons/md'
import { useSocketContext } from '../../../services/SocketContext'
import { useAppContext } from '../../../services/AppContext'
import IconButton from '@mui/material/IconButton';
import { GiLaserWarning } from 'react-icons/gi'
import MenuItem from '@mui/material/MenuItem';
import { ImConnection } from 'react-icons/im'
import styles from '../CSS/NavBar.module.css'
import Tooltip from '@mui/material/Tooltip'
import { BsCamera } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'
import { BsBox } from 'react-icons/bs'
import { isEqual } from 'lodash';
import { memo, Fragment } from 'react'
import Menu from '@mui/material/Menu';


const NavBar = () => {
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    let connectionStatusColor = '';
    if (socketCtx.connected) { connectionStatusColor = 'white' }
    let autoRotateColor = '';
    if (appCtx.autoRotate) { autoRotateColor = 'white' }
    let showTagsColor = '';
    if (appCtx.showTags) { showTagsColor = 'white' }
    let cameraStatusColor = '';
    if (appCtx.showCam) { cameraStatusColor = 'white' }
    let showBeamColor = '';
    if (appCtx.showBeam) { showBeamColor = 'white' }
    let showInfoWindowColor = '';
    if (appCtx.showInfoWindow) { showInfoWindowColor = 'white' }

    return <div id='navbar' className={styles.navbar} >
        <h1>XR TwinLab</h1>
        <h3>Setup-laser:</h3>
        <div className={styles.navMenuLaser}>
            <ul>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <Fragment>
                            <IconButton variant="contained" {...bindTrigger(popupState)}>
                                <AutoAwesomeOutlinedIcon />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => {
                                    popupState.close();
                                    appCtx.toggleShowLED('none');
                                }} >None</MenuItem>
                                <MenuItem onClick={() => {
                                    popupState.close();
                                    appCtx.toggleShowLED('white');
                                }}>White</MenuItem>
                                <MenuItem onClick={() => {
                                    popupState.close();
                                    appCtx.toggleShowLED('red');
                                }}>Red</MenuItem>
                            </Menu>
                        </Fragment>
                    )}
                </PopupState>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <Fragment>
                            <IconButton variant="contained" {...bindTrigger(popupState)}>
                                <GiLaserWarning />
                            </IconButton>
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={() => {
                                    popupState.close();
                                    appCtx.toggleShowBeam('on');
                                }} >On</MenuItem>
                                <MenuItem onClick={() => {
                                    popupState.close();
                                    appCtx.toggleShowBeam('off');
                                }}>Off</MenuItem>
                                <MenuItem onClick={() => {
                                    popupState.close();
                                    appCtx.toggleShowBeam('split');
                                }}>Beamsplitter</MenuItem>
                            </Menu>
                        </Fragment>
                    )}
                </PopupState>
            </ul>
        </div>
        <div className={styles.navMenu}>
            <ul>
                <Tooltip title='Connnection'>
                    <li onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }}><ImConnection size={29} color={connectionStatusColor} /></li>
                </Tooltip>

                <Tooltip title='2D model'>
                    <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                </Tooltip>

                <Tooltip title='Laser beam'>
                    <li onClick={appCtx.toggleShowBeam}><GiLaserWarning size={29} color={showBeamColor} /></li>
                </Tooltip>

                <Tooltip title='Rotation'>
                    <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26} color={autoRotateColor} /></li>
                </Tooltip>

                <Tooltip title='Labels'>
                    <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>
                </Tooltip>

                <Tooltip title='Webcam'>
                    <li onClick={appCtx.toggleCam}><BsCamera size={26} color={cameraStatusColor} /></li>
                </Tooltip>

                <Tooltip title='Information'>
                    <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>
                </Tooltip>

            </ul>
        </div>
    </div>
}
export default memo(NavBar, isEqual)