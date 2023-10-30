import MichelsonInterferometer from "../../experiment/MichelsonInterferometer/MichelsonInterferometer";
import { useSocketContext } from "../../../services/SocketContext";
import { usePopUpContext } from "../../../services/PopUpContext";
import WelcomeWindow from "../../windows/WelcomeWindow";
import ManualWindow from "../../windows/ManualWindow";
import { useAppContext } from "../../../services/AppContext";
import CamWindow from "../../windows/OverviewCamWindow";
import InfoWindow from "../../windows/InfoWindow";
import { useEffect, Fragment, memo } from "react";
import { isEqual } from 'lodash';

const ExperimentUILayer = () => {
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  useEffect(() => {

    const auth = (color) => {
      popupCtx.toggleShowPopUp('Connection successful!', 'success');
      socketCtx.socket.emit('userId', socketCtx.username)
      socketCtx.setFontColor(color);
    }

    const underConstruction = (payload) => {
      appCtx.toggleunderConstruction(payload);
    }

    const authFailed = () => {
      popupCtx.toggleShowPopUp('To many user are connected right now!', 'warning');
    }

    socketCtx.socket.on('AuthFailed', authFailed)

    socketCtx.socket.on('Auth', auth);

    socketCtx.socket.on('underConstruction', underConstruction)

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
      {appCtx.showWelcomeWindow && <WelcomeWindow />}
      {appCtx.showManualWindow && <ManualWindow />}
      {appCtx.showCam && <CamWindow />}
      <MichelsonInterferometer
        toggleSelect={appCtx.toggleSelectedComp}
        selected={appCtx.selectedComps}
      />
    </Fragment>
  );
};
export default memo(ExperimentUILayer, isEqual);