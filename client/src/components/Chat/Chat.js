import { useSocketContext } from '../../services/SocketContext';
import { useAppContext } from '../../services/AppContext';
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
  var [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const socketCtx = useSocketContext();
  const appCtx = useAppContext();

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
    if (message.at(0) === '!') {

      // console.log('message', message)

      if (message === '!rotate' || message === '!r') {
        appCtx.toggleAutoRotate();
        setChat([...chat, { userId: 'XRTL', message: 'HRotation command was sent ... ', color: '#FF7373' }]);
      } else if (message === '!constructiom' || message === '!c') {
        appCtx.toggleunderConstruction();
      }
      else if (message === '!user' || message === '!users') {

        socketCtx.socket.emit('updateUser')

        socketCtx.socket.on('updateUser', (payload) => {
          //console.log(payload)
          var user = ''
          for (var i = 2; i < payload.length; i += 3) {
            user += payload[i] + ','
          }
          user = user.slice(0, -1)
          setChat([...chat, { userId: 'XRTL', message: 'List of all the active user/s: ' + user, color: '#FF7373' }]);
        })
      }
      else if (message === '!reset') {
        socketCtx.socket.emit('message', { userId: 'XRTL', message: 'Attention the reset command was emited!', color: '#FF7373' });

        const controlIds = ['KM100_top_1', 'KM100_bottom_1', 'linear_1', 'greenlaser_top_1', 'greenlaser_bottom_1', 'beamSplitter']

        for (var i = 0; i < controlIds.length; i++) {
          socketCtx.socket.emit('command', {
            userId: socketCtx.username,
            controlId: controlIds[i],
            reset: true
          })
        }
      }
      else if (message === '!showcase' || message === '!s') {
        // socketCtx.socket.emit ('updateUser') 
      }
      else if (message === '!cam') {
        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          frameSize: 10
        })

        setChat([...chat, { userId: 'XRTL', message: 'The highest camera settings have been made!', color: '#FF7373' }]);
      }
      else {
        setChat([...chat, { userId: 'XRTL', message: "Command doesn't exists", color: '#FF7373' }]);
      }

    } else {
      socketCtx.socket.emit('message', { userId: socketCtx.username, message: message, color: socketCtx.fontColor });
    }
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