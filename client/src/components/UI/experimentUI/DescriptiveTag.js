import { Html } from "@react-three/drei";

const DescriptiveTag = (props) => {
  const wrapperStyle = {
    color: "white",
    width: "200px",
    height: "30px",
  };
  return <Html position={props.position} style={wrapperStyle} zIndexRange={[0, 10]} >

    <div
      style={{
        height: "150px",
        width: "0px",
        "borderLeft": "2px solid white",
        float: "left",
      }}
    ></div>
    
    <div style={{ "marginLeft": "12px" }}>
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

export default DescriptiveTag;
