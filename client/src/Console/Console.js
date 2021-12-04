import { useState, useEffect } from "react"
import { socket } from "../services/socket"
import { RiTerminalBoxFill } from "react-icons/ri"
import styles from "./Console.module.css"

const Console = (props) => {
  const [log, setLog] = useState(['App started...','Initializing.'])
  const [showConsole, setShowConsole] = useState(false)
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    socket.on("message", (payload) => {
      setLog([...log, payload])
    })
    console.log(log)
  }, [log])

  const showConsoleHandler = () => {
      setAnimation(showConsole ? styles.closeConsole : styles.openConsole)
      setShowConsole(!showConsole)
  }

  return (
    <div className={styles.consoleContainer + " "+ animation}>
      <div className={styles.consoleMain}>
           {log.map((payload, index) => {
              return(<span>{index}:{payload}<br/></span>)
          })}
      </div>
      <div className={styles.consoleHandler}><span>
          <RiTerminalBoxFill size={35} onClick={showConsoleHandler}/>
          </span></div>
    </div>
  )
}

export default Console
