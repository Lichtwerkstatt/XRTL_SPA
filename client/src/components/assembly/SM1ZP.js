import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import SM1ZP_bg from './media/linear_outline.png';
import Window from '../UI/experimentUI/Window';

const SM1ZP = (props) => {
  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width='250px'
      height='235px'
      background={SM1ZP_bg}

    >
      <RotaryCtrl
        rotation={props.rotation}
        component={props.controlId}
        led={props.LED}
        top='35'
        left='160'
      />
    </Window>
  );
};

export default SM1ZP;
