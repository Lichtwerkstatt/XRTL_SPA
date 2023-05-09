import ESPCam from './Description_ESPCam'
import KM100 from './Description_KM100'
import Laser from './Description_Laser'
import LaserCtrl from './Description_LaserCtrl'
import SM1ZP from './Description_SM1ZP'
import Impressum from './Description_Impressum'

const DescriptionHandler = (props) => {

    const renderOption = {
        linear_1: <SM1ZP height={props.height} />,
        KM100_1: <KM100 height={props.height} />,
        screen: <ESPCam height={props.height} />,
        greenlaser_1: <LaserCtrl height={props.height} />,
        greenlaserPower_1: <Laser height={props.height} />,
        info: <Impressum height={props.height} />
    }


    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
