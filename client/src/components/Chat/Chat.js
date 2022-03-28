import { useEffect, useState } from "react"
import styles from "./Chat.module.css"
import { ImBubble } from "react-icons/im"
import { MdSend } from "react-icons/md"
import { useSocketContext } from "../../services/SocketContext";
import Login from "../Login/Login"
import { BiFontColor } from "react-icons/bi";

const Chat = (props) => {
  const [message, setMessage] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [animation, setAnimation] = useState("")
  const [chat, setChat] = useState([]);
  const [font, setFont] = useState("white")

  const socketCtx = useSocketContext();

  useEffect(() => {
    socketCtx.socket.on("message", (payload) => {
      setChat([...chat, payload])
    })
  }, [socketCtx, chat])

  const sendMessage = (event) => {
    event.preventDefault()
    setFont(socketCtx.getNewFont());
    console.log(message)
    socketCtx.socket.emit("message", { userName: socketCtx.getNewUsername(), message })
    setMessage("");
    console.log(socketCtx.getNewFont());
    //setFont(Login.getFontColor());
  }

  const showChatHandler = () => {
    console.log(socketCtx.getNewURL())
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
              <span style={{ color: socketCtx.getNewFont() }}> {payload.userName}:</span> <span >{payload.message}</span>
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
