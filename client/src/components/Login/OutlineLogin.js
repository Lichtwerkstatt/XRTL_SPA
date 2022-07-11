import { useSocketContext } from '../../services/SocketContext'
import React, { useState } from "react";
import styles from "./Login.module.css"
import { BiFontColor } from 'react-icons/bi'
import { useAppContext } from "../../services/AppContext";
import Select from '../UI/Select'
import { Typography, MenuItem, FormControl, InputLabel, Box, TextField, createTheme, ThemeProvider, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//weiterleitung von adresse & username -->  erfolgt, aber socket Manager wird nicht mit neuer URL besetzt
//verbindung des icons mit öffnen & schließen des Fensters --> zurücksetzen der Daten
const Login = (props) => {
    const [connection, setConnection] = useState('http://localhost:7000');
    const [username, setUsername] = useState("");
    const [fontColor, setfontColor] = useState("white");
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();


    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                light: '#01bd7d',
                main: '#01bd7d',
                dark: '#01bd7d',
                contrastText: '#01bd7d',
            },
        },
        spacing: 2,


    })

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

    return (
        <ThemeProvider theme={theme}>

            <Box sx={{ m: 8, width: 250 }} >
                <Stack>
                    <TextField
                        variant="outlined"
                        label="Username"
                        value={username}
                        onChange={handleChange}
                        onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                    />
                </Stack>
            </Box>
            <Box sx={{ m: 8, width: 250 }} >
                <Select title="Choose server address " />
            </Box>

            <Button size="small" type="submit" variant="contained"
                onClick={handleLogin}
                endIcon={<SendIcon />}
                style={{ width: 90, height: 30, marginTop: 0, marginLeft: 270 }}
            >Login</Button>

        </ThemeProvider>
    );
}
export default Login;