import Settings from '../UI/CtrlUnits/Settings';
import Window from '../UI/experimentUI/Window';

const ESPCamStream = (props) => {

  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width='1000px'
      height='430px'
    >
      <Settings
        component={props.controlId}
      />
    </Window>
  );
};
export default ESPCamStream;