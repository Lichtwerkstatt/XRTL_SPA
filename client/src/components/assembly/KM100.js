import { useState } from "react";
import RotaryCtrl from "../UI/RotaryCtrl";
import Window from "../UI/Window";

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
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.id}
        control="top"
        newStatus={handleChangeFooter}
        top="5"
        left="20"
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.id}
        control="bottom"
        newStatus={handleChangeFooter}
        top="5"
        left="80"
      />
    </Window>
  );
};

export default KM100;
