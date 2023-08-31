import { TextField, ThemeProvider, Button, IconButton, Grid } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { themeLogin } from '../../components/UI/templates/Theme';
import { useSocketContext } from '../../services/SocketContext';
import { useAppContext } from '../../services/AppContext';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, memo } from 'react';
import styles from './CSS/Login.module.css';
import { isEqual } from 'lodash';

/**
 * Login component 
 * 
 * @description This React component contains the login overlay, which prevents the navigation bar and components from being clicked. 
 * Furthermore, this component handles the forwarding of the entered access code and user name to the SocketContext. 
 * 
 * @returns {React.ReactElement} Login component  
 */
const Login = () => {
    // List of addresses to which a connection can be established, for quick change if work is to be done locally.
    const connectionOption = [{ title: 'http://localhost:3000' }, { title: 'https://xrtl-ao.uni-jena.de' }]
    const [connection, setConnection] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [username, setUsername] = useState('');

    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    //Forwarding the entered user name and access code to the SocketContext
    const handleLogin = () => {
        if (username !== '') {
            try {
                socketCtx.setNewURL(String(connection), String(username));
                socketCtx.toggleConnection(String(username), String(accessCode));
                appCtx.toggleLogin();
            }
            catch (error) { }
        }
    }

    // Handling the entry of the user name
    const handleChange = (event) => {
        setUsername(event.target.value);
        setConnection(connectionOption[1].title)
    };

    // Handling of the access code entry
    const handleAccessCode = (event) => {
        setAccessCode(event.target.value);
    };


    if (appCtx.showLogin) {
        return (
            <ThemeProvider theme={themeLogin}>
                {/* Overlay so that NavBar and components cannot be clicked on */}
                <div className={styles.popupWindow}>
                </div>
                {/* Login window with input fields */}
                <div className={styles.popupInner} >
                    <h3 title='settings'>Login</h3>
                    <div className={styles.close}>
                        <IconButton onClick={(e) => {
                            appCtx.toggleLogin();
                        }} >
                            <HighlightOffOutlinedIcon fontSize='large' />
                        </IconButton>
                    </div>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField
                            autoFocus
                            variant='outlined'
                            label='Username '
                            value={username}
                            onChange={handleChange}
                            onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                            style={{ marginLeft: '0%', width: '200px', paddingRight: '25%' }}
                            error={username === ''}
                            helperText={username === '' ? 'Enter your username!' : ' '}
                        />

                        <TextField
                            variant='outlined'
                            label='Access code '
                            value={accessCode}
                            onChange={handleAccessCode}
                            onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                            style={{ marginLeft: '0%', width: '200px', paddingRight: '25%' }}
                            error={accessCode === ''}
                            helperText={accessCode === '' ? 'Enter the access code!' : ' '}
                        />
                    </Grid>
                    <Button size='small' type='submit' variant='contained'
                        onClick={handleLogin}
                        endIcon={<SendIcon />}
                        style={{ width: '20%', height: '15%' }}
                    >Login</Button>
                </div>
            </ThemeProvider>
        );
    } else {
        return (<div></div>)
    }
}
export default memo(Login, isEqual);