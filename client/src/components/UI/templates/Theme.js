import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
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

export const themeLogin = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#01bd7d',
            main: '#01bd7d',
            dark: '#01bd7d',
            contrastText: '#fff',
        },
    },
    spacing: 2,
})