import Window from '../UI/experimentUI/Window';
import Cube from '../experiment/ComponentDescription/Decription_Cube';

const BsCube = (props) => {

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
      <Cube
        height='220px'
      />
    </Window>
  )
}
export default BsCube;