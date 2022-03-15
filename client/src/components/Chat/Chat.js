import { useEffect} from "react"
import React from "react"
import styles from "./Chat.module.css"
import { ImBubble } from "react-icons/im"
import { MdSend } from "react-icons/md"
import { useSocketContext } from "../../services/SocketContext"

const Chat = (props) => {
  const [message, setMessage] = React.useState("")
  const [showChat, setShowChat] = React.useState(false)
  const [animation, setAnimation] = React.useState("")
  const [chat, setChat] = React.useState([])

  const socketCtx = useSocketContext();


  React.useEffect(() => {
    socketCtx?.socket.on("message", (payload) => {
      setChat([...chat, payload])
    })
  }, [socketCtx, chat])

  const sendMessage = (event) => {
    event.preventDefault()
    console.log(message)
    socketCtx?.socket.emit("message", { userName: "user", message })
    setMessage("")
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
            <b key={index}>
              {payload.userName}: <span>{payload.message}</span>
              <br />
            </b>
          )
        })}
      </div>
      <form className={styles.msgForm} onSubmit={sendMessage}>
        <input
          title="mes"
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
