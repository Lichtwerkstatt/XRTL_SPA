import styles from "./CSS/ManualWindowContent.module.css";
import Stepper from "../../UI/templates/Stepper";
import { theme } from '../../UI/templates/Theme';
import { ThemeProvider } from '@mui/material/';

/**
 * Task description content 
 * 
 * @description This window contains an abbreviated version of the tasks in the form of bullet points for the experiment.
 * 
 * @returns {React.ReactElement} Abbreviated version of the task description
 */
const ManualWindowContent = () => {
    return (
        <div>
            <div className={styles.mainWrapper}>
                {/* First Page */}
                <div id={'10'}>
                    <b>1. &nbsp; Introduction</b><br /><br />
                    <ul>
                        <li>Welcome to our remote-controlled <b>Michelson&nbsp;Interferometer</b>! Today, we'll explore various physical effects and phenomena. Remember, this manual serves as a guide, and users can follow their own exploration path based on their interests and objectives. Enjoy your journey through the fascinating world of Michelson interferometry!
                        </li><br />
                        <li>Discover who is currently engaged in experimentation with you at the <b>XRTL&nbsp;Showcase</b>. Simply type <i>"!users"</i> in the chat (pinned on the left edge) to unveil the answer. You can communicate with them via the chat.
                        </li><br />
                        <li>Discover who is currently engaged in experimentation with you at the <b>XRTL&nbsp;Showcase</b>. You can simply communicate with them via the chat (pinned on the left edge).
                        </li>
                    </ul>
                </div>

                {/* Second Page */}
                <div id={'11'} style={{ display: 'none' }}>
                    <b>2. &nbsp; Overview</b><br /><br />
                    <ul>
                        <li>Initiate your experiment by gaining an overview. Begin by accessing the live camera feed through the menu located at the top right corner. From there, you can observe the current state of the experimental setup in our showcase at the <b>Abbe&nbsp;School&nbsp;of&nbsp;Photonics</b>. Take note of the visible components and compare them with those displayed in the 3D model.
                            <br /> Can you identify all of them?
                        </li><br />
                        <li>Familiarize yourself with the user interface, including the power supply, mirror controls and beam splitter options. Simply tap on the individual components to display the respective control window.
                        </li>
                    </ul>
                </div>

                {/* Third Page */}
                <div id={'12'} style={{ display: 'none' }}>
                    <b>3.a &nbsp; Laser</b><br /><br />
                    <ul>

                    </ul>
                </div>

            </div>

            {/* Stepper at the bottom of the window */}
            <ThemeProvider theme={theme}>
                <Stepper left={'Back'} right={'Next'} buttonValue={10} length={3} component={'manual'} />
            </ThemeProvider>
        </div>
    )
}
export default ManualWindowContent;