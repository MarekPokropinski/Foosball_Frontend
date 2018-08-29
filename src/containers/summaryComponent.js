import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ScoreTable from '../components/scoreTable';
import Time from '../time';
import * as playersActions from '../actions/playersActions'
import { bindActionCreators } from 'redux';

class SummaryComponent extends React.Component {
    render() {
        return (
            <div>
                <ScoreTable data={this.getData()} />
                <Button style={{ margin: '40px' }} variant='contained' color='secondary' onClick={() => this.handleExitButton()}> Exit to menu </Button>
                <Button style={{ margin: '40px' }} variant='contained' color='secondary' onClick={() => this.handleRematchButton()}> Rematch </Button>
                <Button style={{ margin: '40px' }} variant='contained' color='secondary' onClick={() => this.handleReplaysButton()}> Replays </Button>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.game.gameType === 'invalid') {
            this.props.history.replace('/');
        }
    }

    handleExitButton() {
        this.props.history.replace('/')
    }

    handleRematchButton() {
        let newPlayeres = []
        for (let i = 0; i < this.props.players.length; i++) {
            let player = this.props.players[i];
            newPlayeres.push({ id: player.id, nick: player.nick, color: (player.color === 'blue') ? 'red' : 'blue' })
        }
        this.props.playersActions.setAllUsers(newPlayeres)
        this.props.history.replace(`/begin/${this.props.game.gameType}`)
    }

    handleReplaysButton() {
        this.props.history.replace('/replays');
    }

    getData() {
        return [
            { type: 'Score', value: `Red ${this.props.summary.redScore} : ${this.props.summary.blueScore} Blue` },
            { type: 'Goals', value: `${this.props.summary.redScore + this.props.summary.blueScore}` },
            { type: 'Time', value: new Time(this.props.game.time).getConverted() },
            { type: 'Longes series of red', value: `${this.props.summary.redLongestSeries}` },
            { type: 'Longes series of blue   ', value: `${this.props.summary.blueLongestSeries}` }
        ];
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        playersActions: bindActionCreators(playersActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game,
        summary: state.summary,
        players: state.players
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SummaryComponent);