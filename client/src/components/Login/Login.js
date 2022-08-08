import { useSocketContext } from '../../services/SocketContext'
import React, { useState } from "react";
import styles from "./Login.module.css"
import { useAppContext } from "../../services/AppContext";
import { Grid, Autocomplete, Box, TextField, createTheme, ThemeProvider, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { createFilterOptions } from '@mui/material/Autocomplete';

const Login = (props) => {
    var col = ['IndianRed', 'FireBrick', 'MediumVioletRed', 'HotPink', 'Coral', 'DarkOrange', 'Yellow',
        'Khaki', 'Plum', 'DarkOrchid', 'ForestGreen', 'DarkOliveGreen', 'LightGreen', 'Teal', 'Aqua', 'Blue', 'LightSkyBlue']
    const [username, setUsername] = useState("");
    const [fontColor, setfontColor] = useState("white");
    const socketCtx = useSocketContext();
    const appCtx = useAppContext();
    const [connection, setConnection] = useState(null);
    const filter = createFilterOptions();
    const connectionOption = [{ title: 'http://localhost:7000' }, { title: 'http://192.168.1.42:7000' }, { title: 'http://10.232.37.40:7000' }]

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

    const handleLogin = () => {
        if (username !== "") {
            try {
                socketCtx.setNewURL(String(connection.title), String(username));
                socketCtx.toggleConnection();
                appCtx.setShowLogin(false)
            }
            catch (error) { }
        }
    }

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const autoCompleteHandle = (event, newValue) => {
        if (typeof newValue === 'string') {
            setConnection({ title: newValue, });
        } else if (newValue && newValue.inputValue) {
            setConnection({ title: newValue.inputValue, });
        } else {
            setConnection(newValue);
        }
    }

    const filterOption = (options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
            filtered.push({ inputValue, title: `Add "${inputValue}"`, });
        }
        return filtered;
    }

    const getLabel = (option) => {
        if (typeof option === 'string') {
            return option;
        }
        if (option.inputValue) {
            return option.inputValue;
        }
        return option.title;
    }

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
                                autoFocus
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
                                col = col[Math.floor(Math.random() * 16)]
                                document.getElementById("colorIcon").style.color = col
                                setfontColor(col);
                                socketCtx.setNewFont(col);
                            }} >
                                <FormatColorTextIcon id="colorIcon" color={fontColor} fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Box sx={{ m: 8, width: 250 }} >
                        <Autocomplete
                            value={connection}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label="Choose server address " />)}
                            onChange={autoCompleteHandle}
                            onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                            filterOptions={filterOption}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            options={connectionOption}
                            getOptionLabel={getLabel}
                            renderOption={(props, option) => <li {...props}>{option.title}</li>}
                        />
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