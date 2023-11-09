import ESPCam from "../../UI/templates/ESPCam";
import OfflineModel from "./media/MI_2D.jpg";
import Model from "./media/Transparent.png";
import ImageMapper from "react-img-mapper";
import React, { useState } from "react";
import "./2D_MI_Overlay.css";

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

    // Definition of all hitboxes by specifying the controlId, the shape, the coordinates (x_start, y_start, x_end, y_end) 
    // and the text to be displayed when hovering over the box.
    let MAP = {
        name: "MI_Simple_imagemap",
        areas: [
            { controlId: "screen", shape: "rect", coords: [380, 0, 1100, 100], desc: 'Screen' },
            { controlId: "linear_1", shape: "rect", coords: [5, 480, 180, 740], desc: 'Linear Movable Mirror' },
            { controlId: "beamblocker1", shape: "rect", coords: [200, 560, 300, 730], desc: 'Beam Blocker' },
            { controlId: "KM100_1", shape: "rect", coords: [450, 800, 740, 1000], desc: 'Reference Mirror' },
            { controlId: "beamSplitter", shape: "rect", coords: [730, 400, 940, 600], desc: 'Retract. Beam Splitter' },
            { controlId: "beamblocker2", shape: "rect", coords: [680, 700, 900, 800], desc: 'Beam Blocker' },
            { controlId: "greenlaserPower_1", shape: "rect", coords: [1350, 200, 1600, 450], desc: 'Power Supply' },
            { controlId: "greenlaser_1", shape: "rect", coords: [1450, 450, 1700, 650], desc: 'Laser Alignment' },

        ]
    };

    // Returns the position where the text to be displayed is to be placed
    const getTipPosition = (area) => {
        return { top: `${area.center[1]}px`, left: `${area.center[0] - 20}px` };
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
                        lineWidth={2}
                        strokeColor={"white"}

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