import Window from "../UI/experimentUI/Window";
import ManualWindowContent from "./Content/ManualWindowContent";

const ManualWindow = (props) => {
    return (
        <Window
            header="XR TwinLab Manual"
            id='manual'
            top="100"
            left="200"
            width="300"
            height="547"
            footer={'empty'}
            topper={'none'}
        >
            <ManualWindowContent />
        </Window>
    );
};
export default ManualWindow;