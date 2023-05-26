import styles from "../CSS/WelcomeWindowContent.module.css"
import { ThemeProvider, Button } from '@mui/material';
import { themeLogin } from '../../UI/templates/Theme'
import { useState } from "react";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const WelcomeWindowContent = (props) => {
  const [buttonValue, setButtonValue] = useState(0)

  const handleButtonNext = (event) => {
    setButtonValue(buttonValue + 1);

    document.getElementById(String(buttonValue)).style.display = 'none'
    document.getElementById(String(buttonValue + 1)).style.display = 'block'
  }

  const handleButtonBack = (event) => {
    setButtonValue(buttonValue - 1);

    document.getElementById(String(buttonValue)).style.display = 'none'
    document.getElementById(String(buttonValue - 1)).style.display = 'block'
  }


  return (
    <ThemeProvider theme={themeLogin}>
      <div>

        <div className={styles.mainWrapper} >

          <p id={'0'}>
            Welcome to XRTL website, where you can remotely control a simple Michelson interferometer and observe the interference pattern. Whether you're a student, researcher, or enthusiast, our
            user-friendly platform enables you to explore the fascinating world of optics and interferometry at your own pace. With real-time access to our experimental setup, you can adjust the paths and
            observe the resulting interference pattern, learning about interference effects and the wave-like nature of light. Login and discover the possibilities of remote interferometry!

          </p>
          <p id={'1'} style={{ display: 'none' }}>
            The main function of a Michelson interferometer is to measure small differences in the length of two light paths, which can provide information about the properties of a sample placed in one
            of the paths. To achieve this a single beam of light is split into two paths (sample beam and reference beam) and later recombined on a screen. Analyzing the resulting interference pattern can
            reveal even small changes.
          </p>

          <p id={'2'} style={{ display: 'none' }}>
            Our remote experiment allows you to control the components of a Michelson interferometer by simply clicking on their virtual twin. This opens a window that allows you to adjust the settings.
            You can observe the resulting interference pattern by selecting the screen. Additionally, you can view the entire setup by clicking on the camera icon in the header. Whether you're an expert or a
            beginner, you can experiment and explore the physics of interferometry in any way you choose, either by playing around with the components or by following our detailed manual for a more
            structured approach. We encourage you to discover the fascinating world of optics and interferometry.
          </p>


        </div>

        <div className={styles.buttons} >
          {buttonValue === 0 ?
            <Button size='small' type='submit' variant='contained'
              onClick={handleButtonNext}
              endIcon={<KeyboardArrowRightOutlinedIcon />}
              style={props.width == '350px' ? { left: 260 } : { left: '80%' }}
            >Next</Button>
            :
            <div></div>}


          {buttonValue !== 0 ?
            <Button size='small' type='submit' variant='contained'
              onClick={handleButtonBack}
              startIcon={<KeyboardArrowLeftOutlinedIcon />}
              style={props.width == '350px' ? { left: 17 } : { left: '5%' }}
            >Back</Button>
            :
            <div></div>}

          {buttonValue !== 0 && buttonValue !== 2 ?
            <Button size='small' type='submit' variant='contained'
              onClick={handleButtonNext}
              endIcon={<KeyboardArrowRightOutlinedIcon />}
              style={props.width == '350px' ? { left: 185.5 } : { left: '65.5%' }}
            >Next</Button>
            :
            <div></div>}
        </div>
      </div>
    </ThemeProvider>
  )
}
export default WelcomeWindowContent;
