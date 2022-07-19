import { useEffect, useState, useRef } from "react"
import styles from "./Chat.module.css"
import { ImBubble } from "react-icons/im"
import { MdSend } from "react-icons/md"
import { useSocketContext } from "../../services/SocketContext";

const Chat = (props) => {
  const [message, setMessage] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [animation, setAnimation] = useState("")
  const [chat, setChat] = useState([]);
  const socketCtx = useSocketContext();
  const tempChat = useRef();

  const ChatEmit = () => {
    socketCtx.socket.on("message", (payload) => {
      setChat([...chat, payload])
    })
  }

  tempChat.current = ChatEmit;

  useEffect(() => {
    tempChat.current();
  }, [socketCtx, chat])

  const sendMessage = (event) => {
    event.preventDefault()
    //console.log(message)
    socketCtx.socket.emit("message", { userId: socketCtx.username, message, color: socketCtx.fontColor })
    setMessage("");
  }

  const showChatHandler = () => {
    setAnimation(showChat ? styles.closeChat : styles.openChat)
    setShowChat(!showChat)
  }

  return (
    <div
      className={styles.chatContainer + " " + animation}
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
          type="text"
          name="message"
          placeholder="Type Message here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          required
        />
        <button type="submit"><MdSend size={25} /></button>
      </form>
      <div className={styles.chatHandler + " " + animation}>
        <span>
          <ImBubble size={35} onClick={showChatHandler} />
        </span>
      </div>
    </div>
  )
}
export default Chat
