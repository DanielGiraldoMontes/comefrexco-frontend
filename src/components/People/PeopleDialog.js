import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

// Custom components
import { DialogStyles } from './People.style';

class PeopleDialog extends Component {

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
                    <Typography variant="h6">{ context.state.id ? 'Editar registro' : 'Nuevo registro' }</Typography>
                    <IconButton aria-label="Close" className={classes.closeButton} onClick={context.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>

                <MuiDialogContent>
                    <form className="crop-form">
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Identificación</label>
                                    <input name='nit' type="text" value={context.state.nit} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Teléfono</label>
                                    <input name='phone' type="text" value={context.state.phone} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Primer nombre</label>
                                    <input name='firstname' type="text" value={context.state.firstname} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Segundo nombre</label>
                                    <input name='middlename' type="text" value={context.state.middlename} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container spacing={16}>
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Primer apellido</label>
                                    <input name='surname' type="text" value={context.state.surname} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="row">
                                    <label>Segundo apellido</label>
                                    <input name='lastname' type="text" value={context.state.lastname} onChange={e => context.handleChange(e)} />
                                </div>
                            </Grid>
                        </Grid>
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

PeopleDialog.propTypes = {
    context: PropTypes.object.isRequired,
};

export default withStyles(DialogStyles)(PeopleDialog);