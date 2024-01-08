import BeamSplitter from './BeamSplitter';
import MirrorRotary from './MirrorRotary';
import GlassRotary from './GlassRotary';
import LegalNotice from './LegalNotice';
import LaserCtrl from './LaserCtrl';
import ESPCam from './ESPCam';
import KM100 from './KM100';
import Laser from './Laser';
import SM1ZP from './SM1ZP';
import Lens from './Lens';
import Cube from './Cube';
import Heater from './Heater';
import ExperimentSelection from './ExperimentSelection'


const DescriptionHandler = (props) => {

    const renderOption = {
        linear_1: <SM1ZP height={props.height} />,
        KM100_1: <KM100 height={props.height} />,
        screen: <ESPCam height={props.height} />,
        greenlaser_1: <LaserCtrl height={props.height} />,
        greenlaserPower_1: <Laser height={props.height} />,
        beamSplitter: <BeamSplitter height={props.height} />,
        info: <LegalNotice height={props.height} />,
        lens: <Lens height={props.height} />,
        bscube: <Cube height={props.height} />,
        heater: <Heater height={props.height} />,
        plate_rotation: <GlassRotary height={props.height} />,
        heater_rotation: <MirrorRotary height={props.height} />,
        experimentSelection: <ExperimentSelection height={props.height}/>,

    }

    return (
        <div>{renderOption[props.component]}</div>
    )
}
export default DescriptionHandler;
