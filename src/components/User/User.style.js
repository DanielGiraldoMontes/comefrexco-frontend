import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

export const UserStyles = theme => ({
    wrapper: {
        position: 'relative'
    },
    content: {
        display: 'block',
        width: '100%',
        height: 'calc(100vh - 85px)',
        overflow: 'auto',
    },
});

export const DialogStyles = theme => ({
    linkChangePassword: {
        paddingTop: 15,
        marginTop: 20,
        marginBottom: 20,
    },
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

export const TableStyles = theme => ({
    root: {
        width: '100%',
        marginTop: 0,
        position: 'relative',
        boxShadow: 'none'
    },
    table: {
        minWidth: 1020,
        fontFamily: '"Open Sans", sans-serif',
    },
    tableRow: {
        cursor: 'default',
    },
    tableWrapper: {
        overflowX: 'auto',
        padding: '0 20px',
    },
});

export const ToolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        position: 'relative'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.95),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    moduleName: {
        color: theme.palette.primary.main,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 22,
        fontWeight: 600
    },
    descriptionModule: {
        color: theme.palette.text.secondary,
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 12,
        fontWeight: 400
    }
});