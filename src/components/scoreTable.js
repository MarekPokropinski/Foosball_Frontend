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
    color: 'white',
    minWidth: 700,
    fontSize: '70px',
  },
});

const renderRow = (type, value, index) => {
    return (
        <TableRow key={index}>
            <TableCell ><span style={{fontSize: '20px', fontWeight: 'bold'}}>{type}</span></TableCell>
            <TableCell ><span style={{fontSize: '20px', fontWeight: 'bold'}}>{value}</span></TableCell>
        </TableRow>
    );
}


function SimpleTable(props) {
  const { classes } = props;

  let data = (props.data)?(props.data):([]);

  return (
      <Table className={classes.table}>
        
        <TableBody style={{color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            {data.map((row, index) => {return renderRow(row.type, row.value, index)})}            
        </TableBody>
      </Table>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);