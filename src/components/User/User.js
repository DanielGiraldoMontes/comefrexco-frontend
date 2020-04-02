import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from 'sweetalert2';
import _ from 'lodash';

// Custom components
import { UserStyles } from './User.style';
import UtilService from '../../common/js/util.service';
import UserService from './User.service';
import UserDialog from './UserDialog';
import EnhancedTable from './EnhancedTable';

class User extends Component {
  
    state = {
        data: [],
        session: null,
        selected: null,
        id: 0,
        name: '',
        password: '',
        repeatPassword: '',
        userName: '',
        isAdmin: '',
        open: false,
        isRestoringPassword: false,
    };

    Toast = swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
    });

    constructor(props) {
        super(props);
        this.getList();
    }

    componentWillMount() {
        let session = UtilService.getSession();
        this.setState({ session });
        if (!session) {
            UtilService.closeSession();
        }
    }

    getList = () => {
        let listSuccess = (response) => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (response.status === 200) {
                this.setState({ data: response.data.users });
            } else {
                this.Toast.fire({
                    type: 'warning',
                    title: 'Ocurrió un problema durante la carga de los usuarios'
                });
            }
        };
        let listError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al cargar lista de usuarios'
            });
        };
        UtilService.storeDispatch('TO_WAIT', { blocking: true });
        UserService.toList().then(listSuccess, listError);
    }

    handleSave = () => {
        let operation;
        let params = {
            nombre: this.state.name,
            password: this.state.password,
            userName: this.state.userName,
            isAdmin: this.state.isAdmin
        };
        let saveSuccess = (response) => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (response.status === 200) {
                switch (operation.type) {
                    // Edit user
                    case 1:
                        this.updateEditedRow(params);
                        break;
                    // New user
                    case 0:
                        this.addNewRow(response.data.user);
                        break;
                    default:
                        console.log('Operación no válida');
                        break;
                }
                this.cleanFields();
                this.setState({ open: false, selected: null });
                this.Toast.fire({
                    type: 'success',
                    title: operation.successMessage
                });
            } else {
                this.Toast.fire({
                    type: 'warning',
                    title: operation.errorMessage
                });
            }
        };
        let saveError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: operation.errorMessage
            });
        };
        let passwordComparisonMessage = () => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'La contraseña no coincide con la confirmación'
            });
        };
        if (this.state.id && !this.state.isRestoringPassword) {
            operation = {
                type: 1,
                successMessage: 'Usuario editado correctamente',
                errorMessage: 'Error al editar el usuario',
            }
        }
        else if (this.state.id && this.state.isRestoringPassword) {
            operation = {
                type: 2,
                successMessage: 'Contraseña actualizada correctamente',
                errorMessage: 'Error al actualizar la contraseña',
            }
        }
        else if (!this.state.id && !this.state.isRestoringPassword) {
            operation = {
                type: 0,
                successMessage: 'Usuario creado correctamente',
                errorMessage: 'Error al crear el usuario',
            }
        }
        UtilService.storeDispatch('TO_WAIT', { blocking: true });
        switch (operation.type) {
            // Edit user
            case 1:
                UserService.toEdit(params).then(saveSuccess, saveError);
                break;
            // Change password
            case 2:
                if (this.state.password === this.state.repeatPassword) {
                    delete params.nombre;
                    delete params.isAdmin;
                    UserService.toChangePassword(params).then(saveSuccess, saveError);
                } else {
                    passwordComparisonMessage();
                }
                break;
            // New user
            case 0:
                if (this.state.password === this.state.repeatPassword) {
                    UserService.toSave(params).then(saveSuccess, saveError);
                } else {
                    passwordComparisonMessage();
                }
                break;
            default:
                console.log('Operación no válida');
                break;
        }
    }

    handleClickEdit = () => {
        let item = this.state.selected;

        this.setState({
            open: true,
            id: new Date().getTime(),
            name: item.nombre,
            userName: item.userName,
            password: '',
            repeatPassword: '',
            isAdmin: item.isAdmin
        });
    }

    handleClickDelete = () => {
        let params = this.state.selected;
        let saveSuccess = (response) => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (response.status === 200) {
                this.updateEditedRow(params);
                this.setState({ open: false, selected: null });
                this.Toast.fire({
                    type: 'success',
                    title: 'Usuario eliminado correctamente'
                });
            } else {
                this.Toast.fire({
                    type: 'warning',
                    title: 'Ocurrió un error durante la creación del usuario'
                });
            }
        };
        let saveError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al eliminar usuario'
              });
        };
        
        UtilService.confirmationDelete().then(() => {
            UtilService.storeDispatch('TO_WAIT', { blocking: true });
            UserService.toDelete(params).then(saveSuccess, saveError);
        });
    }

    handleClickPermission = () => {
        let permissionData = this.state.selected;
        this.props.history.push('/user/permission/' + permissionData.userName + '/' + permissionData.isAdmin);
        setTimeout(()=> {
            if (permissionData) {
                UtilService.storeDispatch('PERMISSION_DATA', { permissionData });
            }
        });
    }

    handleUpdateSelected = (selected) => {
        this.setState({
            selected: selected
        });
    }

    handleModeChangePassword = (event) => {
        event.preventDefault();
        this.setState({
            isRestoringPassword: true
        });
    }

    addNewRow = (addedItem) => {
        let data = this.state.data;
        if (_.isArray(addedItem)) {
            data = _.merge(data, addedItem);
        } else {
            data.push(addedItem);
        }
        this.setState({ data: data });
    }

    updateEditedRow = (editedItem) => {
        let data = this.state.data;
        let index = _.findIndex(data, {userName: editedItem.userName});
        data.splice(index, 1, editedItem);
        this.setState({ data: data });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickOpen = () => {
        this.cleanFields();
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false, selected: null });
        this.cleanFields();
    }

    cleanFields = () => {
        this.setState({
            id: 0,
            name: '',
            password: '',
            repeatPassword: '',
            userName: '',
            isAdmin: '',
            isRestoringPassword: false,
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classNames(classes.wrapper, { [classes.hide]: _.isEmpty(this.state.session), })}>
                <UserDialog context={this}></UserDialog>
                <div className={classes.content}>
                    <EnhancedTable
                        data={this.state.data}
                        selected={this.state.selected}
                        handleClickOpen={this.handleClickOpen}
                        handleClickEdit={this.handleClickEdit}
                        handleClickDelete={this.handleClickDelete}
                        handleClickPermission={this.handleClickPermission}
                        handleUpdateSelected={this.handleUpdateSelected}>
                    </EnhancedTable>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(UserStyles)(User));