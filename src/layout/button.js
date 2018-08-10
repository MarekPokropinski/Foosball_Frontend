import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
    button: {
        background: 'linear-gradient(45deg, #ffaf23 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 68,
        width: 250,
        fontSize: 30,
        textShadow: '3px 1px 7px rgba(138, 145, 150, 1)',
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        marginTop: '30px',
    },
};

function ClassNames(props) {
    return (
        <Button value={props.value} style={styles.button} onClick={() => props.onClick()}>
            {props.value}
        </Button>
    );
}

ClassNames.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassNames);