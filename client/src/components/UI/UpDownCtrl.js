import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import Up from '@mui/icons-material/ArrowCircleUpOutlined';
import Down from '@mui/icons-material/ArrowCircleDownOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UpDownCtrl = (props) => {
  const [sliderPos, setSliderPos] = useState(props.sliderPos);

  const appCtx = useAppContext();
  const socketCtx = useSocketContext();
  const tempCtrl = useRef();

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#01bd7d',
        main: '#01bd7d',
        dark: '#01bd7d',
        contrastText: '#01bd7d',
      },
    }
  })

  const ctrlEmit = () => {
    socketCtx.socket.on("status", payload => {
      console.log(payload);
      if (payload.component === props.component) {
        setSliderPos(payload.status[props.control]);
      }
    })
  }

  tempCtrl.current = ctrlEmit;

  useEffect(() => {
    tempCtrl.current();
  }, [socketCtx.socket])

  const handleCtrl = () => {
    console.log("dcnjdkchdk")
  }


  return (
    <ThemeProvider theme={theme}>
      <Stack>
        <IconButton onClick={handleCtrl}>
          <Up />
        </IconButton>
        <IconButton onClick={handleCtrl}>
          <Down />
        </IconButton>
      </Stack>
    </ThemeProvider>
  )

}

export default UpDownCtrl;