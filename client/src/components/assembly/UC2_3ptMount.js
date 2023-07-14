import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Window from '../UI/experimentUI/Window';

const UC2_3ptMount = (props) => {
  return (
    <Window
      id={props.id}
      componentList={[props.controlIdVertical, props.controlIdHorizontal, props.controlIdCenter]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='450px'
      width='350px'
    >
      <RotaryCtrl
        rotation={props.rotationVertical}
        component={props.controlIdVertical}
        top='20'
        left='160'
      />
      <RotaryCtrl
        rotation={props.rotationCenter}
        component={props.controlCenter}
        top='50'
        left='160'
      />
      <RotaryCtrl
        rotation={props.rotationHorizontal}
        component={props.controlHorizontal}
        top='100'
        left='200'
        />
    </Window>
  );
};
export default UC2_3ptMount;