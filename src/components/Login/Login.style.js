import Background from '../../images/background.jpg';

export const LoginStyles = theme => ({
    wrapperLogin: {
        display: 'block',
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    legend: {
        display: 'block',
        maxWidth: 400,
        height: 200,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 150,
        margin: 'auto',
    },
    formContainer: {
        display: 'block',
        width: 300,
        height: 400,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: '10%',
        margin: 'auto',
        borderRadius: 20,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `-1px 0px 7px 0px ${theme.palette.primary.main}`,
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: '25px 0 10px 0',
        width: '100%',
        height: 100,

        '& img': {
            width: 'auto',
            height: 100,
        }
    },
    cropForm: {
        display: 'block',
        position: 'relative',
        boxSizing: 'border-box',
        padding: 20,

        '& label': {
            color: '#ffffff !important',
            textAlign: 'center !important',
        }
    }
});