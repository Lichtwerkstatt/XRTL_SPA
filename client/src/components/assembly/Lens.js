import Window from '../UI/experimentUI/Window';
import Lens from '../UI/ComponentDescription/Decription_Lens';

const Laser = (props) => {

  return (
    <Window
      id={props.id}
      componentList={[props.controlId]}
      header={props.title}
      top={props.top}
      left={props.left}
      height='220px'
      width='300px'
      footer={'empty'}
      topper={'none'}
    >
      <Lens
        height='200px'
      />
    </Window>
  )
}
export default Laser;