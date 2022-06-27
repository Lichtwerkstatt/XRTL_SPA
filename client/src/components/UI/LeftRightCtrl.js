import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../services/AppContext";
import { useSocketContext } from "../../services/SocketContext";

import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LeftRightCtrl = (props) => {
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
            <IconButton onClick={handleCtrl}>
                <Left />
            </IconButton>
            <IconButton onClick={handleCtrl}>
                <Right />
            </IconButton>

        </ThemeProvider>
    )

}

export default LeftRightCtrl;