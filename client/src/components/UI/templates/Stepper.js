
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';

/* props:    
length... Specifies the length of the slider
left... Slider text left
right... Slider text right
buttonValue... indicates the beginning of the Ids of the paragraphs of the text 
(these should be set once at 1, 10, 20, ... because otherwise, when opening several windows, all elements with the same ID will be changed).)
 */
const Stepper = (props) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(1);
    const [buttonValue, setButtonValue] = useState(props.buttonValue)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setButtonValue((buttonValue) => buttonValue + 1);

        document.getElementById(String(buttonValue)).style.display = 'none'
        document.getElementById(String(buttonValue + 1)).style.display = 'block'
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setButtonValue((buttonValue) => buttonValue - 1);

        document.getElementById(String(buttonValue)).style.display = 'none'
        document.getElementById(String(buttonValue - 1)).style.display = 'block'
    };

    return (
        <MobileStepper
            variant="progress"
            steps={props.length + 1}
            position="static"
            activeStep={activeStep}
            sx={{ width: '97%', flexGrow: 1, top: '90%', position: 'absolute', background: 'transparent' }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === props.length}>
                    {props.right}
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 1}>
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    {props.left}
                </Button>
            }
        />
    );
}
export default Stepper;