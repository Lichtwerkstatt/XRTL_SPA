import MichelsonInterferometer from "../../experiment/MichelsonInterferometer/MichelsonInterferometer";
import { useSocketContext } from "../../../services/SocketContext";
import { usePopUpContext } from "../../../services/PopUpContext";
import { useAppContext } from "../../../services/AppContext";
import { useEffect, useState, Fragment } from "react";
import ManualWindow from "../../windows/ManualWindow";
import InfoWindow from "../../windows/InfoWindow";
import HelpWindow from "../../windows/HelpWindow";
import CamWindow from "../../windows/CamWindow";
import { isEqual } from 'lodash';
import { memo } from "react"

const ExperimentUILayer = () => {
  var [connection, setConnection] = useState(false);
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();

  useEffect(() => {

    const auth = (color) => {
      popupCtx.toggleShowPopUp('Connection successful!', 'success');
      socketCtx.setNewFont(color);
      setConnection(true);
    }
    socketCtx.socket.on('AuthFailed', () => {
      popupCtx.toggleShowPopUp('To many user are connected right now!', 'warning');
    })

    socketCtx.socket.on('Auth', auth);

    if (!connection) {
      popupCtx.toggleShowPopUp('No server connection!', 'error');
      setConnection('');
    }

    return () => {
      socketCtx.socket.removeAllListeners('Auth', auth)
    }
    //Comment needed to prevent a warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketCtx.socket]);

  return (
    <Fragment>
      {appCtx.showInfoWindow && <InfoWindow />}
      {appCtx.showHelpWindow && <HelpWindow />}
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