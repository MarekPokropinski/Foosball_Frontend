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
    }

    handleRankedUsers() {
        this.props.history.replace("/mode");
    }

    render() {
        let style = {
            width: '300%',
        }
        let styleContainer = {
            backroundColor: "black",
        }
        return (
            <Container>
                    <div style={styleContainer}>
                        <CustomButton variant='contained' value='normal' color='secondary' onClick={() => this.handleNormalUser()} >normal</CustomButton>
                        <br/>
                        <CustomButton value='ranked' variant='contained' color='secondary' onClick={() => { this.handleRankedUsers() }} >ranked</CustomButton>
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