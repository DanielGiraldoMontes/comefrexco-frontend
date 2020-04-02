import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert2';

// Custom components
import { LoginStyles } from './Login.style';
import UtilService from '../../common/js/util.service';
import logo from '../../images/leaf.svg';
import LoginService from './Login.service'

class Login extends Component {

    state = {
        session: null,
        username: '',
        password: ''
    };

    Toast = swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
    });

    componentWillMount() {
        if (UtilService.getSession()) {
            this.props.history.push('/surveillance/new');
        } else {
            UtilService.closeSession();
        }
    }

    handleClick = () => {
        if (this.state.username && this.state.password) {
            let props = this.props;
            let params = {
                username: this.state.username,
                password: this.state.password
            };
            let loginSuccess = (response) => {
                UtilService.storeDispatch('TO_WAIT', { blocking: false });
                if (response.status === 200) {
                    localStorage.setItem('session', JSON.stringify(response.data));
                    UtilService.storeDispatch('DO_LOGIN', { session: response.data });
                    props.history.push('/surveillance/new');
                } else {
                    this.Toast.fire({
                        type: 'error',
                        title: 'Error de acceso usuario y/o contraseña'
                    });
                }
            };
            let loginError = (error) => {
                UtilService.storeDispatch('TO_WAIT', { blocking: false });
                this.Toast.fire({
                    type: 'error',
                    title: 'Error de acceso'
                });
            };
            UtilService.storeDispatch('TO_WAIT', { blocking: true });
            LoginService.login(params).then(loginSuccess, loginError);
        } else {
            this.Toast.fire({
                type: 'warning',
                title: 'Los campos usuario y contraseña son requeridos'
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrapperLogin}>
                <div className={classes.formContainer}>
                    <div className={classes.logo}>
                        <img src={logo} alt="logo" />
                    </div>
                    <form className={`crop-form ${classes.cropForm}`}>
                        <div className="row">
                            <label>Usuario</label>
                            <input name='username' type="text" value={this.state.username} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="row">
                            <label>Contraseña</label>
                            <input name="password" type="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                        </div>
                        <div className="row command">
                            <button className="crop-button primary" type="button" onClick={this.handleClick} >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withStyles(LoginStyles)(Login);