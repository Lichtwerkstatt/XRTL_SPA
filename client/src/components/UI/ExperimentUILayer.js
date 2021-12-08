import React, { useEffect, useState } from "react";
import { useAppContext } from "../../services/AppContext";
import MichelsonInterferometer from "../experiment/MichelsonInterferometer/MichelsonInterferometer";

const ExperimentUILayer = () => {

  const appCtx = useAppContext();

  return (
    <MichelsonInterferometer
      toggleSelect={appCtx.toggleSelectedComp}
      selected={appCtx.selectedComps}
    />
  );
};

export default ExperimentUILayer;
