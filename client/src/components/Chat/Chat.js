import { useSocketContext } from '../../services/SocketContext';
import { useEffect, useState, memo } from 'react'
import styles from './CSS/Chat.module.css'
import { ImBubble } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
import { isEqual } from 'lodash';

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
      <form className={styles.msgForm} onSubmit={sendMessage}>
        <input
          type='text'
          name='message'
          placeholder='Type message here...'
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          required
        />
        <button type='submit'><MdSend size={25} /></button>
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