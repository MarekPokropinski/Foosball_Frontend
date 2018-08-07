import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';

class GameComponent extends React.Component {

    handleExitButton() {
        this.props.history.replace('/')
    }

    render() {
        return (
            <div style={{textAlign: 'center'}} >
                10:00<br />
                0:0<br />
                <Button  variant='contained' color='secondary' onClick={() => this.handleExitButton()}> Exit game </Button>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}


export default connect(mapDispatchToProps, mapStateToProps)(GameComponent);