import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/userActions.js';

import Button from '@material-ui/core/Button';


class App extends React.Component {

    handleNormalUser() {
        this.props.history.replace('/begin')
    }

    handleRankedUsers() {
      this.props.history.replace("/mode");
    }
    
    render() {
        return (
            <div>
                <Button variant='contained' color='primary' onClick={() => { this.handleNormalUser() }} >normal</Button>
                <br />
                <br />
                <Button value='ranked' variant='contained' color='primary' onClick={() => { this.handleRankedUsers() }} >ranked</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);