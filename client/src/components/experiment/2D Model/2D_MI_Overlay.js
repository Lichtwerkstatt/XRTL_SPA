import ESPCam from "../../UI/templates/ESPCam";
import OfflineModel from "./media/Offline_BG.png";
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
        let hitbox_scaling = [screen_width / 1920, screen_height / 1009];
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
            { controlId: "KM100_1", shape: "poly", coords: Strech_to_Screen(boxTransform([746,862, 958,851, 959,944, 911,944, 910,910, 790,912, 790,960, 740,960])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Reference Mirror'},
            { controlId: "linear_1", shape: "poly", coords: Strech_to_Screen(boxTransform([174,485, 212,484, 237,494, 254,514, 259,540, 242,571, 210,590, 174,599, 134,593, 109,582, 92,563, 85,538, 95,513, 102,499, 134,486])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Linear Movable Mirror' },
            { controlId: "plate_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([526,639, 731,582, 763,581, 793,587, 815,601, 823,614, 808,649, 802,679, 772,689, 737,691, 707,687, 575,726, 534,724, 504,708, 496,677, 511,652])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Glass Plate Rotation Stage' },
            { controlId: "heater_rotation", shape: "poly", coords: Strech_to_Screen(boxTransform([405,674, 430,675, 460,685, 477,697, 489,726, 520,741, 617,786, 635,804, 641,827, 632,848, 607,867, 576,873, 551,869, 520,869, 489,858, 468,837, 462,823, 445,816, 428,818, 346,773, 326,747, 325,721, 369,700])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Mirror Changing Stage' },
            { controlId: "greenlaser_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1920,364, 1920,398, 1880,413, 1886,492, 1910,492, 1910,521, 1787,519, 1775,392, 1849,364])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Laser Alignment' },
            { controlId: "greenlaserPower_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1748,691, 1777,697, 1797,710, 1809,736, 1800,762, 1785,774, 1752,781, 1722,774, 1704,763, 1689,744, 1686,736, 1689,720, 1698,707, 1714,697, 1725,694])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Power Supply' },
            { controlId: "screen", shape: "poly", coords: Strech_to_Screen(boxTransform([548, 1, 1211, 1, 1142, 174, 638, 172])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Screen' },
            { controlId: "heater", shape: "poly", coords: Strech_to_Screen(boxTransform([1,400, 300,400, 310,420, 310,461, 300,482, 1,482])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Heatable Mirror Stage' },
            { controlId: "experimentSelection", shape: "poly", coords: Strech_to_Screen(boxTransform([1120,246, 1123,484, 1100,484, 1000,482, 1000,387, 1080,387, 1086,246])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Multi Component Selection' },
            { controlId: "lens", shape: "poly", coords: Strech_to_Screen(boxTransform([1200,387, 1256,383, 1259,493, 1202,487])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Lens' },
            { controlId: "bscube", shape: "poly", coords: Strech_to_Screen(boxTransform([768,398, 955,398, 954,485, 940,495, 779,494, 767,484, ])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Beam Splitter' },
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
                <div style={{ position: 'relative', zIndex: 0}}>

                    {/* ESPCam Stream can only be displayed if there is a connection to the server. Otherwise, the OfflineModel image is used as the basis for the hitboxes (see src of the ImageMapper) */}
                    {props.socket.connected ?
                        <ESPCam component={'overview'} width={String(window.innerWidth)} height={String(window.innerHeight - 30)}
                            style={{position: 'absolut', top: '30px', left: '0px', bottom: '0px', right: '0px', transform: 'rotate(180deg)', height: 'calc(100% - 30px)', width: '100%', margin: '0px', padding: '0px', border: '0px', display: 'block'}} />
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