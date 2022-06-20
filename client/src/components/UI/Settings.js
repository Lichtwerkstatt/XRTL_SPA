import { useState, useEffect, useRef } from "react";
import stylesCSS from "./Settings.module.css"
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import Select from 'react-select';
import Switch from "react-switch";

const Settings = (props) => {
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [selectedOption, setSelectedOption] = useState(null);
    const [switchValue, setSwitchValue] = useState(false);

    const options = [
        { value: 'UXGA', label: 'UXGA (1600x1200)' },
        { value: 'SXGA', label: 'SXGA (1280x1024)' },
        { value: 'XGA', label: 'XGA (1024x768)' },
        { value: 'SVGA', label: 'SVGA (800x600)' },
        { value: 'VGA', label: 'VGA (640x480)' },
        { value: 'QVGA', label: 'QVGA (320x240)' },
        { value: 'CIF', label: 'CIF (352x288)' }
    ]

    const switchHandler = () => {
        setSwitchValue((switchValue === true) ? false : true);

    }
    const styles = {
        control: (css) => ({
            ...css,
            width: 250,
            marginLeft: '20px',
        }),
        singleValue: (provided) => ({
            ...provided,
            height: '100%',
            color: 'white',
            paddingTop: '3px',
        }),
        menu: (provided) => ({
            ...provided,
            marginLeft: '20px',
            marginTop: '0px',
            width: '250px'
        }),
    };

    return (
        <div className={stylesCSS.settings}>
            <label>Define resolution: </label>
            <Select className={styles.settings} options={options}
                maxMenuHeight={125}
                defaultValue={options[2]}
                onChange={setSelectedOption}
                autosize={true}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#737373',
                        primary: '#01bd7d',
                        neutral0: 'black'
                    },
                })}
                styles={styles}
            />
            <label >Color: color</label>
            <Switch
                checked={switchValue}
                onChange={switchHandler}
                onColor="#01bd7d"
                // onHandleColor="#01bd7d"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className={styles.reactSwitch}
                id="material-switch"
            />
            <label> grey</label>
        </div>


    )
}
export default Settings