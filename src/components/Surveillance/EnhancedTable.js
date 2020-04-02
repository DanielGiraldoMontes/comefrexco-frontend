import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// Fragments table component
import { TableStyles } from './Surveillance.style'; 
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';


function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTable extends Component {

    state = {
        order: 'desc',
        orderBy: 'id',
        page: 0,
        rowsPerPage: 5
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleClick = (event, item) => {
        const { selected, handleUpdateSelected } = this.props;
        if (selected === item) {
            handleUpdateSelected(null);
        } else {
            handleUpdateSelected(item);
        }
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes, data, selected, handleClickOpen, handleClickView, handleClickDelete } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar 
                    selected={selected}
                    openDialog={handleClickOpen} 
                    openDialogEdit={handleClickView}
                    onDeleteItem={handleClickDelete}>
                </EnhancedTableToolbar>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            selected={selected}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = n === selected;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n)}
                                            role="checkbox"
                                            className={classes.tableRow}
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected} >

                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.id}
                                            </TableCell>
                                            <TableCell align="left">{n.plaga}</TableCell>
                                            <TableCell align="left">{n.finca}</TableCell>
                                            <TableCell align="left">{n.propietario}</TableCell>
                                            <TableCell align="left">{n.lote}</TableCell>
                                            <TableCell align="right">{n.fecha}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    selected: PropTypes.object,
    handleClickOpen: PropTypes.func.isRequired,
    handleClickView: PropTypes.func.isRequired,
    handleUpdateSelected: PropTypes.func.isRequired
};
export default withStyles(TableStyles)(EnhancedTable);