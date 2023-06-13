import { useAppContext } from '../../services/AppContext'
import { RiTerminalBoxFill } from 'react-icons/ri'
import styles from './CSS/Console.module.css'
import { useState, memo } from 'react'
import { isEqual } from 'lodash';

const Console = (props) => {
  const [showConsole, setShowConsole] = useState(false);
  const [animation, setAnimation] = useState('');
  const appCtx = useAppContext();

  const showConsoleHandler = () => {
    setAnimation(showConsole ? styles.closeConsole : styles.openConsole)
    setShowConsole(!showConsole)
  }

  return (
    <div className={styles.consoleContainer + ' ' + animation}>
      <div className={styles.consoleMain}>
        {appCtx.logs.map((payload, index) => {
          return (<span key={index}>{payload}<br /></span>)
        })}
      </div>
      <div className={styles.consoleHandler}>
        <span>
          <RiTerminalBoxFill size={35} onClick={showConsoleHandler} />
        </span>
      </div>
    </div>
  )
}
export default memo(Console, isEqual);
