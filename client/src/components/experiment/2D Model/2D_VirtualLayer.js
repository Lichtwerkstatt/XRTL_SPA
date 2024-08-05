import ESPCam from "../../UI/templates/ESPCam";
import OfflineModel from "./media/AO_2D.png";
import Model from "./media/Transparent.png";
import ImageMapper from "react-img-mapper";
import React, { useState } from "react";
import "./CSS/2D_MI_Overlay.css";

/**
 * OverviewCam Stream as a 2D-VirtualLayer
 * 
 * @description Within this React component, the OverviewCam stream is set as the background of the React app, and hitboxes are placed where the optical components are. 
 * Clicking on these boxes will open the corresponding component window. If there is no connection to the server, an image is used instead of the stream.
 * 
 * @param {Function} toggleSelect - Adds the clicked component to the set in AppContext
 * @param {Set} selected - Contains the components whose component windows are currently open.
 * @param {Socket} socket - Holds the connection to the server
 * 
 * @returns {React.ReactElement} 2D VirtualLayer
 */

const Overlay = (props) => {
    const [hoveredArea, setHoveredArea] = useState(null);

    // Determines the width and height of the browser window
    let screen_width = window.innerWidth;
    let screen_height = window.innerHeight;

    // The scaling and offset factors
    let scaling = [1.0, 0.97]; // [x-scale, y-scale]
    let offset = [0, 30]; // [x-offset, y-offset]

    // The Colors for the Hitboxes
    let preFill_Color = "rgba(200, 200, 250, 0.2)";
    let fill_Color = "rgba(200, 255, 200, 0.3)";

    // Function scales the polygonal hitbox according to the height and width of the browser window 
    // Requires an array in the format [x1, y1, x2, y2, ...]
    // Output: scaled array in the form [x1, y1, x2, y2, ...]
    const Strech_to_Screen = (arrayToTransform) => {
        let hitbox_scaling = [screen_width / 1920, screen_height / 1008];
        arrayToTransform = arrayToTransform.map((value, index) => parseInt(value * (hitbox_scaling[index % hitbox_scaling.length])));

        return arrayToTransform;
    }

    // Function transforms the polygonal hitbox coordinates according to scaling and offset factors
    // Requires an array in the format [x1, y1, x2, y2, ...]
    // Transforms the vector using the scaling and offset variables
    const boxTransform = (arrayToTransform) => {
        arrayToTransform = arrayToTransform.map((value, index) => parseInt(value * (scaling[index % scaling.length])));
        arrayToTransform = arrayToTransform.map((value, index) => parseInt(value + (offset[index % offset.length])));

        return arrayToTransform;
    }

    // Definition of all hitboxes by specifying the controlId, the shape, the coordinates (x_start, y_start, x_end, y_end) 
    // and the text to be displayed when hovering over the box.
    let MAP = {
        name: "MI_Simple_imagemap",
        areas: [
            //{ controlId: "KM100B_1", shape: "poly", coords: Strech_to_Screen(boxTransform([720, 356, 840, 356, 840, 281, 720, 281])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Prism Mount'},
            { controlId: "stepper_linear1", shape: "poly", coords: Strech_to_Screen(boxTransform([687, 718, 888, 718, 888, 429, 687, 429])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Linear Stage' },
            //{ controlId: "redlaser_1", shape: "poly", coords: Strech_to_Screen(boxTransform([])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Laser Alignment' },
            { controlId: "relay_laser", shape: "poly", coords: Strech_to_Screen(boxTransform([10, 845, 110, 845, 110, 745, 10, 745])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Power Supply' },
            { controlId: "stepper_pinhole", shape: "poly", coords: Strech_to_Screen(boxTransform([372, 500, 470, 500, 470, 370, 372, 370])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Pinhole' },
            { controlId: "eye_1", shape: "poly", coords: Strech_to_Screen(boxTransform([75, 370, 300, 370, 300, 230, 75, 230])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Artificial Eye' },
            { controlId: "stepper_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([0, 515, 60, 515, 60, 450, 0, 450])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Target Changing Stage' },
            { controlId: "beamSplitter", shape: "poly", coords: Strech_to_Screen(boxTransform([365, 357, 449, 357, 449, 282, 365, 282])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Beam Splitter' },
            { controlId: "prism", shape: "poly", coords: Strech_to_Screen(boxTransform([720, 356, 840, 356, 840, 281, 720, 281])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Prism' },
            { controlId: "telescope_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1200, 417, 1763, 417, 1763, 290, 1200, 290])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Telescope 1' },
            { controlId: "telescope_2", shape: "poly", coords: Strech_to_Screen(boxTransform([1503, 691, 1887, 492, 1812, 426, 1440, 609])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Telescope 2' },
            { controlId: "servo_screen", shape: "poly", coords: Strech_to_Screen(boxTransform([1127, 511, 1213, 511, 1213, 381, 1127, 381])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Screen Retraction' },
            { controlId: "mirror_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1851, 415, 1920, 415, 1920, 312, 1851, 312])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Adaptive Mirror' },
            { controlId: "wavesensor_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1265, 827, 1453, 738, 1369, 624, 1190, 702])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Wavefront Sensor' },
            { controlId: "cam_screen", shape: "poly", coords: Strech_to_Screen(boxTransform([1084, 426, 1120, 426, 1120, 295, 1084, 295])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Screen' },
            { controlId: "cam_eye", shape: "poly", coords: Strech_to_Screen(boxTransform([524, 260, 614, 260, 614, 155, 524, 155])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Detail Cam' },
        ]
    };

    // Returns the position where the text to be displayed is to be placed
    const getTipPosition = (area) => {
        return { top: `${area.center[1]-50}px`, left: `${area.center[0] - 50}px` };
    }

    // Adds the clicked component to the set within the AppContext, whereupon the corresponding component window is rendered.
    const clicked = (area) => {
        props.toggleSelect(area.controlId);
        // console.log('You clicked on ' + area.controlId + ' !');
    }

    // Displays the hitbox and the description when hovering over the box with the mouse
    const enterArea = (area) => {
        setHoveredArea(area);
        //console.log("Going in...");
    }

    // Ensures that the hitbox and the description are no longer displayed when you leave the box area with the mouse
    const leaveArea = (area) => {
        setHoveredArea(null);
        //console.log("Going out...");
    }

    return (
        <div className="grid">
            <div className="presenter">
                <div style={{ position: 'relative', zIndex: 0 }}>

                    {/* ESPCam Stream can only be displayed if there is a connection to the server. Otherwise, the OfflineModel image is used as the basis for the hitboxes (see src of the ImageMapper) */}
                    {props.socket.connected ?
                        <ESPCam component={'overview'} width={String(window.innerWidth)} height={String(window.innerHeight)}
                            style={{ top: '0px', transform: 'rotate(180deg)', height: '100%', width: '100%', margin: '0', display: 'block' }} />
                        :
                        <div />
                    }

                    {/* To render the hitboxes, the ImageMapper requires an image as a source (in this case a transparent image if there is a server connection 
                        and a replacement image if not) and the already defined boxes, which are then projected onto the image. */}
                    <ImageMapper
                        src={props.socket.connected ? Model : OfflineModel}
                        map={MAP}
                        onClick={(area) => clicked(area)}
                        onMouseEnter={(area) => enterArea(area)}
                        onMouseLeave={(area) => leaveArea(area)}
                        lineWidth={0}
                        strokeColor={"rgba(200, 200, 200, 0.0)"}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                    {/* Handles displaying the description when hovering over the box with the mouse */}
                    {hoveredArea && (
                        <span className="tooltip"
                            style={{ ...getTipPosition(hoveredArea) }}>
                            {hoveredArea && hoveredArea.desc}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Overlay;