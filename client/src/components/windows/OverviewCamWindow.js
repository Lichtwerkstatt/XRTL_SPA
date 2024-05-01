import ESPCam from '../UI/CtrlUnits/ESPCamWithoutSettings';
import Window from '../UI/experimentUI/Window';
import {useTranslation} from "react-i18next";

/**
 * Overview camera window
 * 
 * @description This react component returns a window with the content for the Overview Camera window. 
 *  
 * @returns {React.ReactElement} Overview camera window
 */
const CamWindow = () => {
    const { t, i18n } = useTranslation();

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
            header={t('cam.header')}
            top={'200'}
            left={'650'}
            id={'overview'}
            componentList={['overview']}
            width={width}
            height={height}
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