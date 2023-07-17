import styles from "../CSS/WelcomeWindowContent.module.css";
import Gif3 from "../../media/images/Component_Window.gif";
import Gif2 from "../../media/images/MI_Beampath.gif";
import { themeLogin } from '../../UI/templates/Theme';
import Gif1 from "../../media/images/xrtl_team.png";
import Stepper from "../../UI/templates/Stepper";
import { ThemeProvider } from '@mui/material';

const gifContainer = document.createElement("div");
gifContainer.classList.add("gif-style");

const gifImage = document.createElement("img");
gifImage.src = Gif1;
gifImage.alt = "cycling";

gifContainer.appendChild(gifImage);

const WelcomeWindowContent = (props) => {
  return (
    <ThemeProvider theme={themeLogin}>
      <div>
        <div className={styles.mainWrapper} >
          <div id={'0'} align="left">
            <b>Getting Started</b><br /><br />
            Welcome to XRTL website, where you can remotely control a simple Michelson interferometer and observe the interference pattern. Whether you're a student, researcher, or enthusiast, our
            user-friendly platform enables you to explore the fascinating world of optics and interferometry at your own pace. With real-time access to our experimental setup, you can adjust the paths and
            observe the resulting interference pattern, learning about interference effects and the wave-like nature of light. Login and discover the possibilities of remote interferometry!

            <div className={styles.WelcomegifContainer1} >
              <img src={Gif1} alt="cycling" className={styles.gifImage} />
            </div>

          </div>
          <div id={'1'} style={{ display: 'none' }}>
            <b>Michelson Interferometer in a Nutshell</b><br /><br />
            The main function of a Michelson interferometer is to measure small differences in the length of two light paths, which can provide information about the properties of a sample placed in one
            of the paths. To achieve this a single beam of light is split into two paths (sample beam and reference beam) and later recombined on a screen. Analyzing the resulting interference pattern can
            reveal even small changes.

            <div className={styles.WelcomegifContainer2}>
              <img src={Gif2} alt="cycling" className={styles.gifImage} />
            </div>

          </div>
          <div id={'2'} style={{ display: 'none' }}>
            <b>Basic Handling</b><br /><br />
            You can control the components of the Michelson interferometer by simply tapping on their virtual twin.
            This opens a window that allows you to adjust the settings. You can observe the resulting interference pattern by selecting the screen.
            Additionally, you can view the entire setup by clicking on the camera icon in the header.
            You can freely experiment by manipulating components or follow the detailed manual for a structured approach.
            We encourage you to discover the fascinating world of optics and interferometry.

            <div className={styles.WelcomegifContainer3}>
              <img src={Gif3} alt="cycling" className={styles.gifImage} />
            </div>

          </div>
        </div>
        <Stepper component={'welcomeWindow'} left={'Back'} right={'Next'} buttonValue={0} length={3} />

      </div>
    </ThemeProvider>
  )
}
export default WelcomeWindowContent;
