import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
    button: {
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 120,
        width: 350,
        fontSize: 30,
        textShadow: '3px 1px 7px rgba(138, 145, 150, 1)',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(6, 38, 91, 3)',
        marginTop: '30px',
        marginLeft: '30px',
    },
};

function ClassNames(props) {
    return (
        <Button value={props.value} variant="contained" color={props.color} style={styles.button} onClick={() => props.onClick()}>
            {props.value}
        </Button>
    );
}

ClassNames.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassNames);