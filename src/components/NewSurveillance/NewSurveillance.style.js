import {
    withStyles
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

export const NewSurveillanceStyles = theme => ({
    wrapperNewSurveillance: {
        position: 'relative',
        padding: '10px 20px',
    },
    content: {
        display: 'block',
        width: '100%',
        height: 'calc(100vh - 170px)',
        overflow: 'auto',
    },
    moduleHeader: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.separator,
        paddingBottom: 10,
    },
    moduleName: {
        alignSelf: 'flex-start',
        textAlign: 'left',
        color: theme.palette.text.primary,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 22,
        fontWeight: 600,
        margin: '0 0 5px 0',
        boxSizing: 'border-box',
    },
    moduleDescription: {
        alignSelf: 'flex-start',
        color: theme.palette.text.secondary,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 12,
        fontWeight: 400,
        margin: '0 0 5px 0',
        boxSizing: 'border-box',
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    datePicker: {
        width: '80%',
    },
    label: {
        fontWeight: 'normal !important',
        color: 'rgba(0, 0, 0, 0.87)',
        marginRight: 5,
        marginBottom: '0 !important',
    },
    amount: {
        width: 50,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit * 0.25,
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing.unit * 0.5,
    },
    wrapperOptions: {
        marginBottom: 40,
    },
    inputRoot: {
        flexWrap: 'wrap',

        '&::before': {
            display: 'none',
        },

        '&::after': {
            display: 'none',
        },
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

export const DialogStyles = theme => ({
    title: {
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.separator,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
    actions: {
        padding: 10,
    },
});

export const CropInput = withStyles(theme => ({
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #cccccc',
        fontSize: 14,
        width: 'auto',
        padding: '8px 10px',

        '&:focus': {
            borderRadius: 4,
            backgroundColor: theme.palette.secondary.light,
        },
    },
}))(InputBase);