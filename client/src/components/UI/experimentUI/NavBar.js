import { MenuItem, Menu, ThemeProvider, IconButton, Tooltip } from '@mui/material';
import { LuMenu } from "react-icons/lu";
import { useSocketContext } from '../../../services/SocketContext';
import { useAppContext } from '../../../services/AppContext';
import { FaTags, FaLightbulb } from 'react-icons/fa';
import { BsCamera, BsBox } from 'react-icons/bs';
import { ImEnter, ImExit } from 'react-icons/im';
import { GiLaserWarning } from 'react-icons/gi';
import { MdInfoOutline } from 'react-icons/md';
import styles from '../CSS/NavBar.module.css';
import { theme } from './../templates/Theme';
import { memo, useState } from 'react';
import { Icon } from '@iconify/react';
import { isEqual } from 'lodash';

/**
 * Navigation bar component 
 * 
 * @description React components returns the styling and functionality of the navigation bar. Within this file all onclick events 
 * on the buttons in the bar and their color changes are also handled.
 * 
 * @returns {React.ReactElement} Navigation bar component  
 */
const NavBar = () => {
    const appCtx = useAppContext();
    const socketCtx = useSocketContext();

    // Icon colors intialization and change of these, if condition is fulfilled
    let connectionStatusColor = '';
    if (socketCtx.connected) { connectionStatusColor = 'white' }

    let showTagsColor = '';
    if (appCtx.showTags) { showTagsColor = 'white' }
    let cameraStatusColor = '';
    if (appCtx.showCam) { cameraStatusColor = 'white' }
    let showInfoWindowColor = '';
    if (appCtx.showInfoWindow) { showInfoWindowColor = 'white' }
    let showVirtualLayerColor = '';
    if (appCtx.showVirtualLayer) { showVirtualLayerColor = 'white' }
    let lightSource = '';
    if (appCtx.lightSource) { lightSource = 'white' }
    let showBeamColor = '';
    if (appCtx.showBeam) {showBeamColor = 'white' }

    const [mobileVersion, setMobileVersion] = useState(null);
    const openMobileVersion = Boolean(mobileVersion);
    let mobileMenuOn = '';
    if (mobileVersion) {mobileMenuOn = 'white'}

    const [led, setLED] = useState(null);
    const openLED = Boolean(led)

    const [laserBeam, setLaserBeam] = useState(null);
    const openLaserBeam = Boolean(laserBeam)


    const handleClick = (event) => {
        setMobileVersion(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setLED(event.currentTarget);
    };

    const handleLaserBeam = (event) => {
        setLaserBeam(event.currentTarget);
    };

    const closeMobileVersion = () => {
        setMobileVersion(null);
    };

    const handleLED = () => {
        setLED(null);
    };

    const closeLaserBeam = () => {
        setLaserBeam(null);
    };

    // Prevents the OverviewCam window from being opened when the OverviewCam stream is displayed as a VirtualLayer
    const handleOverviewCam  = () => {
        console.log(appCtx.showVirtualLayer);
        if (!appCtx.showVirtualLayer) {
            appCtx.toggleCam();
            //cameraStatusColor = 'gray'
        }
    };

    // Handles changing the VirtualLayer and, if necessary, closes the OverviewCam window if it is open.
    const handleVirtualLayer = () => {
        if (!appCtx.showVirtualLayer && appCtx.showCam) {
            appCtx.toggleCam();
        }
        appCtx.toggleShowVirtualLayer()
    }

    return (
        <div id='navbar' className={styles.navbar} >
            <ThemeProvider theme={theme} >
                <h1>XR TwinLab</h1>

                {/*
                <div className={styles.navMenuLaser}>
                    <h3>Overlay:</h3>

                    {/* Drop-down menu to display the beam path of the white or red LED
                    <IconButton onClick={handleClick2} variant="contained" sx={{
                        borderRadius: 1,
                        height: '33px',
                        width: '30px',
                        color: 'black',
                        ':hover': {
                            bgcolor: 'darkgreen',
                            color: '#00ffa8',
                        },
                    }}>
                        <Icon icon="mdi:led-off" width="70" height="70" />
                    </IconButton>

                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={led}
                        open={openLED}
                        onClose={handleLED}
                    >
                        {/* To display the red or white LED
                        <MenuItem onClick={() => {
                            handleLED();
                            appCtx.toggleShowLED('none');
                        }} disableRipple>None</MenuItem>

                        {/* Display the white LED
                        <MenuItem onClick={() => {
                            handleLED();
                            appCtx.toggleShowLED('white');
                            appCtx.toggleShowBeam('off');
                        }} disableRipple>White</MenuItem>

                        {/* Display the red LED 
                        <MenuItem onClick={() => {
                            handleLED();
                            appCtx.toggleShowLED('red');
                            appCtx.toggleShowBeam('off');
                        }} disableRipple>Red</MenuItem>
                    </Menu>

                    {/* Drop down menu to manage the display option of the beam path
                    <IconButton onClick={handleLaserBeam} variant="contained" sx={{
                        borderRadius: 1,
                        height: '33px',
                        width: '30px',
                        color: 'black',
                        ':hover': {
                            bgcolor: 'darkgreen',
                            color: '#00ffa8',
                        },
                    }}>
                        <GiLaserWarning />
                    </IconButton>

                    {/* To switch the beam path on or off, as well as the option when the beam splitter is in the beam path, which in turn changes the beam path.
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{ 'aria-labelledby': 'demo-customized-button', }}
                        anchorEl={laserBeam}
                        open={openLaserBeam}
                        onClose={closeLaserBeam}
                    >
                        <MenuItem onClick={() => {
                            closeLaserBeam();
                            appCtx.toggleShowBeam('on');
                            appCtx.toggleShowLED('none');
                        }} disableRipple >On</MenuItem>
                        <MenuItem onClick={() => {
                            closeLaserBeam();
                            appCtx.toggleShowBeam('off');
                        }} disableRipple>Off</MenuItem>
                        <MenuItem onClick={() => {
                            closeLaserBeam();
                            appCtx.toggleShowBeam('split');
                            appCtx.toggleShowLED('none');
                        }} disableRipple>Beamsplitter</MenuItem>
                    </Menu>
                </div>
                */}

                {/* Navigation bar if screen widther than 992 pixels
                Icons of the navigation bar, their underlying function calls and the tooltips for the description of the icon functionality. */}                
                <div className={styles.navMenu}>
                    <ul>
                        <Tooltip title={(socketCtx.connected) ? 'Disconnect' : 'Connect'}>
                            <li onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }}> {(socketCtx.connected) ? <ImExit size={25} color={connectionStatusColor} /> : <ImEnter size={25} color={connectionStatusColor} />} </li>
                        </Tooltip>

                        <Tooltip title='Model'>
                            <li onClick={handleVirtualLayer}><BsBox size={26} color={showVirtualLayerColor} /></li>
                        </Tooltip>

                        <Tooltip title='Beam Path'>
                            <li onClick={appCtx.toggleShowBeam}><GiLaserWarning size={25} color={showBeamColor} /></li>
                        </Tooltip>

                        <Tooltip title='Labels'>
                            <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>
                        </Tooltip>

                        <Tooltip title='Light'>
                            <li onClick={appCtx.toggleHandleLightSource}><FaLightbulb size={24} color={lightSource} /></li>
                        </Tooltip>

                        <Tooltip title='Cam'>
                            <li onClick={handleOverviewCam}
                            ><BsCamera size={26} color={cameraStatusColor} /></li>
                        </Tooltip>

                        <Tooltip title='Info'>
                            <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>
                        </Tooltip>
                    </ul>
                </div>

                {/* Navigation bar if screen width is smaller than 992 pixels. 
                Icons in the navigation bar are summarised in a drop-down menu.  */}
                <div className={styles.mobile}>
                    <IconButton onClick={handleClick} variant="contained" sx={{
                        borderRadius: 1,
                        height: '30px',
                        width: '30px',
                        color: 'black',
                        padding: '0',
                        ':hover': {
                            bgcolor: 'darkgreen',
                            color: '#00ffa8',
                        },
                    }}>
                        <LuMenu size={27} color={mobileMenuOn} style={{paddingBottom: '2px'}} />
                    </IconButton>

                    {/* Drop down menu  */}
                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={mobileVersion}
                        open={openMobileVersion}
                        onClose={closeMobileVersion}
                    >
                        {/* Button to open the login window */}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin();
                        }} disableRipple>
                            {(socketCtx.connected) ? <ImExit size={25} color={connectionStatusColor} style={{ paddingRight: '20px' }} /> : <ImEnter size={25} color={connectionStatusColor} style={{ paddingRight: '20px' }} />}
                            {(socketCtx.connected) ? 'Disconnect' : 'Connect'}
                        </MenuItem>

                        {/* Button to switch between Model and Cam */}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            handleVirtualLayer();
                        }} disableRipple>
                            <BsBox size={26} style={{ paddingRight: '20px' }} />
                            Model
                        </MenuItem>

                        {/* Button to show the Beam Path*/}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleShowBeam();
                        }} disableRipple>
                            <GiLaserWarning size={25} style={{ paddingRight: '20px' }} />
                            Beam Path
                        </MenuItem>


                        {/* Show/hide labels and decriptions of the experiment components */}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleShowTags();
                        }} disableRipple>
                            <FaTags size={25} style={{ paddingRight: '20px' }} />
                            Labels
                        </MenuItem>

                        {/* Open the window with OverviewCam */}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            handleOverviewCam();
                        }} disableRipple>
                            <BsCamera size={26} style={{ paddingRight: '20px' }} />
                            Cam
                        </MenuItem>

                        {/* Toggle the light */}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleHandleLightSource();
                        }} disableRipple>
                            <FaLightbulb size={26} style={{ paddingRight: '20px' }} />
                            Light
                        </MenuItem>

                        {/* Show/hide Information window */}
                        <MenuItem onClick={() => {
                            closeMobileVersion();
                            appCtx.toggleShowInfoWindow();
                        }} disableRipple>
                            <MdInfoOutline size={26} style={{ paddingRight: '20px' }} />
                            Info
                        </MenuItem>
                    </Menu>
                </div>
            </ThemeProvider >
        </div >
    );
}
export default memo(NavBar, isEqual)
