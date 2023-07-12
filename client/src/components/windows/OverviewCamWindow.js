import ESPCam from '../UI/CtrlUnits/ESPCamWithoutSettings';
import Window from '../UI/experimentUI/Window';

const CamWindow = (props) => {
    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '260px'
    }
    else if (576 < width && width < 768) {
        width = '510px'
        height = '340px'
    } else {
        width = '600px'
        height = '400px'
    }


    return (
        <Window
            header={'Top View of Experiment'}
            top={'200'}
            left={'650'}
            id={'overview'}
            componentList={['overview']}
            width={width}
            height={height}
            footer={'empty'}
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