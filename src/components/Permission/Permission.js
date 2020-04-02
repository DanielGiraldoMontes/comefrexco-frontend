import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Switch from '@material-ui/core/Switch';
import swal from 'sweetalert2';
import _ from 'lodash';

// Custom components
import { PermissionStyles } from './Permission.style';
import TabContainer from './TabContainer';
import UtilService from '../../common/js/util.service';
import PermissionService from './Permission.service';

const AMOUNT_ACTIONS_GROUP = 2;

class Permission extends Component {
    
    state = {
        value: 0,
        session: {
            userName: '',
            isAdmin: ''
        },
        permissions: []
    };

    Toast = swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000
    });

    componentWillMount() {
        let session = UtilService.getSession();
        this.setState({ session });
        if (!session) {
            UtilService.closeSession();
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    }

    handleChecked = (permission, group, actionId) => event => {
        let permissions = this.state.permissions;
        // Update action
        let found = _.find(group, {idPermission: actionId});
        found.grante = event.target.checked ? 'TRUE' : 'FALSE';
        // Update permission
        let permissionIndex = _.findIndex(permissions, permission);
        permissions.splice(permissionIndex, 1, permission);

        this.setState({ permissions });
    }

    handleBack = () => {
        this.props.history.push('/user');
    }

    handleSave = () => {
        let request = this.buildRequest();
        let successPermission = (response) => {
            let denied = response[0].status;
            let granted = response[1].status;
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (denied === 200 && granted === 200) {
                this.Toast.fire({
                    type: 'success',
                    title: 'Permisos modificados correctamente'
                });
            } else if (denied === 200 && granted !== 200) {
                this.Toast.fire({
                    type: 'success',
                    title: 'Permisos denegados correctamente'
                });
            }  else if (denied !== 200 && granted === 200) {
                this.Toast.fire({
                    type: 'success',
                    title: 'Permisos aprobados correctamente'
                });
            }
        };
        let errorPermission = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al modificar permisos'
            });
        };
        
        UtilService.storeDispatch('TO_WAIT', { blocking: true });
        PermissionService.multipleRequest([
            PermissionService.denyPermission(request.denied),
            PermissionService.grantePermission(request.granted)
        ]).then(successPermission, errorPermission);
    }

    getPermission = (userName) => {
        let getPermissionSuccess = (response) => {
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            if (response.status === 200) {
                this.buildPermissions(response.data.permissions);
            }
        };
        let getPermissionError = (error) => {
            console.log(error.response);
            UtilService.storeDispatch('TO_WAIT', { blocking: false });
            this.Toast.fire({
                type: 'error',
                title: 'Error al consultar permisos'
              });
        };
        UtilService.storeDispatch('TO_WAIT', { blocking: true });
        PermissionService.getPermission({ userName }).then(getPermissionSuccess, getPermissionError);
    }

    buildPermissions(data) {
        let permissions = [];
        let grouped = _.groupBy(data, 'module');
        const chunk = (target, size) => {
            return target.reduce((memo, value, index) => {
                if (index % (target.length / size) === 0 && index !== 0) memo.push([])
                memo[memo.length - 1].push(value)
                return memo
            }, [[]]);
        };
        _.each(grouped, (actionsList, module) => {
            let actions = chunk(actionsList, AMOUNT_ACTIONS_GROUP);
            permissions.push({ module, actions });
        });

        this.setState({ permissions });
    }

    buildRequest = () => {
        let granted = [];
        let denied = [];
        _.map(this.state.permissions, item => {
            _.map(item.actions, action => {
                let dataTrue = _.filter(action, { grante: 'TRUE' });
                let dataFalse = _.filter(action, { grante: 'FALSE' });
                if (dataTrue.length) {
                    _.each(dataTrue, option => {
                        granted.push(option);
                    })
                }
                if (dataFalse.length) {
                    _.each(dataFalse, option => {
                        denied.push(option);
                    });
                }
            });
        });
        return { granted, denied };
    }

    componentDidMount() {
        let userName = this.props.match.params.userName;
        if (this.props.match.params.userName) {
            this.getPermission(userName);
            this.setState({ session: this.props.match.params });
        }
    }

    render() {
        const { classes } = this.props;
        const { value, session, permissions } = this.state;

        return (
            <div className={classNames(classes.wrapperPermission, { [classes.hide]: _.isEmpty(this.state.session), })}>
                <header className={classes.moduleHeader}>
                    <h1 className={classes.moduleName}>Permisos</h1>
                    <span className={classes.moduleDescription}>Asigna los permisos específicos para el usuario</span>
                    <div className={classes.sessionData}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center" >
                            <Typography component="h6" variant="subtitle1" className={classes.titleSession}>
                                Usuario:
                            </Typography>
                            <Typography component="h6" variant="subtitle2" className={classes.titleSession}>
                                {session.userName}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center" >
                            <Typography component="span" variant="subtitle2" className={classes.typeSession}>
                                {session.isAdmin === 'TRUE' ? 'Administrador' : 'Convencional'}
                            </Typography>
                        </Grid>
                    </div>
                </header>
                <div className={classes.content}>
                    <AppBar position="static" color="default" className={classes.appBar}>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary">
                            {permissions.map(permission => {
                                return(<Tab key={permission.module} label={permission.module} />);
                            })}
                        </Tabs>
                    </AppBar>
                    {permissions.map((permission, index) => {
                        return (
                            <div key={index}>
                                {value === index && (
                                    <TabContainer>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend" className={classes.sectionPermission}>
                                                Asignar permisos
                                                <Typography className={classes.currentModule} component="span" variant="subtitle2">{permission.module}</Typography>
                                            </FormLabel>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="flex-start"
                                                alignItems="center">
                                                    {permission.actions.map((group, index) => {
                                                        return (
                                                            <FormGroup key={index}>
                                                                {group.map(action => {
                                                                    return (
                                                                        <FormControlLabel
                                                                            key={action.idPermission}
                                                                            label={action.permission}
                                                                            control={
                                                                                <Switch
                                                                                    checked={action.grante === 'TRUE' ? true : false}
                                                                                    value={action.permission}
                                                                                    onChange={this.handleChecked(permission, group, action.idPermission)}/>
                                                                            }
                                                                        />
                                                                    )
                                                                })}
                                                            </FormGroup>
                                                        )
                                                    })}
                                            </Grid>
                                        </FormControl>
                                    </TabContainer>
                                )}
                            </div>
                        )
                    })}
                    <MuiDialogActions>
                        <button className="crop-button secondary" type="button" onClick={this.handleBack}>
                            Cancelar
                        </button>
                        <button className="crop-button primary" type="button" onClick={this.handleSave}>
                            Guardar
                        </button>
                    </MuiDialogActions>
                </div>
            </div>
        );
    }
}

Permission.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(PermissionStyles)(Permission));