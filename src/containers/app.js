import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as GameActions from '../actions/gameActions';
import CustomButton from '../components/button'


class App extends React.Component {
    handleNormalUser() {
        this.props.history.replace('/mode/normal')
        this.props.gameActions.setGameType('normal');
    }

    handleRankedUser() {
        this.props.history.replace("/mode/ranked");
        this.props.gameActions.setGameType('ranked');
    }

    handleFreeUser() {
        this.props.history.replace('/begin/free')
        this.props.gameActions.setGameType('free');
    }

    render() {
        let styleContainer = {
            padding: '8%'
        }
        return (
            <div style={styleContainer}>
                <CustomButton value='free' variant='contained' color='secondary' className="menuButton" onClick={() => this.handleFreeUser()} />
                <CustomButton value='normal' variant='contained' color='secondary' className="menuButton" onClick={() => this.handleNormalUser()} />
                <CustomButton value='ranked' variant='contained' color='secondary' className="menuButton" onClick={() => { this.handleRankedUser() }} />
                <CustomButton value='tournament' variant='contained' color='secondary' className="menuButton" onClick={() => { }} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gameActions: bindActionCreators(GameActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(App);