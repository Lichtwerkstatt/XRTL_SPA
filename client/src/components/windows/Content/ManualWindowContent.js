import styles from "../CSS/ManualWindowContent.module.css"
import { Button, MobileStepper, ThemeProvider } from '@mui/material/';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";
import { theme } from '../../UI/templates/Theme'

const ManualWindowContent = (props) => {
  const [activeStep, setActiveStep] = useState(0)
  const [buttonValue, setButtonValue] = useState(10)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setButtonValue((buttonValue) => buttonValue + 1);

    document.getElementById(String(buttonValue)).style.display = 'none'
    document.getElementById(String(buttonValue + 1)).style.display = 'block'
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setButtonValue((buttonValue) => buttonValue + 1);

    document.getElementById(String(buttonValue)).style.display = 'none'
    document.getElementById(String(buttonValue - 1)).style.display = 'block'
  };

  return (
    <div>
      <div className={styles.mainWrapper}      >
        <p id={'10'}>
          Manual 1
        </p>
        <p id={'11'} style={{ display: 'none' }}>
          Manual 2
        </p>

        <p id={'12'} style={{ display: 'none' }}>
          Manual 3
        </p>

      </div>

      <ThemeProvider theme={theme}>
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          sx={{ width: '97%', flexGrow: 1, top: '90%', position: 'absolute', background: 'transparent' }}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </ThemeProvider>
    </div>
  )
}
export default ManualWindowContent;
