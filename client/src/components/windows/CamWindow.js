import Settings from '../UI/CtrlUnits/Settings2';
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
    }
    else if (768 < width && width < 1000) {
        width = '650px'
        height = '430px'
    } else {
        width = '700px'
        height = '430px'
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
            <Settings
                component={'overview'}
                width={width}
            />
        </Window>
    );
};
export default CamWindow;