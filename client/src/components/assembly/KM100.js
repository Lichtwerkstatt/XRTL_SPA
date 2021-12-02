import { useState } from "react";
import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";
import KM100_Background from "../experiment/MichelsonInterferometer/media/km100_outline.png"

const KM100 = (props) => {
  const [footer, setFooter] = useState(props.footer);

  const handleChangeFooter = (newFooter) => {
    setFooter(newFooter);
  };

  return (
    <Window
      header={props.title + " (" + props.id + ")"}
      footer={footer}
      top={props.top}
      left={props.left}
      height="240px"
      width="250px"
      background={KM100_Background}
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.id}
        control="top"
        newStatus={handleChangeFooter}
        top="20"
        left="160"
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.id}
        control="bottom"
        newStatus={handleChangeFooter}
        top="50"
        left="160"
      />
    </Window>
  );
};

export default KM100;
