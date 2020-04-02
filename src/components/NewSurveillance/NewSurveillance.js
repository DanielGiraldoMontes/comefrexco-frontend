import React, { Component, forwardRef } from "react";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Select from '@material-ui/core/Select';
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import swal from 'sweetalert2';
import _ from 'lodash';

// Custom components
import { NewSurveillanceStyles, CropInput } from './NewSurveillance.style';
import ForeignDialog from './ForeignDialog';
import UtilService from '../../common/js/util.service';
import NewSurveillanceService from './NewSurveillance.service';

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
    { label: 'Argentina' },
    { label: 'Armenia' },
    { label: 'Aruba' },
    { label: 'Australia' },
    { label: 'Austria' },
    { label: 'Azerbaijan' },
    { label: 'Bahamas' },
    { label: 'Bahrain' },
    { label: 'Bangladesh' },
    { label: 'Barbados' },
    { label: 'Belarus' },
    { label: 'Belgium' },
    { label: 'Belize' },
    { label: 'Benin' },
    { label: 'Bermuda' },
    { label: 'Bhutan' },
    { label: 'Bolivia, Plurinational State of' },
    { label: 'Bonaire, Sint Eustatius and Saba' },
    { label: 'Bosnia and Herzegovina' },
    { label: 'Botswana' },
    { label: 'Bouvet Island' },
    { label: 'Brazil' },
    { label: 'British Indian Ocean Territory' },
    { label: 'Brunei Darussalam' },
];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
}

function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
}

function getSuggestions(value, { showEmpty = false } = {}) {
    const inputValue = _.deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0 && !showEmpty
        ? []
        : suggestions.filter(suggestion => {
            const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
            count += 1;
            }

            return keep;
        });
}

class NewSurveillance extends Component {

