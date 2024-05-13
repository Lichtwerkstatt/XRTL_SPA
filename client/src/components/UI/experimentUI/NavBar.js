import { useSocketContext } from '../../../services/SocketContext';
import { MdInfoOutline, MdOutlineMenuBook } from 'react-icons/md';
import { useAppContext } from '../../../services/AppContext';
import {Button, Menu, MenuItem, ThemeProvider, Tooltip} from '@mui/material';
import { FaTags, FaLightbulb } from 'react-icons/fa';
import { BsCamera, BsBox} from 'react-icons/bs';
import { ImEnter, ImExit } from 'react-icons/im';
import { GiLaserWarning } from 'react-icons/gi';
import styles from '../CSS/NavBar.module.css';
import { theme } from './../templates/Theme';
import { memo, useState } from 'react';
import { isEqual } from 'lodash';
import { useLocaleContext } from "../../../services/LocaleContext";
import { LANG_OPTIONS } from "../../../services/constants";
import {useTranslation} from "react-i18next";

/**
 * Navigation bar component 
 * 
 * @description React components returns the styling and functionality of the navigation bar. Within this file all onclick events 
 * on the buttons in the bar and their color changes are also handled.
 * 
 * @returns {React.ReactElement} Navigation bar component  
 */
const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const appCtx = useAppContext();
    const socketCtx = useSocketContext();
    const localeCtx = useLocaleContext();
    const { t } = useTranslation();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeLanguage = (lang) => {
        localeCtx.changeLanguage(lang)
        handleClose()
    }

    // Icon colors intialization and change of these, if condition is fulfilled
    let connectionStatusColor = '';
    if (socketCtx.connected) { connectionStatusColor = 'white' }
    let showTagsColor = '';
    if (appCtx.showTags) { showTagsColor = 'white' }
    let cameraStatusColor = '';
    if (appCtx.showCam) { cameraStatusColor = 'white' }
    let showInfoWindowColor = '';
    if (appCtx.showInfoWindow) { showInfoWindowColor = 'white' }
    let showBeamColor = '';
    if (appCtx.showBeam) { showBeamColor = 'white' }
    let showVirtualLayerColor = '';
    if (!appCtx.showVirtualLayer) { showVirtualLayerColor = 'white' }
    let showManualWindowColor = '';
    if (appCtx.showManualWindow) { showManualWindowColor = 'white' }
    let lightSource = '';
    if (appCtx.lightSource) { lightSource = 'white' }

    return (
        <div id='navbar' className={styles.navbar} >
            <ThemeProvider theme={theme} >
                <h1>XR TwinLab - Fundamentals</h1>
                {/* If underConstruction, then the following is displayed */}
                {appCtx.underConstruction && <h2>{t('messages.under_construction')}</h2>}

                {/* Icons of the navigation bar, their underlying function calls and the tooltips for the description of the icon functionality. */}
                <div className={styles.navMenu}>
                    <ul>
                        <Tooltip title={(socketCtx.connected) ? t('tooltips.disconnect') : t('tooltips.connect')}>
                            <li onClick={() => { (socketCtx.connected) ? socketCtx.toggleConnection() : appCtx.toggleLogin(); }}> {(socketCtx.connected) ? <ImExit size={25} color={connectionStatusColor} /> : <ImEnter size={25} color={connectionStatusColor} />} </li>
                        </Tooltip>

                        <Tooltip title={t('tooltips.labels')}>
                            <li onClick={appCtx.toggleShowTags}><FaTags size={25} color={showTagsColor} /></li>
                        </Tooltip>

                        <Tooltip title={t('tooltips.cam')}>
                            <li onClick={appCtx.toggleCam}><BsCamera size={26} color={cameraStatusColor} /></li>
                        </Tooltip>

                        <Tooltip title={t('tooltips.model')}>
                            <li onClick={appCtx.toggleShowVirtualLayer}><BsBox size={26} color={showVirtualLayerColor} /></li>
                        </Tooltip>

                        <Tooltip title={t('tooltips.beam_path')}>
                            <li onClick={appCtx.toggleShowBeam}><GiLaserWarning size={25} color={showBeamColor} /></li>
                        </Tooltip> 

                        <Tooltip title={t('tooltips.light_source')}>
                            <li onClick={appCtx.toggleHandleLightSource}><FaLightbulb size={24} color={lightSource} /></li>
                        </Tooltip>

                        <Tooltip title={t('tooltips.manual')}>
                            <li onClick={appCtx.toggleShowManualWindow}><MdOutlineMenuBook size={26} color={showManualWindowColor} /></li>
                        </Tooltip>

                        <Tooltip title={t('tooltips.info')}>
                            <li onClick={appCtx.toggleShowInfoWindow}><MdInfoOutline size={26} color={showInfoWindowColor} /></li>
                        </Tooltip>

                        <Button id="language"
                                aria-controls={open ? 'language-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}>
                            {t('language')}
                        </Button>
                        <Menu
                            id="language-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'language',
                            }}
                        >
                            {Object.entries(LANG_OPTIONS).map(entry => {
                                const [key, value] = entry
                                return <MenuItem key={value}
                                                 selected={value === localeCtx.resolvedLanguage()}
                                                 onClick={() => handleChangeLanguage(value)}>{key}</MenuItem>
                            })}
                        </Menu>
                    </ul>
                </div>
            </ThemeProvider>
        </div>
    );
}
export default memo(NavBar, isEqual)
