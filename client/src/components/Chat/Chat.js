import { ThemeProvider, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useSocketContext } from '../../services/SocketContext';
import { theme } from '../../components/UI/templates/Theme';
import { useAppContext } from '../../services/AppContext';
import { useEffect, useState, memo } from 'react';
import styles from './CSS/Chat.module.css';
import { ImBubble } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import { isEqual } from 'lodash';

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
        setChat([...chat, { userId: 'XRTL', message: 'Rotation command was sent ... ', color: '#FF7373' }]);
      } else if (message === '!constructiom' || message === '!c') {
        appCtx.toggleunderConstruction(!appCtx.underConstruction);
        socketCtx.socket.emit('underConstruction', !appCtx.underConstruction)
        setChat([...chat, { userId: 'XRTL', message: 'Under construction is now set to ' + !appCtx.underConstruction, color: '#FF7373' }]);
      }
      else if (message === '!user' || message === '!users') {

        socketCtx.socket.emit('updateUser')

        socketCtx.socket.on('updateUser', (payload) => {
          var user = ''
          for (var i = 2; i < payload.length; i += 3) {
            user += payload[i] + ', '
          }
          user = user.slice(0, -2)
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
        const showCase = async () => {
          //Turning on the laser
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'greenlaser_1',
            switch: true,
            color: '#00ffa8'
          })

          //Adjustment of the linear stage by 200 steps in clockwise direction 
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'linear_1',
            move: 200,
            color: '#00ffa8'
          })
          //Waits 8 s

          //this line guarantees that the following code is executed only after 8 s
          //please note that some commands may take longer or less time to complete  
          await new Promise(resolve => setTimeout(resolve, 8000));

          //Adjustment of the linear stage by 200 steps counterclockwise 
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'linear_1',
            move: -200,
            color: '#00ffa8'
          })
        }

        showCase()

      }
      else if (message === '!cam') {
        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          frameSize: 9
        }) 

        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          frameSize: 10
        })

        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          exposure: 1000,
          color: socketCtx.fontColor,
        })

        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          contrast: 1,
          color: socketCtx.fontColor,
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