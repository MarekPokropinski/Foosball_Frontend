import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Status from './status'
import StatisticsMenu from '../containers/statisticsMenu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  navBar: {
    height: '10%',
    backgroundColor: '#000',
    color: 'white'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  image: {
    width: '15%',
    height: '90%',
    float: 'right',
    borderRadius: 5,
  },
  imageDiv: {
    height: '100%',
  },
  error: {
    color: 'red',
    float: 'right',
  },
  warning: {
    color: 'yellow',
    float: 'right',
  },
  chceck: {
    color: '#0adb45',
    float: 'right',
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      
      <AppBar position="static" color='primary' >
        <Toolbar className={classes.navBar}>
          <StatisticsMenu open = {false}/>
          <Typography variant="title" color="inherit" className={classes.flex}>
            FOOSBALL
          </Typography>

          <div className={classes.imageDiv}>

            <img alt="Logo" src={require('../images/ncdc3.png')} title="ncdc_logo" className={classes.image} />
            <Status />
          </div>
        </Toolbar>

      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);