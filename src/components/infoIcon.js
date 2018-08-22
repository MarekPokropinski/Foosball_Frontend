import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
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
function chooseIcon(props) {
    const { classes } = props;

    switch(props.iconType) {
        case '0':
            return <CheckCircleIcon className={classes.chceck} />
        case '1':
            return <WarningIcon className={classes.warning} />
        case '-1':
            return <ErrorIcon className={classes.error} />
        default:
            return <span/>
    }
}
function InfoIcon(props) {
  return (
    chooseIcon(props)
  );
}

InfoIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoIcon);