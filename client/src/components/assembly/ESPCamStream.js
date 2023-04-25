import Settings from '../UI/CtrlUnits/Settings';
import Window from '../UI/experimentUI/Window';

const ESPCamStream = (props) => {
  var width = window.innerWidth;

  if (0 < width && width < 576) {
    width = '350px'
  }
  else if (576 < width && width < 768) {
    width = '520px'
  }
  else if (768 < width && width < 922) {
    width = '700px'
  } else {
    width = '1000px'
  }

  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width={width}
      height='430px'
    >
      <Settings
        component={props.controlId}
        led={props.LED}
      />
    </Window>
  );
};
export default ESPCamStream;