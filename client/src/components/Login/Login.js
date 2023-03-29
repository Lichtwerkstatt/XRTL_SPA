import { TextField, ThemeProvider, Button, IconButton } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { themeLogin } from '../../components/UI/templates/Theme';
import { useSocketContext } from '../../services/SocketContext';
import { useAppContext } from '../../services/AppContext';
import SendIcon from '@mui/icons-material/Send';
import React, { useState, memo } from 'react';
import styles from './Login.module.css'
import { isEqual } from 'lodash';

const Login = (props) => {
    const connectionOption = [{ title: 'http://localhost:3000' }, { title: 'http://10.232.37.40:3000' }]
    const [connection, setConnection] = useState('');
    const [username, setUsername] = useState('');

    const socketCtx = useSocketContext();
    const appCtx = useAppContext();

    const handleLogin = () => {
        if (username !== '') {
            try {
                socketCtx.setNewURL(String(connection), String(username));
                socketCtx.toggleConnection(String(username));
                appCtx.toggleLogin();
            }
            catch (error) { }
        }
    }

    const handleChange = (event) => {
        setUsername(event.target.value);
        setConnection(connectionOption[0].title)
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

                    <TextField
                        autoFocus
                        variant='outlined'
                        label='Username '
                        value={username}
                        onChange={handleChange}
                        onKeyPress={(e) => { if (e.key === 'Enter') { handleLogin(); } }}
                        style={{ width: '70%', marginLeft: '5%' }}
                        error={username === ''}
                        helperText={username === '' ? 'Enter your username!' : ' '}
                    />

                    <Button size='small' type='submit' variant='contained'
                        onClick={handleLogin}
                        endIcon={<SendIcon />}
                        style={{ width: '22%', height: '17%', marginBottom: '10%' }}
                    >Login</Button>

                </div>
            </ThemeProvider>
        );
    } else {
        return (<div></div>)
    }
}
export default memo(Login, isEqual);