//import ESPCam from "../../assembly/ESPCam"
//import Cube from "../../assembly/BsCube"
//import Lens from "../../assemblyLens"
import UC2_3ptMount from "../../assembly/UC2_3ptMount"

const OpenOTCGUI = (props) =>{
    
    console.log(props.selected);

    return (
        <div>
            {props.selected.has('3ptMirror') && (
                <UC2_3ptMount
                    title="Reference Mirror"
                    id={'3ptMirror'}
                    controlIdVertical={'3ptMirror_V'}
                    controlIdHorizontal={'3ptMirror_H'}
                    controlIdCenter={'3pdMirror_C'}
                    rotationVertical={'0'}
                    rotationHorizontal={'0'}
                    rotationCenter={'0'}
                    footer={'Pubs!'}
                    top={'100'}
                    left={'100'}
                    />

            )}           
            
        </div>
    )
}

export default OpenOTCGUI;