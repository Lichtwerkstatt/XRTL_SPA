import ESPCam from "../../UI/templates/ESPCam";
import OfflineModel from "./media/2D_Overlay.png";
import Model from "./media/Transparent.png";
import ImageMapper from "react-img-mapper";
import React, { useState } from "react";
import "./CSS/2D_Overlay.css";
import { RELAY_G_LASER, RELAY_R_LASER, STEPPER_ROT_LASER } from "../../../services/constants/components";
import { MAPS } from "../../../services/constants";
import { useTranslation } from 'react-i18next';

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
    const { t} = useTranslation();
    const [hoveredArea, setHoveredArea] = useState(null);

    // Determines the width and height of the browser window
    let screen_width = window.innerWidth;
    let screen_height = window.innerHeight;

    // The scaling and offset factors
    let scaling = [1, 1]; // [x-scale, y-scale]
    let offset = [0, 0]; // [x-offset, y-offset]

    // Function scales the rectangular hitboxes according to the height and width of the browser window
    // Requires as input the coordinates of the box in the form of (x_start, y_end, x_end, y_end)
    // Output: scaled array in the form (x_start, y_end, x_end, y_end)
    const boxScaling = (arrayToScale) => {
        let hitbox_scaling = [screen_width / 1920, screen_height / 955, screen_width / 1920, screen_height / 955];
        arrayToScale = arrayToScale.map((value, index) => parseInt(value * hitbox_scaling[index]));

        return arrayToScale;
    }

    // Function transforms the rectangular hitbox coordinates according to scaling and offset factors
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
        name: MAPS.FUNDAMENTAL_2D,
        areas: [
            { controlId: RELAY_G_LASER, shape: "rect", coords: boxScaling(boxTransform([450, 800, 740, 1000])), desc: t('components.' + RELAY_G_LASER) },
            { controlId: RELAY_R_LASER, shape: "rect", coords: boxScaling(boxTransform([5, 480, 180, 740])), desc: t('components.' + RELAY_R_LASER) },
            { controlId: STEPPER_ROT_LASER, shape: "rect", coords: boxScaling(boxTransform([200, 500, 300, 680])), desc: t('components.' + STEPPER_ROT_LASER) },
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
                    {props.socket.connected &&
                        <ESPCam component={'overview'} width={String(window.innerWidth)} height={String(window.innerHeight)}
                                style={{ top: '0px', transform: 'rotate(180deg)', height: '100%', width: '100%', margin: '0', display: 'block' }} />
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