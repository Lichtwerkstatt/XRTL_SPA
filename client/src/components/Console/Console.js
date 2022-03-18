import React, { useState } from "react"
// import { socket } from "../../services/SocketContext"
import { RiTerminalBoxFill } from "react-icons/ri"
import styles from "./Console.module.css"
import { useAppContext } from "../../services/AppContext"

const Console = (props) => {
  const [showConsole, setShowConsole] = React.useState(false)
  const [animation, setAnimation] = React.useState("")
  const appCtx = useAppContext();

  const showConsoleHandler = () => {
    setAnimation(showConsole ? styles.closeConsole : styles.openConsole)
    setShowConsole(!showConsole)
  }

  return (
    <div className={styles.consoleContainer + " " + animation}>
      <div className={styles.consoleMain}>
        {appCtx?.logs.map((payload, index) => {
          return (<span key={index}>:{payload}<br /></span>)
        })}
      </div>
      <div className={styles.consoleHandler}><span>
        <RiTerminalBoxFill test-id='console button' size={35} onClick={showConsoleHandler} />
      </span></div>
    </div>
  )
}

export default Console
