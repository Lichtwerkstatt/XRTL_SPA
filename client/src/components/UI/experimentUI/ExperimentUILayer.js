import MichelsonInterferometer from "../../experiment/MichelsonInterferometer/MichelsonInterferometer";
import { useSocketContext } from "../../../services/SocketContext";
import { usePopUpContext } from "../../../services/PopUpContext";
import { useAppContext } from "../../../services/AppContext";
import WelcomeWindow from "../../windows/WelcomeWindow";
import ManualWindow from "../../windows/ManualWindow";
import { useEffect, useState, Fragment } from "react";
import InfoWindow from "../../windows/InfoWindow";
import CamWindow from "../../windows/OverviewCamWindow";
import { isEqual } from 'lodash';
import { memo } from "react";

const ExperimentUILayer = () => {
  var [connection, setConnection] = useState(false);
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  useEffect(() => {

    const auth = (color) => {
      popupCtx.toggleShowPopUp('Connection successful!', 'success');
      socketCtx.socket.emit('userId', socketCtx.username)
      socketCtx.setNewFont(color);
      setConnection(true)
    }

    const underConstruction = (payload) => {
      appCtx.toggleunderConstruction(payload);
    }

    socketCtx.socket.on('AuthFailed', () => {
      popupCtx.toggleShowPopUp('To many user are connected right now!', 'warning');
    })

    socketCtx.socket.on('Auth', auth);

    socketCtx.socket.on('underConstruction', underConstruction)

    if (!connection) {
      popupCtx.toggleShowPopUp('No server connection!', 'error');
      setConnection('');
    }

    return () => {
      socketCtx.socket.removeAllListeners('underConstruction', underConstruction)
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