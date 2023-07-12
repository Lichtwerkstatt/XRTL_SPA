import { Html } from '@react-three/drei';
import propTypes from "prop-types";
import { isEqual } from 'lodash';
import { memo } from 'react'

/**
 * Descriptive tag component
 * 
 * @description The Recat component returns the tag of a component for the 3D model. For this, the title, the description and the position within the 3D space must be specified.
 * 
 * @param {string} title - title of a component
 * @param {string} description - Short description of the components
 * @param {string} position  - Positioning of the tag
 * 
 * 
 * @returns {React.ReactElement} styled tag
 */
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

DescriptiveTag.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  position: propTypes.array.isRequired
}

export default memo(DescriptiveTag, isEqual);
