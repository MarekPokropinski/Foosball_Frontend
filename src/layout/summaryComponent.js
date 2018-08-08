import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';

import ScoreTable from './scoreTable';


class SummaryComponent extends React.Component {

    componentDidMount() {
        //get info from server
    }

    handleExitButton() {
        this.props.history.replace('/')
    }

    getConvertedTime() {
        let r = '';
        let time = this.props.user.summary.gameTime / 1000;
        r += time % 60;
        time /= 60;
        if( time > 0 ) {
            r = time % 60 + '::' + r; 
            time /= 60;
        }

        if( time > 0 ) {
            r = time + '::' + r; 
        }

        return r;
    }

    getData() {
        return [
            {type: 'Score', value: this.props.user.summary.redScore + ' : ' + this.props.user.summary.blueScore},
            {type: 'Goals', value: `${this.props.user.summary.redScore + this.props.user.summary.blueScore}`},
            {type: 'Time', value: this.getConvertedTime()},
            {type: 'Longes series of red', value: '' + this.props.user.summary.redLongestSeries},
            {type: 'Longes series of blue   ', value: '' + this.props.user.summary.blueLongestSeries}
        ];
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                
                <ScoreTable data={this.getData()}/>

                <br />
            
                <Button  variant='contained' color='secondary' onClick={() => this.handleExitButton()}> Exit to menu </Button>
                    
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


export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent);