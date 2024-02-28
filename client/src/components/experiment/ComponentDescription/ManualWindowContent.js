import styles from "./CSS/ManualWindowContent.module.css";
import Stepper from "../../UI/templates/Stepper";
import { theme } from '../../UI/templates/Theme';
import { ThemeProvider } from '@mui/material/';

import Fig1 from "../../media/images/XRTL_Manual_Fig_1.png";
import Gif2 from "../../media/images/MI_Beampath.gif";
import Gif3 from "../../media/images/Component_Window.gif";

const gifContainer = document.createElement("div");
gifContainer.classList.add("gif-style");

const gifImage = document.createElement("img");
gifImage.src = Fig1;
gifImage.alt = "cycling";

gifContainer.appendChild(gifImage);

/**
 * Manual description content 
 * 
 * @description This window contains instructions for carrying out the experiment.
 * 
 * @returns {React.ReactElement} Instruction text for the experiment 
 */
const ManualWindowContent = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className={styles.mainWrapper}      >
          {/* First Page */}
          <div id={'10'}>
            <b>1. &nbsp; Introduction</b><br /><br />
            <ul>
              <li>Welcome to our remote-controlled <b>Michelson&nbsp;Interferometer</b>! Today, we'll explore various physical effects and phenomena. Remember, this manual serves as a guide, and users can follow their own exploration path based on their interests and objectives. Enjoy your journey through the fascinating world of Michelson interferometry!
              </li><br />
              <li>Discover who is currently engaged in experimentation with you at the <b>XRTL&nbsp;Showcase</b>. Simply type "<i>!users </i>" in the chat (pinned on the left edge) to unveil the answer. You can communicate with them via the chat.
              </li>
            </ul>
          </div>

          {/* Second Page */}
          <div id={'11'} style={{ display: 'none' }}>
            <b>2.a &nbsp; Overview</b><br /><br />
            <ul>
              <li>Initiate your experiment by gaining an overview. Begin by accessing the live camera feed through the menu located at the top right corner. From there, you can observe the current state of the experimental setup in our showcase at the <b>Abbe&nbsp;School&nbsp;of&nbsp;Photonics</b>. You can also turn on the top light by clicking on the light bulb icon. 
              </li><br />
              <li>Take note of the visible components and compare them with those displayed in the 3D model. Can you identify all of them?
              </li>
            </ul>
          </div>

          {/* Second Page */}
          <div id={'12'} style={{ display: 'none' }}>
            <b>2.b &nbsp; Overview</b><br /><br />
            <ul>
              <li>Familiarize yourself with the user interface, including the power supply, mirror controls and beam splitter options. Simply tap on the individual components to display the respective control window.
              </li>
            </ul>
            
            <div className={styles.ManualgifContainer2}>
              <img src={Gif3} alt="cycling" className={styles.ManualImage} />
            </div> 

          </div>

          {/* Third Page */}
          <div id={'13'} style={{ display: 'none' }}>
            <b>3.a &nbsp; Laser</b><br /><br />
            <ul>
              <li>Focus your attention on the <b>Screen</b> and tap on it to continue. This action will open a window showing a live camera stream of the screen. When the laser is inactive, you will initially see a gray wall.
              </li><br />
              <li>Now, let's activate the laser. To accomplish this, tap on the <b>Power&nbsp;Supply</b> to reveal its control window and switch on the laser. Take a moment to look at the screen again.
                <br />Can you perceive any changes now?
              </li>
            </ul>

            <div className={styles.ManualgifContainer1}>
              <img src={Gif2} alt="cycling" className={styles.gifImage} />
            </div>

          </div>

          {/* Fourth Page */}
          <div id={'14'} style={{ display: 'none' }}>
            <b>3.b &nbsp; Laser</b><br /><br />
            <ul>
              <li>You should!
                <ul>
                  <br /><li>If you see green concentric rings (a,b), then the <b>Michelson&nbsp;Interferometer</b> is well adjusted.
                  </li><br />
                  <li>If you see stripes (c), then the reference mirror is tilted.
                  </li><br />
                  <li>If you only see a green spot (d), then the experiment is misaligned.
                  </li>
                </ul>
              </li>
            </ul>

            <div className={styles.ManualgifContainer1} >
                <img src={Fig1} alt="cycling" className={styles.ManualImage} />
            </div>

          </div>

          {/* Fifth Page */}
          <div id={'15'} style={{ display: 'none' }}>
            <b>4. &nbsp; Beam Path</b><br /><br />
            <ul>
              <li>Tap on the <b>Beam Path</b> icon (laser symbol) located in the top right to visualize the laser beam path within the interferometer.
                <ul>
                  <br /><li>The <b>Lens</b> widens the beam (after the focal length) so that a larger area on the screen can be illuminated instead of just one spot.
                  </li><br />
                  <li>The <b>Beam&nbsp;Splitter</b> divides the beam into two partial beams. These partial beams then proceed along separate paths before ultimately reuniting at the <b>Beam Splitter</b> on their way towards the <b>Screen</b>.
                  </li><br />
                  <li>The <b>Linear&nbsp;Movable&nbsp;Mirror</b> can be used to change the path length of one partial beam.
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Fifth Page */}
          <div id={'16'} style={{ display: 'none' }}>
            <b>5.a &nbsp; Basic Interference</b><br /><br />
            <ul>
              <li>Prior to commencing, ensure that the experiment is set to its initial state. To accomplish this, type "<i>!reset </i>" into the chat.
              </li><br />
              <li>Convince yourself that this is a real diffraction phenomenon by alternately blocking a partial beam with one of the <b>Retract. Beam Blockers</b>.
              </li><br />
              <li>What can you observe? Can you explain what you observed?
                <br />Maybe the info (i) in the <b>Retract. Beam Blocker</b> control window will help you.
              </li>
            </ul>
          </div>

          {/* Fifth Page */}
          <div id={'17'} style={{ display: 'none' }}>
            <b>5.b &nbsp; Basic Interference</b><br /><br />
            <ul>
              <li>Deactivate both <b>Retract. Beam Blockers</b> again and adjust the path length difference between the two arms of the interferometer using the <b>Linear&nbsp;Movable&nbsp;Mirror</b>.
              </li><br />
              <li>Observe the resulting interference pattern on the <b>Screen</b>. Note the changes as you vary the path length difference.
                <br />Do the rings grow or shrink?
              </li>
            </ul>
          </div>

          {/* Sixth Page */}
          <div id={'18'} style={{ display: 'none' }}>
            <b>6. &nbsp; Tiltable Mirror</b><br /><br />
            <ul>
              <li>Next, try out the controls of the <b>Reference&nbsp;Mirror</b> to change the angle of this mirror.
              </li><br />
              <li>Observe how the tilt affects the interference pattern. You should notice a shift of the diffraction pattern center.
                <br />How does the distance between the rings change from the center of the rings to the outside?
              </li>
            </ul>
          </div>

          {/* Seventh Page */}
          <div id={'19'} style={{ display: 'none' }}>
            <b>7. &nbsp; Second Beam Splitter</b><br /><br />
            <ul>
              <li>Activate the <b>Retractable&nbsp;Beam&nbsp;Splitter</b> to observe the second output of the interferometer on the <b>Screen</b>.
              </li><br />
              <li>Engage in a comparison between the two interference patterns, while also utilizing the setup's capability to modify the patterns.
                <br />What is the relationship that exists between these two patterns?
              </li>
            </ul>
          </div>

          {/* Eighth Page */}
          <div id={'20'} style={{ display: 'none' }}>
            <b>8. &nbsp; Conclusion</b><br /><br />
            <ul>
              <li>Congratulations! You've explored a range of physical effects with our remote-controlled <b>Michelson&nbsp;Interferometer</b>.
              </li><br />
              <li>Feel free to continue experimenting with the <b>XRTL&nbsp;Showcase</b> and exploring on your own.
              </li>
            </ul>
          </div>

        </div>

        {/* Stepper at the bottom of the window */}
        <ThemeProvider theme={theme}>
          <Stepper left={'Back'} right={'Next'} buttonValue={10} length={11} component={'manual'} />
        </ThemeProvider>
      </div>
    </ThemeProvider>
  )
}
export default ManualWindowContent;