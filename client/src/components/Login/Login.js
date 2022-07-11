import { useSocketContext } from '../../services/SocketContext'
import React, { useState } from "react";
import styles from "./Login.module.css"
import { BiFontColor } from 'react-icons/bi'
import { useAppContext } from "../../services/AppContext";
import OutlineLogin from './OutlineLogin';
import { Grid, Typography, MenuItem, FormControl, InputLabel, Box, TextField, createTheme, ThemeProvider, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import Select from '../UI/Select'
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



    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#01bd7d',
                main: '#01bd7d',
                dark: '#01bd7d',
                contrastText: '#fff',
            },
        },
        spacing: 2,
    })

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
                socketCtx.setNewURL(String(connection), String(username));
                socketCtx.setNewFont(fontColor);
                socketCtx.toggleConnection();
                setUsername('');
                setConnection('http://localhost:7000');
            } else if (custom === true && customConnection === "") {
                errorLabel.innerHTML = "Please enter a server address!";
            } else if (custom === true && customConnection !== "" && addressCheck) {
                errorLabel.innerHTML = "";
                socketCtx.toggleConnection();
                socketCtx.setNewURL(String(customConnection), String(username));
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

    const handleLogin = (event, newValue) => {
        console.log(Select);
        socketCtx.setNewURL(String(connection), String(username));
        socketCtx.setNewFont(fontColor);
        socketCtx.toggleConnection();
        setUsername('');
        setConnection('http://localhost:7000');
    }

    const handleChange = (event) => {
        setUsername(event.target.value);
    };


    if (appCtx.showLogin) {
        return (
            <ThemeProvider theme={theme}>

                <div className={styles.popupWindow}>
                </div>
                <div className={styles.popupInner} >
                    <h3 title="settings">Settings</h3>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                label="Username"
                                value={username}
                                onChange={handleChange}
                                onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                                style={{ marginLeft: 17, width: 250 }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormatColorTextIcon fontSize="large" style={{ marginTop: 12, marginLeft: 100, width: 50, color: "white", size: 50 }} />
                        </Grid>
                    </Grid>
                    <Box sx={{ m: 8, width: 250 }} >
                        <Select title="Choose server address " />
                    </Box>

                    <Button size="small" type="submit" variant="contained"
                        onClick={handleLogin}
                        endIcon={<SendIcon />}
                        style={{ width: 90, height: 30, marginTop: -3, marginLeft: 270 }}
                    >Login</Button>

                </div >
            </ThemeProvider>
        );
    } else {
        return (<div></div>)
    }
}
export default Login;