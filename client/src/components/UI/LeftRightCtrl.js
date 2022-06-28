import { useState } from "react";
import { useSocketContext } from "../../services/SocketContext";
import IconButton from '@mui/material/IconButton';
import Left from '@mui/icons-material/ArrowCircleLeftOutlined';
import Right from '@mui/icons-material/ArrowCircleRightOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const LeftRightCtrl = (props) => {
    const socketCtx = useSocketContext();

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

    const handleCtrl = () => {
        socketCtx.socket.emit("command", {
            userId: socketCtx.getNewUsername(),
            componentId: props.component,
            command: {
                controlId: "up",
               val: 15
            }
        })
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