import KM100_Background from './media/km100_outline.png'
import RotaryCtrl from '../UI/CtrlUnits/RotaryCtrl';
import Window from '../UI/experimentUI/Window';

const KM100 = (props) => {
  return (
    <Window
      id={props.id}
      componentList={[props.controlIdBottom, props.controlIdTop]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      background={KM100_Background}

    >
      <RotaryCtrl
        rotation={props.rotationTop}
        component={props.controlIdTop}
        top='20'
        left='160'
      />
      
      <RotaryCtrl
        rotation={props.rotationBottom}
        component={props.controlIdBottom}
        top='50'
        left='160'
      />
    </Window>
  );
};
export default KM100;