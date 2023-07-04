import { Html } from '@react-three/drei';
import { isEqual } from 'lodash';
import { memo } from 'react'

const DescriptiveTag = (props) => {
  const wrapperStyle = {
    color: 'white',
    width: '200px',
    height: '50px',
    position: 'absolute',
    left: props.position.x + 'px',
    top: props.position.y + 'px',
    transform: 'translateY(-100px)',
  };
  return <Html position={props.position} style={wrapperStyle} zIndexRange={[0, 10]} >

    <div
      style={{
        height: '100px',
        width: '0px',
        borderLeft: '2px solid white',
        float: 'left',
      }}
    ></div>

    <div style={{ 'marginLeft': '12px' }}>
      <span>
        <b>{props.title}</b>
      </span>
      <br />
      {props.description}
      <br />
      {props.status}
    </div>
  </Html>

};

export default memo(DescriptiveTag, isEqual);