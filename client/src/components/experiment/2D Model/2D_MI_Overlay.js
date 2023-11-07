import ImageMapper from "react-img-mapper";
import Model from "./MI_2D.jpg"
import { useState } from "react";
import "./2D_MI_Overlay.css";
import { useSocketContext } from "../../../services/SocketContext";

const Overlay = (props) => {
    const [hoveredArea, setHoveredArea] = useState(null);

    const socketCtx = useSocketContext();

    let MAP = {
        name: "openOTC_imagemap",
        areas: [
            { controlId: "screen", shape: "rect", coords: [380, 0, 1100, 100], desc: 'Screen' },
            { controlId: "linear_1", shape: "rect", coords: [5, 480, 180, 740], desc: 'Linear Movable Mirror' },
            { controlId: "beamsplitter1", shape: "rect", coords: [200, 560, 300, 730], desc: 'Beam Blocker' },
            { controlId: "KM100_1", shape: "rect", coords: [450, 900, 740, 1100], desc: 'Reference Mirror' },
            { controlId: "beamsplitter2", shape: "rect", coords: [680, 800, 900, 900], desc: 'Beam Blocker' },
            { controlId: "beamsplitter2", shape: "rect", coords: [700, 500, 900, 650], desc: 'Retract. Beam Splitter' },
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

                    <ImageMapper
                        src={Model}
                        map={MAP}
                        onClick={(area) => clicked(area)}
                        onMouseEnter={(area) => enterArea(area)}
                        onMouseLeave={(area) => leaveArea(area)}
                        lineWidth={2}
                        strokeColor={"white"}
                    />
                      {hoveredArea && (
                    <span className="tooltip"
                    style={{...getTipPosition(hoveredArea)}}>
                        {hoveredArea && hoveredArea.desc}
                    </span>
                )} 
                </div>
            </div>
        </div>
    )
}

export default Overlay;