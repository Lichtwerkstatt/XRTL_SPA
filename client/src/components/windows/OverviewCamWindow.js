import ESPCam from '../UI/CtrlUnits/ESPCamWithoutSettings';
import Window from '../UI/experimentUI/Window';

/**
 * Overview camera window
 * 
 * @description This react component returns a window with the content for the Overview Camera window. 
 *  
 * @returns {React.ReactElement} Overview camera window
 */
const CamWindow = () => {
    var width = window.innerWidth
    var height = 0;

    if (width <= 992) {
        width = '350'
        height = '260'
    } else {
        width = '600'
        height = '400'
    }


    return (
        <Window
            header={'Top View of Experiment'}
            top={200}
            left={650}
            id={'overview'}
            componentList={['overview']}
            width={width+'px'}
            height={height+'px'}
            footer={'none'}
            topper={'none'}
        >
            <ESPCam
                component={'overview'}
                width={width}
                height={height}
            />
        </Window>
    );
};
export default CamWindow;