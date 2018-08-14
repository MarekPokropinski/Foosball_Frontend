import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/userActions.js';
import CustomButton from './layout/button'


class App extends React.Component {
    handleNormalUser() {
        this.props.history.replace('/mode')
        this.props.actions.setGameType('normal');
    }

    handleRankedUsers() {
        this.props.history.replace("/mode");
        this.props.actions.setGameType('ranked');
    }

    handleFreeUser() {
        this.props.history.replace('/begin')
        this.props.actions.setGameType('free');
    }

    render() {
        let styleContainer = {
            padding: '8%'
        }
        return (
            <div style={styleContainer}>
                <CustomButton value='free' variant='contained' color='secondary' className="menuButton" onClick={() => this.handleFreeUser()} >free</CustomButton>
                <CustomButton value='normal' variant='contained' color='secondary' className="menuButton" onClick={() => this.handleNormalUser()} >normal</CustomButton>
                <CustomButton value='ranked' variant='contained' color='secondary' className="menuButton" onClick={() => { this.handleRankedUsers() }} >ranked</CustomButton>
                <CustomButton value='tournament' variant='contained' color='secondary' className="menuButton" onClick={() => { }} >tournament</CustomButton>
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