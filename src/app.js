import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/userActions.js';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ButtonAppBar from './layout/navBar';
const Container = styled.div`
 text-align: center;
 display:flex;
 justify-content: center;
 align-items: center;
 height:100%;
 backround-color: black;
`;


const rootElement = document.querySelector('#root');
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
                {//render(<ButtonAppBar />, rootElement)
                }
                <div style={styleContainer}>
                    <Button style={style} variant='contained' color='primary' onClick={() => { this.handleNormalUser() }} >normal</Button>
                    <Button value='ranked' variant='contained' color='primary' onClick={() => { this.handleRankedUsers() }} >ranked</Button>
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