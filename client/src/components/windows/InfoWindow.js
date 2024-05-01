import InfoWindowContent from "./Content/InfoWindowContent";
import Window from "../UI/experimentUI/Window";
import {useTranslation} from "react-i18next";

/**
 * Information window
 * 
 * @description This react component returns a window with the content for the information window.
 *  
 * @returns {React.ReactElement} Information window
 */
const InfoWindow = () => {
    const { t, i18n } = useTranslation();

    var width = window.innerWidth
    var height = 0;

    if (0 < width && width < 576) {
        width = '350px'
        height = '650px'
    }
    else {
        width = '600px'
        height = '517px'
    }

    return (
        <Window
            header={t('info.header')}
            id='info'
            top="200"
            left="200"
            width={width}
            height={height}
            footer={'none'}
            topper={'para'}
        >
            <InfoWindowContent />
        </Window>
    );
};
export default InfoWindow;