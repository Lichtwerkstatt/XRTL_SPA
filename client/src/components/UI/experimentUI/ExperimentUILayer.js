import MichelsonInterferometer from "../../experiment/MichelsonInterferometer/MichelsonInterferometer";
import { useSocketContext } from "../../../services/SocketContext";
import { usePopUpContext } from "../../../services/PopUpContext";
import React, { useEffect, useState, useRef } from "react";
import { useAppContext } from "../../../services/AppContext";
import InfoWindow from "../../windows/InfoWindow";
import { memo } from "react"
import { isEqual } from 'lodash';
import CamWindow from "../../windows/CamWindow";

const ExperimentUILayer = () => {
  var [connection, setConnection] = useState(false);
  const socketCtx = useSocketContext();
  const popupCtx = usePopUpContext();
  const appCtx = useAppContext();
  const connCtrl = useRef();

  const ConnectionSuccess = () => {
    socketCtx.socket.on('Auth', () => {
      popupCtx.toggleShowPopUp('Connection successful!', 'success');
      setConnection(true);
    });

    if (!connection) {
      popupCtx.toggleShowPopUp('No server connection!', 'error');
      setConnection('');
    }
  }

  connCtrl.current = ConnectionSuccess;

  useEffect(() => {
    connCtrl.current();
  }, [socketCtx.socket]);

  return (
    <React.Fragment>
      {appCtx.showInfoWindow && <InfoWindow />}
      {appCtx.showCam && <CamWindow />}
      <MichelsonInterferometer
        toggleSelect={appCtx.toggleSelectedComp}
        selected={appCtx.selectedComps}
      />
    </React.Fragment>
  );
};

export default memo(ExperimentUILayer, isEqual);
