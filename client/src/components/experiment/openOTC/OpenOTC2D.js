import ImageMapper from "react-image-mapper"
import OpenOTCimg from "./openOTC_bg.jpeg"
import react, {useState} from "react"
import './OpenOTC2D.css'


const OpenOTC2D = (props) => {
    const socket = props.socket;
    
    const [hoveredArea, setHoveredArea] = useState(null);


    let MAP = {
        name: "openOTC_imagemap",
        areas: [
            { name : "sample", shape: "rect",  coords: [130,290,290,540], desc : 'Sample on XYZ Stage' },
            { name : "3ptMirror", shape: "rect",  coords: [360,654,590,930], desc : 'Adjustable Mirror on Linear Stage' },
            { name : "beamsplitter", shape: "rect", coords: [371, 423, 506, 537], desc: 'Beam Splitter' },
            { name : "mirror1", shape: "rect", coords: [377,306, 489, 414], desc: 'Mirror'},
            { name : "camera", shape: "rect", coords: [737, 419, 870, 539], desc: 'Deheng IMX226 CMOS IR Camera'},
            { name : "light", shape: "rect", coords: [737,288, 872, 416], desc: 'Superluminescent Diode (SLD) light source'},
            { name : "L1", shape: "rect", coords: [612, 290, 741, 416], desc: 'Lens for collimating light from SLD'},
            { name : "L2", shape: "rect", coords: [494, 420, 615, 537], desc: '100mm Objective Lens'},
            { name : "L3", shape: "rect", coords: [614, 414, 740, 540], desc: '50mm tube lens'}
        ]
    };

    const getTipPosition = (area) => {
        return { top: `${area.center[1]}px`, left: `${area.center[0]-20}px` };
    }

    const clicked = (area) => {
        props.toggleSelect(area.name);
        //console.log('You clicked on '+area.name+' !' );
    }

    const enterArea = (area) => {
        setHoveredArea(area);
        //console.log("Going in...");
    }

    const leaveArea = (area) => {
        setHoveredArea(null);
        //console.log("Going out...");
    }

    return(
        <div className="grid">
            <div className="presenter">
                <div style={{position: 'relative', zIndex : 0}}>
                <ImageMapper
                    src={OpenOTCimg}
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

export default OpenOTC2D;
