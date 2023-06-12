import Settings from '../UI/CtrlUnits/Settings';
import Window from '../UI/experimentUI/Window';

const ESPCamStream = (props) => {
  var width = window.innerWidth
  var height = 0;
  var mobile = true;

  if (0 < width && width < 576) {
    width = '350px'
    height = '260px'
  }
  else if (576 < width && width < 768) {
    width = '510px'
    height = '340px'
  }
  else if (768 < width && width < 1000) {
    width = '650px'
    height = '430px'
  } else {
    width = '1000px'
    height = '430px'
  }

  if (props.setting && width === '1000px') {
    width = '1000px';
    mobile = false
  } else if (!props.setting && width === '1000px') {
    width = '670px';
    mobile = false;
  }

  return (
    <Window
      id={props.controlId}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      width={width}
      height={height}
    >
      <Settings
        component={props.controlId}
        width={width}
        setting={props.setting}
        setSetting={props.setSetting}
        mobile={mobile}
      />
    </Window>
  );
};
export default ESPCamStream;