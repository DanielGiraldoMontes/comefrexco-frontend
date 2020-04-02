import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

// Custom components
import { ToolbarStyles } from './People.style';

class EnhancedTableToolbar extends Component {

    render() {
        const { selected, classes, openDialog, openDialogEdit, onDeleteItem } = this.props;

        return (
            <Toolbar className={classNames(classes.root, { [classes.highlight]: !!selected, })} >
                <div className={classes.title}>
                    <Typography component="h6" variant="h6" id="tableTitle" className={classes.moduleName}>
                        Personas
                    </Typography>
                    <Typography component="span" variant="subtitle2" className={classes.descriptionModule}>
                        En este módulo podrás encontrar todo lo relacionado con los propietarios de los cultivos
                    </Typography>
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {!!selected ? (
                        <Grid
                            container
                            wrap="nowrap"
                            direction="row"
                            justify="center"
                            alignItems="center" >

                            <Tooltip title="Eliminar">
                                <IconButton aria-label="Eliminar" onClick={onDeleteItem}>
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Editar">
                                <IconButton aria-label="Editar" onClick={openDialogEdit}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    ) : (
                            <Tooltip title="Nuevo">
                                <IconButton aria-label="Nuevo" onClick={openDialog} >
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                </div>
            </Toolbar>
        );
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.object,
};

export default withStyles(ToolbarStyles)(EnhancedTableToolbar);