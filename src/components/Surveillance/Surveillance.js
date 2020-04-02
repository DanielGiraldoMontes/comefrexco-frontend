import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import swal from 'sweetalert2';
import _ from 'lodash';

// Custom components
import { SurveillanceStyles } from './Surveillance.style';
import UtilService from '../../common/js/util.service';
import SurveillanceService from './Surveillance.service';
import EnhancedTable from './EnhancedTable';

class Surveillance extends Component {

    state = {
        data: [],
        session: null,
        selected: null,
        id: 0,
        plaga: '',
        finca: '',
        propietario: '',
        lote: '',
        fecha: '',
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

    handleClickOpen = () => {
        console.log('open event');
    }

    handleClickView = () => {
        console.log('view event');
    }

    handleClickDelete = () => {
        console.log('delete event');
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classNames(classes.wrapperSurveillance, { [classes.hide]: _.isEmpty(this.state.session), })}>
                <div className={classes.content}>
                    <EnhancedTable 
                        data={this.state.data}
                        selected={this.state.selected}
                        handleClickOpen={this.handleClickOpen}
                        handleClickView={this.handleClickView}
                        handleClickDelete={this.handleClickDelete}
                        handleUpdateSelected={this.handleUpdateSelected}>
                    </EnhancedTable>
                </div>
            </div>
        );
    }
}

export default withStyles(SurveillanceStyles)(Surveillance);