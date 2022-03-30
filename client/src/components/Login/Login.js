import { useSocketContext } from '../../services/SocketContext'
import React, { useState } from "react";
import styles from "./Login.module.css"
import { BiFontColor } from 'react-icons/bi'
import { useAppContext } from "../../services/AppContext";

//weiterleitung von adresse & username -->  erfolgt, aber socket Manager wird nicht mit neuer URL besetzt
//verbindung des icons mit öffnen & schließen des Fensters --> zurücksetzen der Daten
const Login = (props) => {
    const [username, setUsername] = useState("");
    const [fontColor, setfontColor] = useState("white");
    const [connection, setConnection] = useState('http://localhost:7000');
    const [customConnection, setCustomConnection] = useState('');
    const [custom, setCuston] = useState(false);
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const displayCustom = () => {
        setCuston(true);
        var inputCustom = document.getElementById("customInput");
        var dropDownMenu = document.getElementById("dropDownMenu")

        dropDownMenu.style.display = 'none';
        inputCustom.style.display = 'block'
    }

    const loginCaseChecking = () => {
        var errorLabel = document.getElementById('errorLabel');

        if (username === '') {
            errorLabel.innerHTML = "Please enter a username!";
        } else {
            errorLabel.innerHTML = "";
            const addressCheck = checkServerAdress();
            socketCtx.setNewUsername(String(username));

            if (custom === false) {
                errorLabel.innerHTML = "";
                socketCtx.setNewURL(String(connection));
                socketCtx.setNewFont(fontColor);
                socketCtx.toggleConnection();
                setUsername('');
                setConnection('http://localhost:7000');
            } else if (custom === true && customConnection === "") {
                errorLabel.innerHTML = "Please enter a server address!";
            } else if (custom === true && customConnection !== "" && addressCheck) {
                errorLabel.innerHTML = "";
                socketCtx.toggleConnection();
                socketCtx.setNewURL(String(customConnection));
                setUsername('');
                setCustomConnection('');
                setCuston(false);
            } else {
                errorLabel.innerHTML = 'Please check your connection address!'
            }
        }
    }

    const checkServerAdress = () => {
        // let regex = /http:\/\/([a-zA-Z0-9\.]*):[0-9]{4}/i
        let ipRegex = /http:\/\/[0-9]{3}\.[0-9]{3}\.[0-9]+\.[0-9]{1,3}:[0-9]{4}$/i
        let localRegex = /http:\/\/localhost:[0-9]{4}$/i;

        if (localRegex.test(customConnection) || ipRegex.test(customConnection)) {
            return true;
        }
        return false;
    }

    if (appCtx.showLogin) {
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
                                setUsername(e.target.value);
                                var errorLabel = document.getElementById('errorLabel');
                                if (username.length >= 20) {
                                    setUsername("");
                                    errorLabel.innerHTML = "Username is to long!";
                                }
                                else {
                                    errorLabel.innerHTML = "";
                                }
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
                                setCustomConnection(e.target.value);
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
    } else {
        return (<div></div>)
    }
}
export default Login;