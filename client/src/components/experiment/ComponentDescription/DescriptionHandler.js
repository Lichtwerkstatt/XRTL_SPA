import ESPCam from './Description_ESPCam'
import KM100 from './Description_KM100'
import Laser from './Description_Laser'
import LaserCtrl from './Description_LaserCtrl'
import SM1ZP from './Description_SM1ZP'
import LegalNotice from './Description_LegalNotice'
import BeamSplitter from './Description_BeamSplitter'
import BeamBlocker from './Description_BeamBlocker'
import Lens from './Description_Lens'
import Cube from './Description_Cube'

const DescriptionHandler = (props) => {

    const renderOption = {
        linear_1: <SM1ZP height={props.height} />,
        KM100_1: <KM100 height={props.height} />,
        screen: <ESPCam height={props.height} />,
        greenlaser_1: <LaserCtrl height={props.height} />,
        greenlaserPower_1: <Laser height={props.height} />,
        beamSplitter: <BeamSplitter height={props.height} />,
        beamblocker1: <BeamBlocker height={props.height} />,
        beamblocker2: <BeamBlocker height={props.height} />,
        info: <LegalNotice height={props.height} />,
        lens: <Lens height={props.height} />,
        bscube: <Cube height={props.height} />,
    }

    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
