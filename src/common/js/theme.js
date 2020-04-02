import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#010B17',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#008da4',
            light: '#cdeff5',
            dark: '#0078A4',
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        white: '#ffffff',
        separator: 'rgba(0, 0, 0, 0.12)',
        panel: '#f5f6f7',
        shadow: 'rgba(1, 11, 23, 0.509804)',
        // error: will use the default color
    },
});