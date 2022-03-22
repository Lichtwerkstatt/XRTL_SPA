import React, { useState } from "react";
import styles from "./Login.module.css"
import { useAppContext } from "../../services/AppContext"
import { BiFontColor } from 'react-icons/bi'

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [fontColor, setfontColor] = useState("white");
    const [connection, setConnection] = useState('http://localhost:7000');
    const [customConnection, setCustomConnection] = useState('');
    const [custom, setCuston] = useState(false)
    const appCtx = useAppContext();

    //let custom = false;

    const displayCustom = () => {
        setCuston(true);
        var inputCustom = document.getElementById("customInput");
        var dropDownMenu = document.getElementById("dropDownMenu")

        dropDownMenu.style.display = 'none';
        inputCustom.style.display = 'block'
    }

    const loginCaseChecking = () => {
        var errorLabel = document.getElementById('errorLabel');
        var login = document.getElementById("login");

        if (username == '') {
            errorLabel.innerHTML = "Please enter a username!";
        } else {
            errorLabel.innerHTML = "";

            if (custom == false) {
                login.style.display = 'none'
            } else if (custom == true && customConnection == "") {
                errorLabel.innerHTML = "Please enter a server address!";
            } else if (custom == true && customConnection != "") {
                login.style.display = 'none'
                errorLabel.innerHTML = "";
            } else {
                errorLabel.innerHTML = 'Something went wrong'
            }
        }
    }

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
                    <label htmlFor="serverOption" >
                        Choose server:
                    </label>
                    <select id="dropDownMenu" name="serverOption" data-testid="dropDownMenu"
                        onClick={(e) => {
                            setConnection(e.target.value);
                        }}>
                        <option data-testid='localhost' value='http://localhost:7000'>http://localhost:7000</option>
                        <option data-testid='himbeere' value='http://192.168.1.42:7000'>http://192.168.1.42:7000</option>
                        <option data-testid='custom' value='' onClick={displayCustom}>Define</option>
                    </select>

                    <input id="customInput"
                        placeholder="http://..."
                        value={customConnection}
                        onChange={(e) => {
                            setCustomConnection(e.target.value)
                        }}
                    />
                </div>

                <div className={styles.ErrorMessages}>
                    <label title="errorLabel" id="errorLabel" color="white"></label>
                </div>
                <button title="login"
                    onClick={loginCaseChecking}>
                    Login
                </button>
            </div>
        </div >
    );
}
export default Login;