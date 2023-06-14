import { MenuItem, Menu, ThemeProvider, IconButton, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSocketContext } from '../../../services/SocketContext';
import { MdInfoOutline, MdOutlineMenuBook } from 'react-icons/md';
import { useAppContext } from '../../../services/AppContext';
import { ImEnter, ImExit } from 'react-icons/im'
import { GiLaserWarning } from 'react-icons/gi'
import styles from '../CSS/NavBar.module.css'
import { theme } from './../templates/Theme'
import { BsCamera } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa';
import { memo, useState } from 'react';
import { isEqual } from 'lodash';

const NavBar = () => {
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    let connectionStatusColor = '';
    if (socketCtx.connected) { connectionStatusColor = 'white' }
    /*     let autoRotateColor = '';
        if (appCtx.autoRotate) { autoRotateColor = 'white' } */
    let showTagsColor = '';
    if (appCtx.showTags) { showTagsColor = 'white' }
    let cameraStatusColor = '';
    if (appCtx.showCam) { cameraStatusColor = 'white' }
    let showInfoWindowColor = '';
    if (appCtx.showInfoWindow) { showInfoWindowColor = 'white' }
    let showManualWindowColor = '';
    if (appCtx.showManualWindow) { showManualWindowColor = 'white' }
    let showBeamColor = '';
    if (appCtx.showBeam) { showBeamColor = 'white' }

    const [mobileVersion, setMobileVersion] = useState(null);
    const openMobileVersion = Boolean(mobileVersion);

    const handleClick = (event) => {
        setMobileVersion(event.currentTarget);
    };

    const closeMobileVersion = () => {
        setMobileVersion(null);
    };

    return (
        <div id='navbar' className={styles.navbar} >
            <ThemeProvider theme={theme} >
                <h1>XR TwinLab</h1>

                {appCtx.underConstruction && <h2>Experiment under construction! Some functions may not work!</h2>}

                <div className={styles.navMenu}>
                    <ul>
                        <Tooltip title={(socketCtx.connected) ? 'Disconnect' : 'Connect'}>
                            <li onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }}> {(socketCtx.connected) ? <ImExit size={25} color={connectionStatusColor} /> : <ImEnter size={25} color={connectionStatusColor} />} </li>
                        </Tooltip>

                        <Tooltip title='Labels'>
                            <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>
                        </Tooltip>

                        <Tooltip title='Cam'>
                            <li onClick={appCtx.toggleCam}><BsCamera size={26} color={cameraStatusColor} /></li>
                        </Tooltip>

                        <Tooltip title='Beam Path'>
                            <li onClick={appCtx.toggleShowBeam}><GiLaserWarning size={25} color={showBeamColor} /></li>
                        </Tooltip>

                        <Tooltip title='Manual'>
                            <li onClick={appCtx.toggleShowManualWindow}><MdOutlineMenuBook size={26} color={showManualWindowColor} /></li>
                        </Tooltip>


                        <Tooltip title='Info'>
                            <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>
                        </Tooltip>

                    </ul>
                </div>

                <div className={styles.mobile}>
                    <IconButton onClick={handleClick} variant="contained" sx={{
                        borderRadius: 1,
                        height: '33px',
                        width: '30px',
                        color: 'black',
                        ':hover': {
                            bgcolor: 'darkgreen',
                            color: '#00ffa8',
                        },
                    }}>
                        <KeyboardArrowDownIcon color={'white'} />
                    </IconButton>

                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={mobileVersion}
                        open={openMobileVersion}
                        onClose={closeMobileVersion}
                    >
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin();
                        }} disableRipple>
                            {(socketCtx.connected) ? <ImExit size={25} color={connectionStatusColor} style={{ paddingRight: '20px' }} /> : <ImEnter size={25} color={connectionStatusColor} style={{ paddingRight: '20px' }} />}
                            {(socketCtx.connected) ? 'Disconnect' : 'Connect'}
                        </MenuItem>
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleShowTags();
                        }} disableRipple>
                            <FaTags size={25} style={{ paddingRight: '20px' }} />
                            Labels
                        </MenuItem>
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleShowManualWindow();
                        }} disableRipple>
                            <MdOutlineMenuBook size={26} style={{ paddingRight: '20px' }} />
                            Manual
                        </MenuItem>
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleCam();
                        }} disableRipple>
                            <BsCamera size={26} style={{ paddingRight: '20px' }} />
                            Cam
                        </MenuItem>
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleShowInfoWindow();
                        }} disableRipple>
                            <MdInfoOutline size={26} style={{ paddingRight: '20px' }} />
                            Info
                        </MenuItem>

                    </Menu>
                </div>
            </ThemeProvider>
        </div>
    );
}
export default memo(NavBar, isEqual)
