import MichelsonInterferometer from "../../experiment/MichelsonInterferometer/MichelsonInterferometer";
import { useSocketContext } from "../../../services/SocketContext";
import { usePopUpContext } from "../../../services/PopUpContext";
import { useAppContext } from "../../../services/AppContext";
import CamWindow from "../../windows/OverviewCamWindow";
import { useEffect, Fragment } from "react";
import InfoWindow from "../../windows/InfoWindow";
import { isEqual } from 'lodash';
import { memo } from "react";

/**
 *  Fragment component 
 * 
 * @description This React component returns several components, on one hand the information window, the overview camera window and on the other hand the 
 * experiment class that handles the rendering of the component windows. Furthermore, within this component, the auth/authfail command is handled and the 
 * associated pop-up windows. The underConstruction command is processed within this React component.
 * 
 * @returns {React.Fragment} Information window, the overview camera and experiment component  
 */
const ExperimentUILayer = () => {
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  useEffect(() => {
    // If authentication was successful on the server side, then auth command is received with the colour assigned by the server.
    const auth = (color) => {
      popupCtx.toggleShowPopUp('Connection successful!', 'success');
      socketCtx.socket.emit('userId', socketCtx.username);
      socketCtx.setConnected(true);
      socketCtx.setFontColor(color);
    }

    // When underConstruction command is received
    const underConstruction = (payload) => {
      appCtx.toggleunderConstruction(payload);
    }

    // If authentication fails on the server side because too many users are connected to the server, the authfailed command is sent to the client.
    const authFailed = () => {
      socketCtx.setConnected(false);
      popupCtx.toggleShowPopUp('To many user are connected right now!', 'warning');
    }

    socketCtx.socket.on('AuthFailed', authFailed)

    socketCtx.socket.on('Auth', auth);

    socketCtx.socket.on('underConstruction', underConstruction)

    // Prevents the rendering of the pop-up message when the web page is opened.
    if (!socketCtx.socket.connected) {
      popupCtx.toggleShowPopUp('No server connection!', 'error');
    }

    return () => {
      socketCtx.socket.removeAllListeners('underConstruction', underConstruction)
      socketCtx.socket.removeAllListeners('AuthFailed', authFailed)
      socketCtx.socket.removeAllListeners('Auth', auth)

    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket]);

  return (
    <Fragment>
      {appCtx.showInfoWindow && <InfoWindow />}
      {appCtx.showCam && <CamWindow />}
      <MichelsonInterferometer
        toggleSelect={appCtx.toggleSelectedComp}
        selected={appCtx.selectedComps}
      />
    </Fragment>
  );
};
export default memo(ExperimentUILayer, isEqual);