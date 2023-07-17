import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import XR50P_bg from './media/XR50P_outline.png';
import Window from '../UI/experimentUI/Window';

const XR50P = (props) => {
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      background={XR50P_bg}

    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.controlId}
        top='35'
        left='160'
      />
    </Window>
  );
};

export default XR50P;
