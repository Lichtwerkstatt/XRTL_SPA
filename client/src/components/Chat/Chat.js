import { ThemeProvider, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { useSocketContext } from '../../services/SocketContext';
import { theme } from '../../components/UI/templates/Theme';
import { useAppContext } from '../../services/AppContext';
import { useEffect, useState, memo } from 'react'
import styles from './CSS/Chat.module.css'
import { ImBubble } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
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
  var [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [beamSplitter1, setBeamSplitter1] = useState(false);
  const [beamSplitter2, setBeamSplitter2] = useState(false);


  const socketCtx = useSocketContext();
  const appCtx = useAppContext();

  useEffect(() => {
    //When new messages are received, the chat is simply extended to include them.
    const message = (payload) => {
      setChat([...chat, payload]);
    }

    // All this has to be deleted after the implementation of the beam blockers
    //DELETE from ...
    const status = (payload) => {
      if (payload.controlId === 'servo_bblock_1') {

        payload.status.absolute === 45 ? setBeamSplitter1(true) : setBeamSplitter1(false)

        //console.log("Status  ", payload)
      } else if (payload.controlId === 'servo_bblock_2') {

        payload.status.absolute === 45 ? setBeamSplitter2(true) : setBeamSplitter2(false)

        // console.log("Status  ", payload)
      }
    }

    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: 'servo_bblock_1',
      getStatus: true
    })

    socketCtx.socket.emit('command', {
      userId: socketCtx.username,
      controlId: 'servo_bblock_2',
      getStatus: true
    })

    socketCtx.socket.on('status', status);
    //... DELETE until here
    socketCtx.socket.on('message', message);

    return () => {
      socketCtx.socket.removeAllListeners('message', message);
      socketCtx.socket.removeAllListeners('status', status); //DELETE
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
      else if (message === '!constructiom' || message === '!c') {
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
          console.log(payload)
          for (var i = 1; i < payload.length; i += 2) {
            user += payload[i] + ', '
          }
          user = user.slice(0, -2)
          setChat([...chat, { userId: 'XRTL', message: 'List of all connected user/s: ' + user, color: '#FF7373' }]);
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

      // Runs through a showcase scenario 
      else if (message === '!showcase' || message === '!s') {
        const showCase = async () => {
          //Establish the ground state =========================
          //Turning off the laser
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'greenlaser_1',
            switch: false,
            color: '#00ffa8'
          })

          //Removes the retractable mirror
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'beamSplitter',
            binaryCtrl: false,
            color: '#00ffa8'
          })

          //this line guarantees that the following code is executed only after 8 s
          //please note that some commands may take longer or less time to complete  
          await new Promise(resolve => setTimeout(resolve, 1000));

          //Do awesome things ==================================
          //Turning on the laser
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'greenlaser_1',
            switch: true,
            color: '#00ffa8'
          })

          //this line guarantees that the following code is executed only after 8 s
          //please note that some commands may take longer or less time to complete  
          await new Promise(resolve => setTimeout(resolve, 1000));

          //Adds the retractable mirror
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'beamSplitter',
            binaryCtrl: true,
            color: '#00ffa8'
          })
          //needs approx 1s

          await new Promise(resolve => setTimeout(resolve, 2000));

          //Adjustment of the linear stage by 200 steps in clockwise direction 
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'linear_1',
            move: 200,
            color: '#00ffa8'
          })
          //needs approx 6s

          await new Promise(resolve => setTimeout(resolve, 7000));

          //Adjustment of the reference mirror by 200 steps vertical tilting 
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'KM100_top_1',
            move: 200,
            color: '#00ffa8'
          })
          //needs approx 6s

          await new Promise(resolve => setTimeout(resolve, 7000));

          ////Adjustment of the reference mirror by -200 steps horizontal tilting
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'KM100_bottom_1',
            move: -200,
            color: '#00ffa8'
          })
          //needs approx 6s

          await new Promise(resolve => setTimeout(resolve, 7000));

          //Adjustment of the reference mirror by -200 steps vertical tilting 
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'KM100_top_1',
            move: -200,
            color: '#00ffa8'
          })
          //needs approx 6s

          await new Promise(resolve => setTimeout(resolve, 7000));

          ////Adjustment of the reference mirror by -200 steps horizontal tilting
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'KM100_bottom_1',
            move: 200,
            color: '#00ffa8'
          })
          //needs approx 6s

          await new Promise(resolve => setTimeout(resolve, 7000));

          //Adjustment of the linear stage by 200 steps counterclockwise 
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'linear_1',
            move: -200,
            color: '#00ffa8'
          })
          //needs approx 6s

          await new Promise(resolve => setTimeout(resolve, 7000));

          //Establish a ground state ==========================
          //Removes the retractable mirror
          socketCtx.socket.emit("command", {
            userId: 'XRTL',
            controlId: 'beamSplitter',
            binaryCtrl: false,
            color: '#00ffa8'
          })
        }

        showCase()

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

      else if (message === '!component' || message === '!components') {
        socketCtx.socket.emit("updateComponents");

        socketCtx.socket.on('updateComponents', (payload) => {

          if (payload.length === 0) {
            setChat([...chat, { userId: 'XRTL', message: 'No components are connected to the server! ', color: '#FF7373' }])
          }
          else {
            var component = ''

            for (var i = 1; i < payload.length; i += 2) {
              component += payload[i] + ', '
            }
            component = component.slice(0, -2)

            setChat([...chat, { userId: 'XRTL', message: 'List of all connected components: ' + component, color: '#FF7373' }]);
          }
        })
      }
      //DELETE from here ...
      else if (message === '!bs1') {

        socketCtx.socket.emit("command", {
          userId: socketCtx.username,
          controlId: 'servo_bblock_1',
          binaryCtrl: !beamSplitter1,
          color: socketCtx.fontColor,
        })

        socketCtx.socket.emit('message', { userId: 'XRTL', message: 'The beam splitter 1 has been set to ' + String(!beamSplitter1), color: '#FF7373' });

      }

      else if (message === '!bs2') {

        socketCtx.socket.emit("command", {
          userId: socketCtx.username,
          controlId: 'servo_bblock_2',
          binaryCtrl: !beamSplitter2,
          color: socketCtx.fontColor,
        })

        socketCtx.socket.emit('message', { userId: 'XRTL', message: 'The beam splitter 1 has been set to ' + String(!beamSplitter2), color: '#FF7373' });

      }
      //... DELETE until here

      // Output of an error message if command does not exist or is written incorrectly 
      else {
        setChat([...chat, { userId: 'XRTL', message: "Command doesn't exists", color: '#FF7373' }]);
      }

    }
    // Case 2: Sending a chat message to all web clients
    else if (message.length > 0 && message.replace(/\s/g, '').length !== 0) {
      socketCtx.socket.emit('message', { userId: socketCtx.username, message: message, color: socketCtx.fontColor });
    }
    setMessage('')
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
    <div className={styles.chatContainer + ' ' + animation}    >
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