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
      height="250px"
      width="230px"
    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.id}
        control="top"
        newStatus={handleChangeFooter}
        top="20"
        left="130"
      />
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.id}
        control="bottom"
        newStatus={handleChangeFooter}
        top="50"
        left="130"
      />
    </Window>
  );
};

export default KM100;
