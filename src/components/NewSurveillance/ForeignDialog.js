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
import { DialogStyles } from './NewSurveillance.style';
import People from '../People/People';

class ForeignDialog extends Component {

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

                <MuiDialogContent>
                    { context.state.dialog === 'adduser' ? (<People></People>) : ('Nueva plaga') }
                </MuiDialogContent>

            </Dialog>
        );
    }
}

ForeignDialog.propTypes = {
    context: PropTypes.object.isRequired,
};

export default withStyles(DialogStyles)(ForeignDialog);