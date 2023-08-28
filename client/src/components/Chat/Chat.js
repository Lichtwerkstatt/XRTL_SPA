import { ThemeProvider, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useSocketContext } from '../../services/SocketContext';
import { theme } from '../../components/UI/templates/Theme';
import { useAppContext } from '../../services/AppContext';
import { useEffect, useState, memo } from 'react';
import styles from './CSS/Chat.module.css';
import { ImBubble } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import { isEqual } from 'lodash';

/**
 * Chat component 
 * 
 * @description This React component contains the chat, the collapse/expand handling, the sending of the messages to the other web application clients 
 * via the server and finally the display of the messages.
 * 
 * @returns {React.ReactElement} Chat component  
 */
const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [animation, setAnimation] = useState('');
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const socketCtx = useSocketContext();
  const appCtx = useAppContext();

  useEffect(() => {
    //When new messages are received, the chat is simply extended to include them.
    const message = (payload) => {
      setChat([...chat, payload]);
    }

    socketCtx.socket.on('message', message);

    return () => {
      socketCtx.socket.removeAllListeners('message', message);
    }
  }, [socketCtx, chat])

  //Handling of sending chat messages
  const sendMessage = async (event) => {
    event.preventDefault();

    // Case 1: A command has been entered
    if (message.at(0) === '!') {

      // De-/activate the ambient rotation of the experiment 
      if (message === '!rotate' || message === '!r') {
        appCtx.toggleAutoRotate();
        setChat([...chat, { userId: 'XRTL', message: 'Rotation command was sent ... ', color: '#FF7373' }]);
      }
      // De-/activation of the "under construction" message
      else if (message === '!construction' || message === '!c') {
        appCtx.toggleunderConstruction(!appCtx.underConstruction);
        // Forward the change to the server, which sends it to the other web clients.
        socketCtx.socket.emit('underConstruction', !appCtx.underConstruction)
        setChat([...chat, { userId: 'XRTL', message: 'Under construction is now set to ' + !appCtx.underConstruction, color: '#FF7373' }]);
      }
      //Display all user names that are connected to the server via the web application
      else if (message === '!user' || message === '!users') {
        //Request to the server 
        socketCtx.socket.emit('updateUser')

        //Response from the server and formatting of the message, which then finally appears as a chat message within the chat.
        socketCtx.socket.on('updateUser', (payload) => {
          var user = ''
          for (var i = 2; i < payload.length; i += 3) {
            user += payload[i] + ','
          }
          user = user.slice(0, -1)
          setChat([...chat, { userId: 'XRTL', message: 'List of all the active user/s: ' + user, color: '#FF7373' }]);
        })
      }
      // Resetting selected components to their "factory settings"
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
      // Adjusting the settings of the Overview camera to the optimal settings
      else if (message === '!cam') {
        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          frameSize: 10
        })

        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          exposure: 800,
          color: socketCtx.fontColor,
        })

        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          contrast: 1,
          color: socketCtx.fontColor,
        })

        socketCtx.socket.emit("command", {
          userId: 'XRTL',
          controlId: 'overview',
          exposure: 1200,
          color: socketCtx.fontColor,
        })

        setChat([...chat, { userId: 'XRTL', message: 'The highest camera settings have been made!', color: '#FF7373' }]);
      }
      // Output of an error message if command does not exist or is written incorrectly 
      else {
        setChat([...chat, { userId: 'XRTL', message: "Command doesn't exists", color: '#FF7373' }]);
      }

    }
    // Case 2: Sending a chat message to all web clients
    else if (message.length > 0 && message.replace(/\s/g, '').length !== 0) {
      socketCtx.socket.emit('message', { userId: socketCtx.username, message: message, color: socketCtx.fontColor });
    }
    setMessage('');
  }

  // Handling of the folding in/out of the chat
  const showChatHandler = () => {
    setAnimation(showChat ? styles.closeChat : styles.openChat);
    setShowChat(!showChat);
  }

  // Handling of the message
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    // Chat container
    <div className={styles.chatContainer + ' ' + animation}>
      <div className={styles.chatMain}>
        {chat.map((payload, index) => {
          return (
            <b key={index} >
              {/* Formatting of the received message from the server to username: message */}
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
              onKeyPress={(e) => { if (e.key === 'Enter') { sendMessage(e); } }}
              onChange={handleChange}
              value={message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={sendMessage} edge="end" > <MdSend /> </IconButton>
                </InputAdornment>
              }
              label="Message"
            />
          </FormControl>
        </ThemeProvider>
      </form>

      {/* Chat icon */}
      <div className={styles.chatHandler + ' ' + animation}>
        <span>
          <ImBubble size={35} onClick={showChatHandler} />
        </span>
      </div>
    </div>
  )
}
export default memo(Chat, isEqual);