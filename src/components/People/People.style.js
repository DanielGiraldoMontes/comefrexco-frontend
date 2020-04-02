import { lighten } from '@material-ui/core/styles/colorManipulator';

export const PeopleStyles = theme => ({
    wrapperPeople: {
        position: 'relative',
    },
    content: {
        display: 'block',
        width: '100%',
        height: 'calc(100vh - 85px)',
        overflow: 'auto',
    }
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