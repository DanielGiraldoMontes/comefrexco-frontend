import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// Custom components
import { DialogStyles, CropInput } from './User.style';

class UserDialog extends Component {

    render() {
        const { classes, context } = this.props;

        return (
            <Dialog
                maxWidth="md"
                fullWidth={true}
                onClose={context.handleClose}
                open={context.state.open}
                aria-labelledby="customized-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown>

                <MuiDialogTitle disableTypography className={classes.title}>
                    <Typography variant="h6">{ context.state.id && !context.state.isRestoringPassword ? 'Editar registro' : (context.state.id && context.state.isRestoringPassword ? 'Cambiar contraseña' : 'Nuevo registro') }</Typography>
                    <IconButton aria-label="Close" className={classes.closeButton} onClick={context.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>

                <MuiDialogContent>
                    <form className="crop-form">
                        <Grid container spacing={16}>
                            {
                                !context.state.isRestoringPassword && (
                                    <Grid item xs={6}>
                                        <div className="row">
                                            <label>Nombre</label>
                                            <input name='name' type="text" value={context.state.name} onChange={e => context.handleChange(e)} />
                                        </div>
                                    </Grid>
                                )
                            }
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Usuario</label>
                                    <input name='userName' type="text" value={context.state.userName} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                        </Grid>
                        {
                            (!context.state.id || (context.state.id && context.state.isRestoringPassword)) && (
                                <Grid container spacing={16}>
                                    <Grid item xs={6}>
                                        <div className="row">
                                            <label>Contraseña</label>
                                            <input name='password' type="password" value={context.state.password} onChange={e => context.handleChange(e)} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="row">
                                            <label>Confirmar contraseña</label>
                                            <input name='repeatPassword' type="password" value={context.state.repeatPassword} onChange={e => context.handleChange(e)} />
                                        </div>
                                    </Grid>
                                </Grid>
                            )
                        }
                        {
                            !context.state.isRestoringPassword && (
                                <Grid container spacing={16}>
                                    <Grid item xs={6}>
                                        <div className="row">
                                            <label>Administrador</label>
                                            <Select
                                                value={context.state.isAdmin}
                                                onChange={context.handleChange}
                                                input={<CropInput name="isAdmin" />} >

                                                <MenuItem value="TRUE">Si</MenuItem>
                                                <MenuItem value="FALSE">No</MenuItem>
                                            </Select>
                                        </div>
                                    </Grid>
                                    {
                                        context.state.id ? (
                                            <Grid item xs={6}>
                                                <div className="row">
                                                    <a href="/" className={classes.linkChangePassword} onClick={context.handleModeChangePassword}>Cambiar contraseña</a>
                                                </div>
                                            </Grid>
                                        ) : (null)
                                    }
                                </Grid>
                            )
                        }
                    </form>
                </MuiDialogContent>
                <MuiDialogActions className={classes.actions}>
                    <button className="crop-button secondary" type="button" onClick={context.handleClose}>
                        Cancelar
                    </button>
                    <button className="crop-button primary" type="button" onClick={context.handleSave} >
                        Guardar
                    </button>
                </MuiDialogActions>
            </Dialog>
        );
    }
}

// Interface
UserDialog.propTypes = {
    context: PropTypes.object.isRequired,
};

export default withStyles(DialogStyles)(UserDialog);