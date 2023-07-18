import { TextField, ThemeProvider, Button, IconButton, Grid } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { themeLogin } from '../../components/UI/templates/Theme';
import { useSocketContext } from '../../services/SocketContext';
import { useAppContext } from '../../services/AppContext';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, memo } from 'react';
import styles from './CSS/Login.module.css';
import { isEqual } from 'lodash';

const Login = (props) => {
    const connectionOption = [{ title: 'http://localhost:3000' }, { title: 'http://...' }]
    const [connection, setConnection] = useState(null);
    const [accessCode, setAccessCode] = useState('');
    const [username, setUsername] = useState('');

    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const handleLogin = () => {
        if (username !== '' && accessCode !== '') {
            try {
                socketCtx.setNewURL(String(connection), String(username));
                socketCtx.toggleConnection(String(username), String(accessCode));
                appCtx.toggleLogin();
            }
            catch (error) { }
        }
    }

    const handleChange = (event) => {
        setUsername(event.target.value);
        setConnection(connectionOption[0].title);
    };

    const handleAccessCode = (event) => {
        setAccessCode(event.target.value);
    };

    if (appCtx.showLogin) {
        return (
            <ThemeProvider theme={themeLogin}>
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
                            style={{  marginLeft: '0%', width: '200px', paddingRight: '25%' }}
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
