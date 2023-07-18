import Window from '../UI/experimentUI/Window';
import Lens from '../experiment/ComponentDescription/Content/Decription_Lens';

const Laser = (props) => {

  return (
    <Window
      id={props.controlId}
      header={props.title}
      top={props.top}
      left={props.left}
      height='240px'
      width='250px'
      footer={'empty'}
      topper={'none'}
    >
      <Lens
        height='220px'
      />
    </Window>
  )
}
export default Laser;