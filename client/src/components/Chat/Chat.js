import { useSocketContext } from '../../services/SocketContext';
import { theme } from '../../components/UI/templates/Theme';
import { useEffect, useState, memo } from 'react'
import styles from './CSS/Chat.module.css'
import { ImBubble } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
import { isEqual } from 'lodash';
import { ThemeProvider, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [animation, setAnimation] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socketCtx = useSocketContext();

  useEffect(() => {
    const message = (payload) => {
      setChat([...chat, payload]);
    }

    socketCtx.socket.on('message', message);

    return () => {
      socketCtx.socket.removeAllListeners('message', message);
    }
  }, [socketCtx, chat])

  const sendMessage = (event) => {
    event.preventDefault();
    socketCtx.socket.emit('message', { userId: socketCtx.username, message: message, color: socketCtx.fontColor });
    setMessage('');
  }

  const showChatHandler = () => {
    setAnimation(showChat ? styles.closeChat : styles.openChat);
    setShowChat(!showChat);
  }

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div
      className={styles.chatContainer + ' ' + animation}
    >
      <div className={styles.chatMain}>
        {chat.map((payload, index) => {
          return (
            <b key={index} >
              <span style={{ color: payload.color }}> {payload.userId}:</span> <span >{payload.message}</span>
              <br />
            </b>
          )
        })}
      </div>
      <form className={styles.msgForm}>
        <ThemeProvider theme={theme}>

          <FormControl sx={{ marginLeft: -4, width: 3 / 3, paddingTop: 1 }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Message  </InputLabel>
            <OutlinedInput
              onChange={handleChange}
              onKeyPress={(e) => { if (e.key === 'Enter') { sendMessage(e); } }}
              value={message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={sendMessage}
                    edge="end"
                  >
                    <MdSend />
                  </IconButton>
                </InputAdornment>
              }
              label="Message"
            />
          </FormControl>
        </ThemeProvider>
      </form>
      <div className={styles.chatHandler + ' ' + animation}>
        <span>
          <ImBubble size={35} onClick={showChatHandler} />
        </span>
      </div>
    </div>
  )
}
export default memo(Chat, isEqual);