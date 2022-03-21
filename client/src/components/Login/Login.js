import React, { useState } from "react";
import styles from "./Login.module.css"
import { useAppContext } from "../../services/AppContext"
import { BiFontColor } from 'react-icons/bi'


//erst bei zweitem aufrufen wird Varibale belegt
const Login = (props) => {
    const [username, setUsername] = useState("");
    const [fontColor, setfontColor] = useState("white");
    const [connection, setConnection] = useState('http://localhost:7000');
    const [customConnection, setCustomConnection] = useState('');
    const appCtx = useAppContext();

    const displayCustom = () => {
        console.log("hallo")
        var inputCustom = document.getElementById("customInput");
        var dropDownMenu = document.getElementById("dropDownMenu")
        console.log(inputCustom);
        console.log(dropDownMenu)

        if (dropDownMenu.style.display == 'none') {
            dropDownMenu.style.display = 'block';
            inputCustom.style.display = 'none';
        } else {
            dropDownMenu.style.display = 'none';
            inputCustom.style.display = 'block'
        }

    }

    /*  return (props.trigger) ? ( */
    return (
        <div className="login" id="login">
            <div className={styles.popupWindow}>
            </div>
            <div className={styles.popupInner}>
                <h3 title="settings">Settings</h3>
                <div className={styles.setUsername}>
                    <label >Username:</label>
                    <input
                        type="text"
                        placeholder="Please enter your username"
                        id="fontColor"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        required
                    ></input>
                </div>
                <div className={styles.colorPicker}>
                    <li onClick={(e) => {
                        var c = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                        setfontColor(c);
                    }}><BiFontColor size={33} color={fontColor} /></li>
                </div>
                <div className={styles.serverConnect}>
                    <label for="serverOption" >
                        Choose server:
                    </label>
                    <select id="dropDownMenu" name="serverOption"
                        onClick={(e) => {
                            setConnection(e.target.value);
                        }}>
                        <option value='http://localhost:7000'>http://localhost:7000</option>
                        <option value='http://192.168.1.42:7000'>http://192.168.1.42:7000</option>
                        <option value='' onClick={displayCustom}>Define</option>
                    </select>

                    <input id="customInput"
                        placeholder="http://..."
                        value={customConnection}
                        onChange={(e) => { setCustomConnection(e.target.value) }}
                    />
                </div>

                <button title="login"
                    onClick={(e) => {
                        var login = document.getElementById("login");
                        login.style.display = 'none';
                    }}>
                    Login
                </button>

            </div>
        </div>
    );
    /*  ) : ""; */
}

export default Login;