import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const renderRow = (type, value, index) => {
    return (
        <TableRow key={index}>
            <TableCell >{type}</TableCell>
            <TableCell >{value}</TableCell>
        </TableRow>
    );
}


function SimpleTable(props) {
  const { classes } = props;

  let data = (props.data)?(props.data):([]);

  return (
      <Table className={classes.table}>
        
        <TableBody>
            {data.map((row, index) => {return renderRow(row.type, row.value, index)})}            
        </TableBody>
      </Table>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);