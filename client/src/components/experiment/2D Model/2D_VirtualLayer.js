import ESPCam from "../../UI/templates/ESPCam";
import OfflineModel from "./media/MI_2D.png";
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
        let hitbox_scaling = [screen_width / 1920, screen_height / 955];
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
            { controlId: "KM100_1", shape: "poly", coords: Strech_to_Screen(boxTransform([728,846, 945,846, 945,940, 900,940, 900,902, 770,902, 770,942, 727,942])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Reference Mirror'},
            { controlId: "linear_1", shape: "poly", coords: Strech_to_Screen(boxTransform([179,489, 217,494, 242,504, 259,524, 264,550, 247,581, 214,600, 179,609, 139,603, 114,592, 97,573, 90,548, 100,523, 112,504, 144,492])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Linear Movable Mirror' },
            { controlId: "plate_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([536,627, 744,577, 811,593, 833,638, 800,682, 578,726, 522,710, 508,665])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Glass Plate Rotation Stage' },
            { controlId: "heater_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([368,688, 422,672, 455,675, 635,785, 644,818, 618,860, 564,862, 360,763, 338,725])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Mirror Changing Stage' },
            { controlId: "greenlaser_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1763,398, 1849,365, 1915,365, 1915,410, 1870,412, 1871,488, 1915,488, 1915,520, 1786,524])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Laser Alignment' },
            { controlId: "greenlaserPower_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1577,725, 1777,725, 1789,865, 1585, 865])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Power Supply' },
            { controlId: "screen", shape: "poly", coords: Strech_to_Screen(boxTransform([516, 4, 1188, 4, 1140, 191, 647, 193])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Screen' },
            { controlId: "heater", shape: "poly", coords: Strech_to_Screen(boxTransform([5,415, 310,415, 310,487, 5,487])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Retract. Beam Splitter' },
            { controlId: "experimentSelection", shape: "poly", coords: Strech_to_Screen(boxTransform([984,395, 1078,394, 1078,257, 1104,257, 1104,490, 984,490])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Multi Component Selection' },
            { controlId: "lens", shape: "poly", coords: Strech_to_Screen(boxTransform([1200,393, 1282,392, 1284,501, 1200,501])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Lens' },
            { controlId: "bscube", shape: "poly", coords: Strech_to_Screen(boxTransform([772,390, 922,390, 933,408, 931,509, 783,511, 767,495])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Beam Splitter' },
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