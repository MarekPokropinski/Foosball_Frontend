import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions.js';
import Button from '@material-ui/core/Button';
import ScoreTable from './scoreTable';
import Time from '../time';


class SummaryComponent extends React.Component {
    handleExitButton() {
        this.props.history.replace('/')
    }

    getConvertedTime() {
        var time = new Time(this.props.user.gameState.time);
        return time.getConverted();
    }

    getData() {
        return [
            { type: 'Score', value: 'Red ' + this.props.user.summary.redScore + ' : ' + this.props.user.summary.blueScore + ' Blue' },
            { type: 'Goals', value: `${this.props.user.summary.redScore + this.props.user.summary.blueScore}` },
            { type: 'Time', value: this.getConvertedTime() },
            { type: 'Longes series of red', value: '' + this.props.user.summary.redLongestSeries },
            { type: 'Longes series of blue   ', value: '' + this.props.user.summary.blueLongestSeries }
        ];
    }

    render() {
        return (
            <div>
                <ScoreTable data={this.getData()} />
                <Button style={{margin: '40px'}} variant='contained' color='secondary' onClick={() => this.handleExitButton()}> Exit to menu </Button>
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