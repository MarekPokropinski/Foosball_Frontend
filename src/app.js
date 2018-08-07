import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/userActions.js';


class App extends React.Component {

    handleNormalUser() {
        //this.props.history.replace('/create')
    }

    handleRankedUsers() {
      //TODO
    }

    render() {
        return (
            <div>
                <Button value='normal' variant='contained' color='primary' onClick={() => { this.handleNormalUser() }} />
                <br />
                <br />
                <Button value='ranked' variant='contained' color='primary' onClick={() => { this.handleRankedUsers() }} />
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