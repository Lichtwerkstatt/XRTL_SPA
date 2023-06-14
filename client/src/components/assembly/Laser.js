import PS_Background from './media/PS_outline.png';
import LaserCtrl from '../UI/CtrlUnits/LaserCtrl';
import Window from '../UI/experimentUI/Window';

const Laser = (props) => {

  return (
    <Window
      id={props.id}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      background={PS_Background}
    >
      <LaserCtrl
        component={props.controlId}
      />
    </Window>
  )
}
export default Laser;