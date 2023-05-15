import Settings from '../UI/CtrlUnits/Settings';
import Window from '../UI/experimentUI/Window';
import { useAppContext } from '../../services/AppContext';

const CamWindow = (props) => {
    const appCtx = useAppContext();
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
        width = '1000px'
        height = '430px'
    }

    if (appCtx.smallSetting && width === '1000px') {
        width = '1000px'
    } else if (!appCtx.smallSetting && width === '1000px') {
        width = '700px'
    }

    return (
        <Window
            header={'Top View of Experiment'}
            top={'200'}
            left={'250'}
            id={'overview'}
            componentList={['overview']}
            width={width}
            height={height}
        >
            <Settings
                component={'overview'}
                width={width}
            />
        </Window>
    );
};
export default CamWindow;