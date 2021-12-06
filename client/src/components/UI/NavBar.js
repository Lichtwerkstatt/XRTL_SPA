import styles from "./NavBar.module.css"
import {GiLaserWarning} from "react-icons/gi"
import {ImConnection} from "react-icons/im"
import {BsBox} from "react-icons/bs"

const NavBar = () => {
 return <div id="navbar" className={styles.navbar} >
     <h1>XR Remote Lab</h1>
     <div className={styles.navMenu}>
         <ul>
             <li><ImConnection size={29} /></li>
             <li><BsBox size={26} /></li>
             <li><GiLaserWarning size={29} /></li>
         </ul>
     </div>
 </div>
}

export default NavBar