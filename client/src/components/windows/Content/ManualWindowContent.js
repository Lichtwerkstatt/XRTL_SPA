import styles from "../CSS/ManualWindowContent.module.css"
import Stepper from "../../UI/templates/Stepper";
import { theme } from '../../UI/templates/Theme';
import { ThemeProvider } from '@mui/material/';

const ManualWindowContent = (props) => {
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
        <Stepper left={'Back'} right={'Next'} buttonValue={10} length={3} />
      </ThemeProvider>
    </div>
  )
}
export default ManualWindowContent;