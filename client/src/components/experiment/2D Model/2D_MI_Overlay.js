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
        let hitbox_scaling = [screen_width / 1920, screen_height / 1010];
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
            { controlId: "KM100_1", shape: "poly", coords: Strech_to_Screen(boxTransform([734,896, 951,895, 951,984, 907,984, 907,954, 785,954, 785,998, 734,998])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Reference Mirror'},
            { controlId: "linear_1", shape: "poly", coords: Strech_to_Screen(boxTransform([184,505, 222,504, 247,514, 264,534, 269,560, 252,591, 220,610, 184,619, 144,613, 119,602, 102,583, 95,558, 105,533, 122,519, 154,506])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Linear Movable Mirror' },
            { controlId: "plate_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([526,666, 729,614, 776,616, 813,639, 816,678, 800,703, 767,719, 732,720, 701,717, 584,754, 540,758, 513,751, 500,736, 495,717, 506,690])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Glass Plate Rotation Stage' },
            { controlId: "heater_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([488,761, 615,823, 631,845, 633,871, 613,895, 596,905, 565,909, 543,906, 505,903, 482,893, 466,879, 457,859, 438,851, 426,852, 346,807, 326,781, 327,750, 355,717, 402,704, 430,705, 455,714, 476,728, 484,744])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Mirror Changing Stage' },
            { controlId: "greenlaser_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1743,418, 1829,385, 1895,385, 1895,430, 1850,432, 1851,508, 1895,508, 1895,540, 1766,544])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Laser Alignment' },
            { controlId: "greenlaserPower_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1733,723, 1747,726, 1770,735, 1789,754, 1794,770, 1791,790, 1778,805, 1758,815, 1736,816, 1710,811, 1688,796, 1676,782, 1672,769, 1678,748, 1692,733, 1709,727, 1712,725])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Power Supply' },
            { controlId: "screen", shape: "poly", coords: Strech_to_Screen(boxTransform([540, 1, 1205, 1, 1132, 201, 642, 199])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Screen' },
            { controlId: "heater", shape: "poly", coords: Strech_to_Screen(boxTransform([5,430, 315,430, 315,502, 5,502])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Heatable Mirror Stage' },
            { controlId: "experimentSelection", shape: "poly", coords: Strech_to_Screen(boxTransform([986,415, 1080,414, 1080,277, 1106,277, 1106,510, 986,510])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Multi Component Selection' },
            { controlId: "lens", shape: "poly", coords: Strech_to_Screen(boxTransform([1195,410, 1277,409, 1279,518, 1195,518])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Lens' },
            { controlId: "bscube", shape: "poly", coords: Strech_to_Screen(boxTransform([768,407, 947,415, 947,512, 934,527, 773,526, 764,510])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Beam Splitter' },
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