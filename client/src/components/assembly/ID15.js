import { useState } from "react";
import Window from "../UI/Window";
import { useAppContext } from "../../services/AppContext";
import SliderCtrl from "../UI/SliderCtrl";
import ID15_Background from "./media/id15_outline.png";

const ID15 = (props) => {
  const [footer, setFooter] = useState(props.footer);
  const appCtx = useAppContext();

  const handleCloseWindow = () => {
    appCtx.toggleSelectedComp(props.id)
  }

  const handleChangeFooter = (newFooter) => {
    setFooter(newFooter);
  };

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      top={props.top}
      left={props.left}
      height="240px"
      width="250px"
      background={ID15_Background}
      onClose={handleCloseWindow}
      newStatus={handleChangeFooter}
      footer={footer}
    >
      <SliderCtrl
        sliderPos={props.sliderPos}
        component={props.id}
        newStatus={handleChangeFooter}
        footer={footer}
        top="50"
        left="50"
      />
    </Window>
  )
}

export default ID15;