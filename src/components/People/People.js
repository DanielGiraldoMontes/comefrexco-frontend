import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from 'sweetalert2';
import _ from 'lodash';

// Custom components
import { PeopleStyles } from './People.style';
import UtilService from '../../common/js/util.service';
import PeopleService from './People.service';
import PeopleDialog from './PeopleDialog';
import EnhancedTable from './EnhancedTable';

class People extends Component {
  
    state = {
        data: [],
        session: null,
        selected: null,
        id: 0,
        nit: '',
        firstname: '',
        middlename: '',
        surname: '',
        lastname: '',
        phone: '',
        open: false,
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
                this.setState({ data: response.data.personas });
            } else {
                this.Toast.fire({
                    type: 'warning',
                    title: 'Ocurrió un problema durante la carga de las personas'
                });
            }
        };
        let listError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al cargar lista de personas'
            });
        };
        UtilService.storeDispatch('TO_WAIT', { blocking: true });
        PeopleService.toList().then(listSuccess, listError);
    }

    handleSave = () => {
        let params = {
            id: this.state.id,
            nit: this.state.nit,
            nombre1: this.state.firstname,
            nombre2: this.state.middlename,
            apellido1: this.state.surname,
            apellido2: this.state.lastname,
            telefono: this.state.phone
        };

        let saveSuccess = (response) => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (response.status === 200) {
                let action = 'creada';
                if (this.state.id) {
                    action = 'editada';
                    this.updateEditedRow(params);
                }
                this.cleanFields();
                this.setState({ open: false, selected: null });
                this.Toast.fire({
                    type: 'success',
                    title: 'Persona ' + action + ' correctamente'
                });
            } else {
                this.Toast.fire({
                    type: 'warning',
                    title: 'Ocurrió un error durante la creación de la persona'
                });
            }
        };

        let saveError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al crear la persona'
              });
        };

        UtilService.storeDispatch('TO_WAIT', { blocking: true });
        if (params.id) {
            PeopleService.toEdit(params).then(saveSuccess, saveError);
        } else {
            PeopleService.toSave(params).then(saveSuccess, saveError);
        }
    }

    handleClickEdit = () => {
        let item = this.state.selected;
        this.setState({ 
            open: true,
            id: item.id,
            nit: item.nit,
            firstname: item.nombre1,
            middlename: item.nombre2,
            surname: item.apellido1,
            lastname: item.apellido2,
            phone: item.telefono,
        });
    }

    handleClickDelete = () => {
        let params = this.state.selected;
        let deleteSuccess = (response) => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (response.status === 200) {
                this.updateEditedRow(params);
                this.setState({ open: false, selected: null });
                this.Toast.fire({
                    type: 'success',
                    title: 'Persona eliminada correctamente'
                });
            } else {
                this.Toast.fire({
                    type: 'warning',
                    title: 'Ocurrió un error durante la creación de la persona'
                });
            }
        };
        let deleteError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al eliminar persona'
              });
        };

        UtilService.confirmationDelete().then(() => {
            UtilService.storeDispatch('TO_WAIT', { blocking: true });
            PeopleService.toDelete(params).then(deleteSuccess, deleteError);
        });
    }

    handleUpdateSelected = (selected) => {
        this.setState({
            selected: selected
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateEditedRow = (editedItem) => {
        let data = this.state.data;
        let index = _.findIndex(data, {id: editedItem.id});
        data.splice(index, 1, editedItem);
        this.setState({ data: data });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false, selected: null });
        this.cleanFields();
    }

    cleanFields = () => {
        this.setState({
            id: 0,
            nit: '',
            firstname: '',
            middlename: '',
            surname: '',
            lastname: '',
            phone: ''
        });
    }

    render() {
        const { classes, mode } = this.props;
        if (mode === 'new') {
            // this.setState({ open: true });
        }
        return (
            <div className={classNames(classes.wrapperPeople, { [classes.hide]: _.isEmpty(this.state.session), })}>
                <PeopleDialog context={this}></PeopleDialog>
                <div className={classes.content}>
                    <EnhancedTable 
                        data={this.state.data}
                        selected={this.state.selected}
                        handleClickOpen={this.handleClickOpen}
                        handleClickEdit={this.handleClickEdit}
                        handleClickDelete={this.handleClickDelete}
                        handleUpdateSelected={this.handleUpdateSelected}>
                    </EnhancedTable>
                </div>
            </div>
        );
    }
}

export default withStyles(PeopleStyles)(People);