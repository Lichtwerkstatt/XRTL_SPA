import { createTheme } from '@mui/material/styles';

/**
 * Standard theme
 * 
 * @description This theme is the default theme used.
 * 
 * @returns theme
 */
export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#01bd7d',
            main: '#01bd7d',
            dark: '#01bd7d',
            contrastText: '#01bd7d',
        },
    },
})

export const themeSettings = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            light: '#01bd7d',
            main: '#01bd7d',
            dark: '#01bd7d',
            contrastText: '#01bd7d',
        },
    },

    spacing: window.innerWidth <= 992 ? 1 : 8,
})

/**
 * Login theme
 * 
 * @description This theme is used in the login window. The special feature here is that the contrast text is white and spaceing is set to two.
 * 
 * @returns login theme
 */

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