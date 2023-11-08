import ImageMapper from "react-img-mapper";
import Model from "./Transparent.png"
import { useState } from "react";
import "./2D_MI_Overlay.css";
import ESPCam from "../../UI/templates/ESPCam";

const Overlay = (props) => {
    const [hoveredArea, setHoveredArea] = useState(null);

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

    const getTipPosition = (area) => {
        return { top: `${area.center[1]}px`, left: `${area.center[0] - 20}px` };
    }

    const clicked = (area) => {
        props.toggleSelect(area.controlId);
        //console.log('You clicked on '+area.controlId+' !' );
    }

    const enterArea = (area) => {
        setHoveredArea(area);
        //console.log("Going in...");
    }

    const leaveArea = (area) => {
        setHoveredArea(null);
        //console.log("Going out...");
    }
    
    return (
        <div className="grid">
            <div className="presenter">
                <div style={{ position: 'relative', zIndex: 0 }}>

                    <ESPCam component={'overview'} width={String(window.innerWidth)} height={String(window.innerHeight)} style={{ top: '0px', transform: 'rotate(180deg)', height: '100%', width: '100%', margin: '0', display: 'block' }} />
                    <ImageMapper
                        src={Model}
                        map={MAP}
                        onClick={(area) => clicked(area)}
                        onMouseEnter={(area) => enterArea(area)}
                        onMouseLeave={(area) => leaveArea(area)}
                        lineWidth={2}
                        strokeColor={"white"}

                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
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