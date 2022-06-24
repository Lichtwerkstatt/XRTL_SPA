//import { MdSettingsApplications } from "react-icons/md";
import { useAppContext } from "../../services/AppContext";
import InfoWindow from "../windows/InfoWindow";
import MichelsonInterferometer from "../experiment/MichelsonInterferometer/MichelsonInterferometer";
import React from "react";

const ExperimentUILayer = () => {
  const appCtx = useAppContext();

  return (
    <React.Fragment>
      {appCtx.showInfoWindow && <InfoWindow />}
      <MichelsonInterferometer
        toggleSelect={appCtx.toggleSelectedComp}
        selected={appCtx.selectedComps}
      />
    </React.Fragment>
  );
};

export default ExperimentUILayer;
