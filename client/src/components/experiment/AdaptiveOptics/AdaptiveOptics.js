import Pinhole from "../../assembly/Pinhole";
import LaserCtrl from "../../assembly/Laser";
import Rotary from '../../assembly/Rotary';
import KM100 from "../../assembly/KM100";
import SM1ZP from "../../assembly/SM1ZP";
import { useState } from "react";

const AdaptiveOptics = (props) => {
  let footer = "Initializing..."
  var zero = "0"
  const [setting, setSetting] = useState(false)

  var height = window.innerHeight;
  var width = window.innerWidth;
  var halfWidth = width / 2;
  var topHigh = String(height - (height / 3 * 2.7))
  var topHighMiddle = String(height - (height / 1.4))
  var topMiddle = String(height - (height / 2.15))
  var leftLeft = String(width - (halfWidth * 1.9))
  var leftMiddle = String(width - (halfWidth * 1.8))
  var leftRight = String(width - (halfWidth * 0.47))
  var leftMiddleRight = String(width - (halfWidth * 0.4))

  return (
    <div>
      {/* KM100 */}
      {props.selected.has('KM100B_1') && (
        <KM100
          title="Reference Mirror"
          id={'KM100B_1'}
          controlIdTop={'KM100B_top_1'}
          controlIdBottom={'KM100B_bottom_1'}
          rotationTop={zero}
          rotationBottom={zero}
          footer={footer}
          top={600}
          left={920}
        />
      )}

      {/* Linear stage */}
      {props.selected.has('linear_1') && (
        <SM1ZP
          title="Linear Movable Mirror"
          controlId={'linear_1'}
          footer={footer}
          rotation={zero}
          top={600}
          left={100}
        />
      )}

      {/* Laser ctrl */}
      {props.selected.has('redlaser_1') && (
        <KM100
          title="Laser Alignment"
          id={'redlaser_1'}
          controlIdTop={'redlaser_top_1'}
          controlIdBottom={'redlaser_bottom_1'}
          rotationTop={zero}
          rotationBottom={zero}
          footer={footer}
          top={450}
          left={1600}
        />
      )}

      {/* Laser power */}
      {props.selected.has('redlaserPower_1') && (
        <LaserCtrl
          title="Power Supply"
          id={'redlaserPower_1'}
          controlId={'redlaser_1'}
          footer={footer}
          top={50}
          left={1600}
        />
      )}

      {/* Pinhole */}
      {props.selected.has('pinhole') && (
        <Pinhole
          title="Pinhole"
          controlId={'pinhole'}
          footer={footer}
          top={100}
          left={1100}
        />
      )}
      {/* Rotary stage Measurement Mirror*/}
      {props.selected.has('rotaryStage_1') && (
        <Rotary
          title='Rotary stage'
          controlId={'rotaryStage_1'}
          footer={footer}
          rotation={zero}
          top={50}
          left={150}
        />
      )}
    </div>
  );
};
export default AdaptiveOptics;