export const AppStyles = theme => ({
    header: {
        margin: 0,
        padding: '0 10px',
        backgroundColor: '#010B17',
        height: '10vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        listStyle: 'none',
    },
    hide: {
        display: 'none !important'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 60,
    },
    appName: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    appIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    session: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    closeSession: {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: 24,
    },
    content: {
        width: '100%',
        height: 'calc(100vh - 10vh)',
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        boxSizing: 'border-box',
    },
    expanded: {
        height: '100vh'
    },
    nav: {
        display: 'block',
        position: 'relative',
        width: 250,
        height: '100%',
        backgroundColor: '#f5f6f7',
        boxSizing: 'border-box',
    },
    expansionPanel: {
        margin: 0,
        backgroundColor: '#f5f6f7',
        boxShadow: 'none',
        borderTop: '1px solid #cdd3d7',

        '&:before': {
            display: 'none'
        },

        '&:nth-last-child(1)': {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        }
    },
    expansionPanelSummary: {
        '&[aria-expanded="true"]': {
            backgroundColor: '#008da4',

            '& p' : {
                color: '#ffffff',
            },

            '& span' : {
                color: '#ffffff',
            }
        },
        '& p' : {
            textTransform: 'capitalize',
            color: '#010B17',
        },
    },
    expansionPanelContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,

        '& p': {
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: 0,
            color: '#010B17',
            boxSixing: 'border-box',

            '& a': {
                display: 'flex',
                alignItems: 'center',
                padding: '10px 30px',
                boxSizing: 'border-box',
                color: '#010B17',
                textDecoration: 'none',

                '&.is-active': {
                    backgroundColor: '#E7E7EA',

                    '& svg': {
                        display: 'block',
                    },
                },
            },
        },
    },
    activeIcon: {
        display: 'none',
        alignSelf: 'center',
        marginLeft: 5,
        fontSize: 14,
        color: '#B6B6B6',
    },
    mainContent: {
        display: 'block',
        position: 'relative',
        width: 'calc(100% - 250px)',
        height: '100%',
        boxSizing: 'border-box',
    },
    fullWidth: {
        width: '100%',
    },
});