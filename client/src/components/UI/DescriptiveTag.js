import { Html } from "@react-three/drei";

const DescriptiveTag = (props) => {
  const wrapperStyle = {
    color: "white",
    width: "200px",
    height: "30px",
    border: "1px solid green",
    "z-index": "-1",
    "pointer-event": "none",
  };
  return <Html position={props.position} style={wrapperStyle} >

        <div
          style={{
            height: "150px",
            width: "0px",
            "border-left": "2px solid white",
            float: "left",
          }}
        ></div>
        <div>
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
