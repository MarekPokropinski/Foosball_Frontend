import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './actions/userActions.js';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import  *  as theme from './styles/theme'
const Container = styled.div`
 text-align: center;
 display:flex;
 justify-content: center;
 align-items: center;
`;

const muiTheme = theme;

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
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div style={styleContainer}>
                        <Button style={style} variant='contained' color='secondary' onClick={() => { this.handleNormalUser() }} >normal</Button>
                        <Button value='ranked' variant='contained' color='secondary' onClick={() => { this.handleRankedUsers() }} >ranked</Button>
                    </div>
                </MuiThemeProvider>
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