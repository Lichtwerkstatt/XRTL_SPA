import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { MdOutlineScreenRotation, MdInfoOutline, MdOutlineHelp, MdOutlineMenuBook } from 'react-icons/md'
import { MenuItem, Menu, ThemeProvider, IconButton, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSocketContext } from '../../../services/SocketContext'
import { useAppContext } from '../../../services/AppContext'
import { GiLaserWarning } from 'react-icons/gi'
import { ImConnection } from 'react-icons/im'
import styles from '../CSS/NavBar.module.css'
import { theme } from './../templates/Theme'
import { BsCamera } from 'react-icons/bs'
import { FaTags } from 'react-icons/fa'
//import { BsBox } from 'react-icons/bs'
import { Icon } from '@iconify/react';
import { memo, Fragment, useState } from 'react'
import { isEqual } from 'lodash';

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
    let showInfoWindowColor = '';
    if (appCtx.showInfoWindow) { showInfoWindowColor = 'white' }
    let showHelpWindowColor = '';
    if (appCtx.showHelpWindow) { showHelpWindowColor = 'white' }
    let showManualWindowColor = '';
    if (appCtx.showManualWindow) { showManualWindowColor = 'white' }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <div id='navbar' className={styles.navbar} >
            <h1>XR TwinLab</h1>
            <div className={styles.navMenuLaser}>
                <h3>Overlay:</h3>
                <ThemeProvider theme={theme} >
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <Fragment>
                                <IconButton variant="contained" {...bindTrigger(popupState)} sx={{
                                    borderRadius: 1,
                                    color: 'black',
                                    ':hover': {
                                        bgcolor: 'darkgreen',
                                        color: '#00ffa8',
                                    },
                                    marginTop: '-2%',
                                    paddingLeft: 20

                                }}>
                                    <Icon icon="mdi:led-off" width="27" height="27" />
                                </IconButton>
                                <Menu {...bindMenu(popupState)}  >
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
                                <IconButton variant="contained" size='25' sx={{
                                    borderRadius: 1,
                                    color: 'black',
                                    ':hover': {
                                        bgcolor: 'darkgreen',
                                        color: '#00ffa8',
                                    },
                                    marginTop: '-1%',
                                    paddingLeft: 20,
                                    margin: 'auto'
                                }}  {...bindTrigger(popupState)}>
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
                </ThemeProvider>
            </div>
            <div className={styles.navMenu}>
                <ul>
                    <Tooltip title='Connnection'>
                        <li onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }}><ImConnection size={29} color={connectionStatusColor} /></li>
                    </Tooltip>

                    {/*                 <Tooltip title='2D model'>
                    <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} /></li>
                </Tooltip> */}

                    <Tooltip title='Rotation'>
                        <li onClick={appCtx.toggleAutoRotate}><MdOutlineScreenRotation size={26} color={autoRotateColor} /></li>
                    </Tooltip>

                    <Tooltip title='Labels'>
                        <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>
                    </Tooltip>

                    <Tooltip title='Webcam'>
                        <li onClick={appCtx.toggleCam}><BsCamera size={26} color={cameraStatusColor} /></li>
                    </Tooltip>

                    <Tooltip title='Manual'>
                        <li onClick={appCtx.toggleShowManualWindow}><MdOutlineMenuBook size={26} color={showManualWindowColor} /></li>
                    </Tooltip>

                    <Tooltip title='Help'>
                        <li onClick={appCtx.toggleShowHelpWindow}><MdOutlineHelp size={26} color={showHelpWindowColor} /></li>
                    </Tooltip>

                    <Tooltip title='Information'>
                        <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>
                    </Tooltip>

                </ul>
            </div>

            <ThemeProvider theme={theme}>
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
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }} disableRipple>
                            <ImConnection size={29} sx={{ width: '10px' }} />
                            Connection
                        </MenuItem>
                        <MenuItem onClick={appCtx.toggleAutoRotate} disableRipple>
                            <MdOutlineScreenRotation size={26} />
                            Rotation
                        </MenuItem>
                        <MenuItem onClick={appCtx.toggleShowTags} disableRipple>
                            <FaTags size={25} />
                            Tags
                        </MenuItem>
                        <MenuItem onClick={appCtx.toggleCam} disableRipple>
                            <MdOutlineMenuBook size={26} />
                            Manual
                        </MenuItem>
                        <MenuItem onClick={appCtx.toggleShowManualWindow} disableRipple>
                            <MdOutlineHelp size={26} />
                            Help
                        </MenuItem>
                        <MenuItem onClick={appCtx.toggleShowHelpWindow} disableRipple>
                            <BsCamera size={26} />
                            Cam
                        </MenuItem>
                        <MenuItem onClick={appCtx.toggleShowInfoWindow} disableRipple>
                            <MdInfoOutline size={26} />
                            Info
                        </MenuItem>

                    </Menu>
                </div>
            </ThemeProvider>
        </div>
    );
}
export default memo(NavBar, isEqual)