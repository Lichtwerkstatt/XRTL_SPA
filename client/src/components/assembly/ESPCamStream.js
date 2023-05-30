import Settings from '../UI/CtrlUnits/Settings';
import Window from '../UI/experimentUI/Window';
import { useAppContext } from '../../services/AppContext';

const ESPCamStream = (props) => {
  const appCtx = useAppContext();
  var width = window.innerWidth
  var height = 0;

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

  if (appCtx.smallSetting && width === '1000px') {
    width = '1000px'
  } else if(!appCtx.smallSetting && width === '1000px') {
    width = '670px'
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
      />
    </Window>
  );
};
export default ESPCamStream;