import React, { Component } from "react";
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const headers = [
    { id: 'id', numeric: false, disablePadding: true, label: 'Id' },
    { id: 'nit', numeric: true, disablePadding: false, label: 'Nit' },
    { id: 'nombre1', disablePadding: false, label: 'Primer nombre' },
    { id: 'nombre2', disablePadding: false, label: 'Segundo nombre' },
    { id: 'apellido1', disablePadding: false, label: 'Primer apellido' },
    { id: 'apellido2', disablePadding: false, label: 'Segundo apellido' },
    { id: 'telefono', numeric: true, disablePadding: false, label: 'Teléfono' },
];

class EnhancedTableHead extends Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    {headers.map(
                        head => (
                            <TableCell
                                key={head.id}
                                align={head.numeric ? 'right' : 'left'}
                                padding={head.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === head.id ? order : false} >
                                <Tooltip
                                    title="Sort"
                                    placement={head.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300} >
                                    <TableSortLabel
                                        active={orderBy === head.id}
                                        direction={order}
                                        onClick={this.createSortHandler(head.id)} >
                                        {head.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        ),
                        this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;