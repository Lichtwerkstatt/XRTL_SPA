import ESPCam from '../experiment/ComponentDescription/Content/Description_ESPCam'
import KM100 from '../experiment/ComponentDescription/Content/Description_KM100'
import Laser from '../experiment/ComponentDescription/Content/Description_Laser'
import LaserCtrl from '../experiment/ComponentDescription/Content/Description_LaserCtrl'
import SM1ZP from '../experiment/ComponentDescription/Content/Description_SM1ZP'
import Impressum from './Content/Description_Impressum'
import BeamSplitter from '../experiment/ComponentDescription/Content/Description_BeamSplitter'

const DescriptionHandler = (props) => {

    const renderOption = {
        linear_1: <SM1ZP height={props.height} />,
        KM100_1: <KM100 height={props.height} />,
        screen: <ESPCam height={props.height} />,
        greenlaser_1: <LaserCtrl height={props.height} />,
        greenlaserPower_1: <Laser height={props.height} />,
        beamSplitter: <BeamSplitter height={props.height} />,
        info: <Impressum height={props.height} />
    }


    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
