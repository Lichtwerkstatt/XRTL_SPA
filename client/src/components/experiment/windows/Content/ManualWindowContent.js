import styles from "../CSS/ManualWindowContent.module.css";
import Stepper from "../../../UI/templates/Stepper";
import { theme } from '../../../UI/templates/Theme';
import { ThemeProvider } from '@mui/material/';


const ManualWindowContent = (props) => {
  return (
    <div>
      <div className={styles.mainWrapper}      >
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

        <div id={'12'} style={{ display: 'none' }}>
          <b>3.a &nbsp; Laser</b><br /><br />
          <ul>
            <li>Direct your attention to the <b>Screen</b> and tap on it to proceed. This action will open a window displaying a live camera stream of the screen. Initially, when the laser is inactive, you will observe a gray wall.
            </li><br />
            <li>Now, let's activate the laser. To accomplish this, tap on the <b>Power&nbsp;Supply</b> to reveal its control window and switch on the laser. Take a moment to observe the screen once again.
              <br />Can you perceive any changes now?
            </li>
          </ul>
        </div>

        <div id={'13'} style={{ display: 'none' }}>
          <b>3.b &nbsp; Laser</b><br /><br />
          <ul>
            <li>You should!
              <ul>
                <br /><li>If you see green concentric rings, then the <b>Michelson&nbsp;Interferometer</b> is well adjusted.
                </li><br />
                <li>If you see stripes, then the reference mirror is tilted.
                </li><br />
                <li>If you only see a green spot, then the experiment is misaligned.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div id={'14'} style={{ display: 'none' }}>
          <b>4. &nbsp; Beam Path</b><br /><br />
          <ul>
            <li>Tap on the laser symbol located in the top center next to the Overview label to visualize the laser beam path within the interferometer.
              <ul>
                <br /><li>The <b>Lens</b> widens the beam so that a larger area on the screen can be illuminated instead of just one spot.
                </li><br />
                <li>The <b>Beam&nbsp;Splitter</b> divides the beam into two partial beams. These partial beams then proceed along separate paths before ultimately reuniting at the Beam Splitter on their way towards the Screen.
                </li><br />
                <li>The <b>Linear&nbsp;Movable&nbsp;Mirror</b> can be used to change the path length of one partial beam.
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div id={'15'} style={{ display: 'none' }}>
          <b>5. &nbsp; Basic Interference</b><br /><br />
          <ul>
            <li>Prior to commencing, ensure that the experiment is set to its initial state. To accomplish this, type <i>"!reset"</i> into the chat.
            </li><br />
            <li>Start by adjusting the path length difference between the two arms of the interferometer using the <b>Linear&nbsp;Movable&nbsp;Mirror</b>.
            </li><br />
            <li>Observe the resulting interference pattern on the <b>Screen</b>. Note the changes as you vary the path length difference.
              <br />Do the rings grow or shrink?
            </li>
          </ul>
        </div>

        <div id={'16'} style={{ display: 'none' }}>
          <b>6. &nbsp; Tiltable Mirror</b><br /><br />
          <ul>
            <li>Next, experiment with the <b>Reference&nbsp;Mirror</b> to change the angle of this mirror.
            </li><br />
            <li>Observe how the tilt affects the interference pattern. You should notice a shift of the diffraction pattern center.
              <br />How does the distance between the rings change from the center to the outside?
            </li>
          </ul>
        </div>

        <div id={'17'} style={{ display: 'none' }}>
          <b>7. &nbsp; Second Beam Splitter</b><br /><br />
          <ul>
            <li>Activate the <b>Retractable&nbsp;Beam&nbsp;Splitter</b> to observe the second output of the interferometer on the <b>Screen</b>.
            </li><br />
            <li>Engage in a comparison between the two interference patterns, while also utilizing the setup's capability to modify the patterns.
              <br />What is the relationship that exists between these two patterns?
            </li>
          </ul>
        </div>

        <div id={'18'} style={{ display: 'none' }}>
          <b>8. &nbsp; Conclusion</b><br /><br />
          <ul>
            <li>Congratulations! You've explored a range of physical effects with our remote-controlled <b>Michelson&nbsp;Interferometer</b>.
            </li><br />
            <li>Feel free to continue experimenting with the <b>XRTL&nbsp;Showcase</b> and exploring on your own.
            </li>
          </ul>
        </div>

      </div>

      <ThemeProvider theme={theme}>
        <Stepper left={'Back'} right={'Next'} buttonValue={10} length={9} component={'manual'} />
      </ThemeProvider>
    </div>
  )
}
export default ManualWindowContent;