    state = {
        session: null,
        open: false,
        id: 0,
        tree: '',
        plague: '',
        owner: '',
        farm: '',
        lot: '',
        dialog: '',
        selectedDay: '',
        amountFruit: 0,
        amountFlower: 0,
        damageFruit: false,
        damageFlower: false,
        damageBranch: false,
        damageStem: false,
        damageFly: false,
        damageMite: false,
        damageParasite: false,
        damagePhytophotora: false,
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

    handleOnSelected = (selected, name) => {
        this.setState({
            [name]: selected
        })
    }

    handleOpen = (e) => {
        console.log(e.target.name);
        this.setState({ dialog: e.target.name, open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        this.setState({
          selectedDay,
          isEmpty: !input.value.trim(),
          isValidDay: typeof selectedDay !== 'undefined',
          isDisabled: modifiers.disabled === true,
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = name => event => {
        this.setState({ 
            [name]: event.target.checked 
        })
    }

    handleSave = () => {
        console.log(this.state);
    }

    render() {
        const { classes } = this.props;
        const inputPicker = forwardRef((props, ref) => {
            return <input {...props} ref={ref} className={classes.datePicker} />
        })

        return (
            <div className={classNames(classes.wrapperNewSurveillance, { [classes.hide]: _.isEmpty(this.state.session), })}>
                <ForeignDialog context={this}></ForeignDialog>
                <header className={classes.moduleHeader}>
                    <h1 className={classes.moduleName}>Nuevo monitoreo</h1>
                    <span className={classes.moduleDescription}>Registro de información de inspecciones y aplicaciones a los cultivos.</span>
                </header>
                <div className={classes.content}>
                    <form className="crop-form">
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center" >

                            <Grid item xs={2}>
                                <div className="row">
                                    <label>Fecha</label>
                                    <DayPickerInput
                                        format={'DD/MM/YYYY'}
                                        placeholder={'DD/MM/YYYY'}
                                        component={inputPicker}
                                        onDayChange={this.handleDayChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="row">
                                    <label>Id Arbol</label>
                                    <input name='tree' type="text" value={this.state.tree} onChange={e => this.handleChange(e)} />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="row">
                                    <label>Plaga</label>
                                    <Downshift 
                                        id="plague"
                                        itemToString={item => (item ? item.label : '')}
                                        onChange={e => this.handleOnSelected(e, 'plague')} >
                                            {({
                                            getInputProps,
                                            getItemProps,
                                            getLabelProps,
                                            getMenuProps,
                                            highlightedIndex,
                                            inputValue,
                                            isOpen,
                                            selectedItem,
                                            }) => {
                                            const { onBlur, onFocus, ...inputProps } = getInputProps({
                                                placeholder: 'Buscar plaga'
                                            });

                                            return (
                                                <div className={classes.container}>
                                                    {renderInput({
                                                        fullWidth: true,
                                                        classes,
                                                        InputLabelProps: getLabelProps({ shrink: true }),
                                                        InputProps: { onBlur, onFocus },
                                                        inputProps,
                                                    })}

                                                    <div {...getMenuProps()}>
                                                        {isOpen ? (
                                                        <Paper className={classes.paper} square>
                                                            {getSuggestions(inputValue).map((suggestion, index) =>
                                                            renderSuggestion({
                                                                suggestion,
                                                                index,
                                                                itemProps: getItemProps({ item: suggestion }),
                                                                highlightedIndex,
                                                                selectedItem,
                                                            }),
                                                            )}
                                                        </Paper>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Downshift>
                                </div>
                            </Grid>

                            <Grid item xs={2}>
                                <div className="row">
                                    <label>
                                        Usuario
                                        <button name="adduser" type="button" onClick={e => this.handleOpen(e)}>+</button>
                                    </label>
                                    <input name='owner' type="text" value={this.state.owner} onChange={e => this.handleChange(e)} />
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="row">
                                    <label>Finca</label>
                                    <Select
                                        value={this.state.farm}
                                        onChange={this.handleChange}
                                        input={<CropInput name="farm" />} >

                                        <MenuItem value="{id: 1, name: 'Finca 1'}">Finca 1</MenuItem>
                                        <MenuItem value="{id: 2, name: 'Finca 2'}">Finca 2</MenuItem>
                                    </Select>
                                </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div className="row">
                                    <label>Lote</label>
                                    <input name='lot' type="text" value={this.state.lot} onChange={e => this.handleChange(e)} />
                                </div>
                            </Grid>
                        </Grid>
                        
                        <div className={classes.wrapperOptions}>
                            <Grid
                                xs={12}
                                item={true}
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center" >
                                    
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        label="Daño en ramas"
                                        control={
                                            <Switch checked={this.state.damageBranch} onChange={this.handleCheck('damageBranch')} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        label="Pasador de tallo"
                                        control={
                                            <Switch checked={this.state.damageStem} onChange={this.handleCheck('damageStem')}/>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        label="Mosca de tallo"
                                        control={
                                            <Switch checked={this.state.damageFly} onChange={this.handleCheck('damageFly')} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        label="Ácaros"
                                        control={
                                            <Switch checked={this.state.damageMite} onChange={this.handleCheck('damageMite')} />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControlLabel
                                        label="Planta parásita"
                                        control={
                                            <Switch checked={this.state.damageParasite} onChange={this.handleCheck('damageParasite')} />
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                xs={12}
                                item={true}
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center" >

                                <Grid item xs={2}>
                                    <FormControlLabel
                                        label="Phytophotora"
                                        control={
                                            <Switch checked={this.state.damagePhytophotora} onChange={this.handleCheck('damagePhytophotora')} />
                                        }
                                    />
                                </Grid>
                                <Grid
                                    xs={4}
                                    item={true}
                                    container
                                    direction="row" 
                                    alignItems="center" >
                                    
                                    <FormControlLabel
                                        className={classes.label}
                                        label="Daño en frutas"
                                        control={
                                            <Switch checked={this.state.damageFruit} onChange={this.handleCheck('damageFruit')} />
                                        }
                                    />
                                    <label className={classes.label}>¿cuantos?</label>
                                    <input name='amountFruit' type="number" className={classes.amount} value={this.state.amountFruit} onChange={e => this.handleChange(e)} />
                                </Grid>
                                <Grid
                                    xs={4}
                                    item={true}
                                    container
                                    direction="row" 
                                    alignItems="center" >
                                    
                                    <FormControlLabel
                                        className={classes.label}
                                        label="Daño inflorecencia"
                                        control={
                                            <Switch checked={this.state.damageFlower} onChange={this.handleCheck('damageFlower')} />
                                        }
                                    />
                                    <label className={classes.label}>¿cuantos?</label>
                                    <input name='amountFlower' type="number" className={classes.amount} value={this.state.amountFlower} onChange={e => this.handleChange(e)} />
                                </Grid>
                            </Grid>                 
                        
                        </div>

                        <MuiDialogActions>
                            <button className="crop-button secondary" type="button">
                                Cancelar
                            </button>
                            <button className="crop-button primary" type="button" onClick={this.handleSave}>
                                Guardar
                            </button>
                        </MuiDialogActions>
                    </form>
                </div>
            </div>
        );
    }
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

export default withStyles(NewSurveillanceStyles)(NewSurveillance);