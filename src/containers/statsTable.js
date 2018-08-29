import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

let counter = 0;

let playerNone = {
    nick: "RElik",
    normalGames: 23,
    normalWinRatio: 69,
    rankedSoloGames: 12,
    rankedSoloWinRatio: 21,
    rankedDuoGames: 78,
    rankedDuoWinRatio: 20,
    soloRankingPos: 1,
    duoRankingPos: 1,
}
const style = {
    cell: {
        fontSize: 30,
        fontWeight: 'light',
        color: 'black',
    },
    nick: {
        fontSize: 30,
        fontWeight: 'light',
        color: '#000d23',    
    },
    head: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
}

function createPlayerData(player) {
    counter += 1;
    return {
        id: counter,
        nick: player.nick,
        normalGames: player.normalGames,
        normalWinRatio: player.normalWinRatio,
        rankedSoloGames: player.rankedSoloGames,
        rankedSoloWinRatio: player.rankedSoloWinRatio,
        rankedDuoGames: player.rankedDuoGames,
        rankedDuoWinRatio: player.rankedDuoWinRatio,
        soloRankingPos: player.soloRankingPos,
        duoRankingPos: player.duoRankingPos,
    };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
let rankedRows = [
    { id: 'nick', numeric: false, disablePadding: true, label: 'Nick' },
    { id: 'duoRankingPos', numeric: true, disablePadding: false, label: 'Position' },
    { id: 'rankedDuoGames', numeric: true, disablePadding: false, label: 'Games Played' },
    { id: 'rankedDuoWinratio', numeric: true, disablePadding: false, label: 'Win Ratio (%)' },
];

let rowsNormal = [
    { id: 'nick', numeric: false, disablePadding: true, label: 'Nick' },
    { id: 'normalGames', numeric: true, disablePadding: false, label: 'Games Played' },
    { id: 'normalWinRatio', numeric: true, disablePadding: false, label: 'Win Ratio (%)' },
];
function printTableRows(type) {
    switch (type) {
        case 'normal':
            return rowsNormal
        default:
            return rankedRows
    }
}

class EnhancedTableHead extends React.Component {

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };


    render() {
        const { order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox" />
                    {printTableRows(this.props.typeOfContent).map(row => {
                        return (
                            <TableCell
                                style={style.head}
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 400,
        maxWidth: '10%',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class EnhancedTable extends React.Component {

    printUsers() {
        if (this.props.users == null || !this.props.users.length) {
            return [createPlayerData(playerNone)];
        }
        
        return this.props.users.map((user) => {
            return (
                createPlayerData(user)
            )
        })
    }
    state = {
        order: 'asc',
        orderBy: 'Nick',
        selected: [],
        data: this.printUsers(),
        page: 0,
        rowsPerPage: 5,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    printTableCell(object, type) {
        switch (type) {
            case 'normal':
                return [
                    <TableCell style={style.cell} numeric key="normalGames">{object.normalGames}</TableCell>,
                    <TableCell style={style.cell} numeric key="normalWinRatio">{object.normalWinRatio}</TableCell>
                ]
            case 'rankedSolo':
                return [
                    <TableCell style={style.cell} numeric key="soloRankingPos">{object.soloRankingPos}</TableCell>,
                    <TableCell style={style.cell} numeric key="rankedSoloGames">{object.rankedSoloGames}</TableCell>,
                    <TableCell style={style.cell} numeric key="rankedSoloWinRatio">{object.rankedSoloWinRatio}</TableCell>
                ]
            case 'rankedDuo':
                return [
                    <TableCell style={style.cell} numeric key="duoRankingPos">{object.duoRankingPos}</TableCell>,
                    <TableCell style={style.cell} numeric key="rankedDuoGames">{object.rankedDuoGames}</TableCell>,
                    <TableCell style={style.cell} numeric key="rankedDuoWinRatio">{object.rankedDuoWinRatio}</TableCell>
                ]
            default:
                return [
                    <TableCell numeric>0</TableCell>,
                ]
        }

    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root} >
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            typeOfContent={this.props.typeOfContent}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={n.id}
                                        >
                                            <TableCell padding="checkbox" />
                                            <TableCell component="th" scope="row" padding="none" style={style.nick}>
                                                {n.nick}
                                            </TableCell>
                                            {this.printTableCell(n, this.props.typeOfContent)}

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
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
};

export default withStyles(styles)(EnhancedTable);