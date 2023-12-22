import React, { useRef, memo } from "react";
import { isEqual } from "lodash";

function Model2d({ ...props }) {
  const group = useRef();

  return (
    <group ref={group} {...props} dispose={null}>
    </group>
  );
}

export default memo(Model2d, isEqual);