import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  navBar: {
    height: '10%',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color:'white'
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
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color='primary' >
        <Toolbar className={classes.navBar}>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            FOOSBALL
          </Typography>
          <div className={classes.imageDiv}>
            <img alt="Logo" src={require('../images/ncdc3.png')} title="ncdc_logo" className={classes.image} />
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