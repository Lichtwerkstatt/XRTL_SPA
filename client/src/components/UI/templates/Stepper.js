import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { useAppContext } from '../../../services/AppContext';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import propTypes from "prop-types";

/**
 * Stepper component
 * 
 * @description This component returns a styled stepper. For this, the controlId, the length of the stepper and the beginning of the 
 * Id of the paragraphs must be specified. Optionally, the text on the right and left can be defined. 
 * 
 * @param {string} component - controlId 
 * @param {number} length - Specifies the length of the stepper
 * @param {string} left -  text at the left/beginning
 * @param {string} right -text at the right/end
 * @param {number} buttonValue - indicates the beginning of the Ids of the paragraphs of the text (these should be set once at 1, 10, 20, ...,
 *  because otherwise, when opening several windows, all elements with the same ID will be changed).)
 * 
 * @returns {React.ReactElement} styled stepper with the specified props 
 * 
 * @example <Stepper left={'Back'} right={'Next'} buttonValue={10} length={9} component={'manual'} />
 * @example <Stepper left={'Back'} right={'Next'} buttonValue={20} length={6} component={'help'} />
 * @example <Stepper buttonValue={30} length={3} component={'manual2'} />
 */

const StepperCtrl = (props) => {
    const theme = useTheme();
    const appCtx = useAppContext();
    const [activeStep, setActiveStep] = useState(1 === appCtx.manualPage ? 1 : appCtx.manualPage)
    const [buttonValue, setButtonValue] = useState(1 === appCtx.manualPage ? props.buttonValue : appCtx.manualPage + props.buttonValue - 1)

    useEffect(() => {
        if (1 !== appCtx.manualPage) {
            document.getElementById(String(props.buttonValue)).style.display = 'none'
            document.getElementById(String(appCtx.manualPage + props.buttonValue - 1)).style.display = 'block'
        }
        //Comment needed to prevent a warning
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setButtonValue((buttonValue) => buttonValue + 1);

        document.getElementById(String(buttonValue)).style.display = 'none'
        document.getElementById(String(buttonValue + 1)).style.display = 'block'

        if (props.component) {
            appCtx.toggleSetManualPage(activeStep + 1)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setButtonValue((buttonValue) => buttonValue - 1);

        document.getElementById(String(buttonValue)).style.display = 'none'
        document.getElementById(String(buttonValue - 1)).style.display = 'block'

        if (props.component) {
            appCtx.toggleSetManualPage(activeStep - 1)
        }
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

StepperCtrl.propTypes = {
    component: propTypes.string.isRequired,
    length: propTypes.number.isRequired,
    left: propTypes.string,
    right: propTypes.string,
    buttonValue: propTypes.number.isRequired,
}

export default StepperCtrl;