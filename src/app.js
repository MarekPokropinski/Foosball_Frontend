import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/userActions.js';
import styled from 'styled-components';
import CustomButton from './layout/button'
const Container = styled.div`
 text-align: center;
 display:flex;
 justify-content: center;
 align-items: center;
`;


class App extends React.Component {
    handleNormalUser() {
        this.props.history.replace('/begin')
        this.props.actions.setGameType('normal');
    }

    handleRankedUsers() {
        this.props.history.replace("/mode");
        this.props.actions.setGameType('ranked');
    }

    render() {
        let styleContainer = {
            backroundColor: "black",
        }
        return (
            <Container>
                    <div style={styleContainer}>
                        <CustomButton value='free' variant='contained' color='secondary' className="menuButton" onClick={() => {}} >free</CustomButton>
                        <CustomButton value='normal' variant='contained' color='secondary' className="menuButton" onClick={() => this.handleNormalUser()} >normal</CustomButton>
                        <CustomButton value='ranked' variant='contained' color='secondary' className="menuButton" onClick={() => { this.handleRankedUsers() }} >ranked</CustomButton>
                        <CustomButton value='tournament' variant='contained' color='secondary' className="menuButton" onClick={() => {}} >tournament</CustomButton>
                    </div>
            </Container>
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