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
      height='200px'
      width='300px'
    >
      <LaserCtrl
        component={props.controlId}
        top='0'
        left='0'
        led={props.LED}
      />
    </Window>
  )
}
export default Laser;