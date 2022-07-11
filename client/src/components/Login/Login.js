import { useSocketContext } from '../../services/SocketContext'
import React, { useState } from "react";
import styles from "./Login.module.css"
import { BiFontColor } from 'react-icons/bi'
import { useAppContext } from "../../services/AppContext";
import OutlineLogin from './OutlineLogin';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Grid, Typography, MenuItem, FormControl, InputLabel, Box, TextField, createTheme, ThemeProvider, Stack, Button, IconButton } from '@mui/material';
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

        const addressCheck = checkServerAdress();
        socketCtx.setNewUsername(String(username));

        if (custom === false) {

            
            socketCtx.toggleConnection();
            setUsername('');
            setConnection('http://localhost:7000');
        
        } else if (custom === true && customConnection !== "" && addressCheck) {

            socketCtx.toggleConnection();
            socketCtx.setNewURL(String(customConnection), String(username));
            setUsername('');
            setCustomConnection('');
            setCuston(false);
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
    if(username !== "" & socketCtx.socket.getNewURL !== ""){
        socketCtx.setNewUsername(String(username));
        socketCtx.toggleConnection();

    } 
   
   
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
                <Grid container columnSpacing={{ md: 95 }}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            label="Username "
                            value={username}
                            onChange={handleChange}
                            onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                            style={{ marginLeft: 17, width: 250 }}
                            error={username === ""}
                            helperText={username === "" ? 'Please enter your username!' : ' '}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        < IconButton onClick={(e) => {
                            var c = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
                            document.getElementById("colorIcon").style.color = c
                            setfontColor(c);
                            socketCtx.setNewFont(fontColor);
                        }} >
                            <FormatColorTextIcon id="colorIcon" color={fontColor} fontSize="large" onChange />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box sx={{ m: 8, width: 250 }} >
                    <Select title="Choose server address " username={username} />
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