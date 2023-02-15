import { Grid, Autocomplete, Box, TextField, createTheme, ThemeProvider, Button, IconButton } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useSocketContext } from '../../services/SocketContext'
import { useAppContext } from '../../services/AppContext';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, memo } from 'react';
import styles from './Login.module.css'
import { isEqual } from 'lodash';

const Login = (props) => {
    const connectionOption = [{ title: 'http://localhost:3000' }, { title: 'http://10.232.37.40:3000' }]
    const [connection, setConnection] = useState(null);
    const [username, setUsername] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const filter = createFilterOptions();

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

    const handleLogin = () => {
        if (username !== '' && accessCode !== '') {
            try {
                socketCtx.setNewURL(String(connection.title), String(username));
                socketCtx.toggleConnection(String(username), String(accessCode));
                appCtx.toggleLogin();
            }
            catch (error) { }
        }
    }

    const handleChange = (event) => {
        setUsername(event.target.value);
    };

    const handleAccessCode = (event) => {
        setAccessCode(event.target.value);
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
            filtered.push({ inputValue, title: `Add '${inputValue}'`, });
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
                    <h3 title='settings'>Login</h3>
                    <div className={styles.close}>
                        <IconButton onClick={(e) => {
                            appCtx.toggleLogin();
                        }} >
                            <HighlightOffOutlinedIcon fontSize='large' />
                        </IconButton>
                    </div>
                    <Grid container columnSpacing={{ md: 95 }}>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                variant='outlined'
                                label='Username '
                                value={username}
                                onChange={handleChange}
                                onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                                style={{ marginLeft: 17, width: 250 }}
                                error={username === ''}
                                helperText={username === '' ? 'Enter your username!' : ' '}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                label='Access code '
                                value={accessCode}
                                onChange={handleAccessCode}
                                onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                                style={{ marginLeft: -40, width: 150 }}
                                error={accessCode === ''}
                                helperText={accessCode === '' ? 'Enter the access code!' : ' '}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ m: 8, width: 250 }} >
                        <Autocomplete
                            value={connection}
                            freeSolo
                            renderInput={(params) => (
                                <TextField {...params} label='Choose server address ' />)}
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

                    <Button size='small' type='submit' variant='contained'
                        onClick={handleLogin}
                        endIcon={<SendIcon />}
                        style={{ width: 100, height: 35 }}
                    >Login</Button>

                </div>
            </ThemeProvider>
        );
    } else {
        return (<div></div>)
    }
}
export default memo(Login, isEqual);