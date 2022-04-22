import { useAppContext } from "../../services/AppContext";
import Window from "../UI/Window";
import InfoWindowContent from "./InfoWindowContent";

const InfoWindow = (props) => {
  const appCtx = useAppContext();

  const handleCloseWindow = () => {
    appCtx.toggleShowInfoWindow();
  };

  console.log("I'm here!");
  return (
    <Window
      header="About XR TwinLab"
      top="250"
      left="200"
      
      width="600px"
      onClose={handleCloseWindow}
    >
      <InfoWindowContent />
    </Window>
  );
};
export default InfoWindow;
