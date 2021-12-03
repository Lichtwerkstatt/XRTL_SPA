import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import styles from "./Chat.module.css";
import { ImBubble } from "react-icons/im";

const Chat = (props) => {
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
    console.log(chat);
  }, [chat]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message);
    socket.emit("message", { userName: "user", message });
    setMessage("");
  };

  const showChatHandler = () => {
    console.log(showChat);
    setShowChat(!showChat);
  };

  return (
    <div
      className={styles.chatContainer}
      style={{ left: showChat ? "0px" : "-405px" }}
    >
      <div className={styles.chatMain}>
        {chat.map((payload, index) => {
          return (<b key={index}>{payload.userName}: <span>{payload.message}</span><br/></b>)
        })}
      </div>
      <form className={styles.msgForm} onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type Message here"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div className={styles.chatHandler}>
        <span>
          <ImBubble size={35} onClick={showChatHandler} />
        </span>
      </div>
    </div>
  );
};

export default Chat;
