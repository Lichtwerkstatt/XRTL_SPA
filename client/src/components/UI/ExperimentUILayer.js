
import { MdSettingsApplications } from "react-icons/md";
import { useAppContext } from "../../services/AppContext";
//import MichelsonInterferometer from "../experiment/MichelsonInterferometer/MichelsonInterferometer";
import DigiLabs4YouDemo from "../experiment/digilab4You/DigiLabs4YouDemo";

const ExperimentUILayer = () => {

  const appCtx = useAppContext();

  return (
    <DigiLabs4YouDemo
      toggleSelect={appCtx.toggleSelectedComp}
      selected={appCtx.selectedComps}
    />
  );
};

export default ExperimentUILayer;
