import { useAppContext } from '../../services/AppContext';
import { RiTerminalBoxFill } from 'react-icons/ri';
import styles from './CSS/Console.module.css';
import { useState, memo } from 'react';
import { isEqual } from 'lodash';

/**
 * Console component 
 * 
 * @description This React component contains the console, the handling of collapsing/expanding it and the display of the log, i.e. the content of this component.
 * 
 * @returns {React.ReactElement} Console component  
 */
const Console = () => {
  const [showConsole, setShowConsole] = useState(false);
  const [animation, setAnimation] = useState('');

  const appCtx = useAppContext();

  //Function handles the folding/unfolding of the console
  const showConsoleHandler = () => {
    setAnimation(showConsole ? styles.closeConsole : styles.openConsole)
    setShowConsole(!showConsole)
  }

  return (
    <div className={styles.consoleContainer + ' ' + animation}>
      <div className={styles.consoleMain}>
        {/* Log representation */}
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
