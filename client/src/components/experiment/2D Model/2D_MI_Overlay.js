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
    let offset = [0, 36]; // [x-offset, y-offset]

    // The Colors for the Hitboxes
    let preFill_Color = "rgba(250, 200, 150, 0.3)";
    let fill_Color = "rgba(200, 255, 200, 0.3)";
    // Function scales the polygonal hitbox according to the height and width of the browser window 
    // Requires an array in the format [x1, y1, x2, y2, ...]
    // Output: scaled array in the form [x1, y1, x2, y2, ...]
    const Strech_to_Screen = (arrayToTransform) => {
        let hitbox_scaling = [screen_width / 1920, screen_height / 1080];
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
            { controlId: "screen", shape: "poly", coords: Strech_to_Screen(boxTransform([395,0, 1090,0, 1079,87, 486,106])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Screen' },
            { controlId: "linear_1", shape: "poly", coords: Strech_to_Screen(boxTransform([168,480, 232,481, 304,498, 298,590, 265,592, 265,603, 192,597, 162,587, 140,552, 138,517, 154,489])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Linear Movable Mirror' },
            { controlId: "beamblocker1", shape: "poly", coords: Strech_to_Screen(boxTransform([469,608, 525,614, 597,611, 609,620, 611,711, 598,720, 504,723, 470,729, 453,717, 443,692, 442,668, 447,637, 453,618])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Beam Blocker' },
            { controlId: "KM100_1", shape: "poly", coords: Strech_to_Screen(boxTransform([580,902, 783,902, 783,986, 730,986, 730,959, 623,959, 623,986, 580,986])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Reference Mirror' },
            { controlId: "beamSplitter", shape: "poly", coords: Strech_to_Screen(boxTransform([1007,574, 974,555, 1003,530, 1013,535, 1018,533, 1040,545, 1077,520, 1083,521, 1092,527, 1091,543, 1122,566, 1024,649, 978,619, 975,606])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Retract. Beam Splitter' },
            { controlId: "beamblocker2", shape: "poly", coords: Strech_to_Screen(boxTransform([833,747, 833,693, 844,682, 965,680, 982,689, 982,757, 975,765, 916,770, 867,770, 823,766, 822,754])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Beam Blocker' },
            { controlId: "greenlaserPower_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1445,300, 1473,316, 1509,321, 1537,319, 1568,305, 1595,279, 1604,253, 1589,222, 1565,204, 1528,196, 1489,201, 1460,216, 1436,238, 1428,265, 1431,281])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Power Supply' },
            { controlId: "greenlaser_1", shape: "poly", coords: Strech_to_Screen(boxTransform([1532,599, 1523,457, 1535,445, 1628,443, 1639,604, 1549,608])), preFillColor: preFill_Color, fillColor: fill_Color, desc: 'Laser Alignment' },
        ]
    };

    // Returns the position where the text to be displayed is to be placed
    const getTipPosition = (area) => {
        //console.log(area.scaledCoords); // Scaled Coordinates
        //console.log(area.center); // Scaled Center
        return { top: `${area.center[1] - 25}px`, left: `${area.center[0] - 50}px` };
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