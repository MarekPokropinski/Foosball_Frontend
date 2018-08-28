import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ScoreTable from '../components/scoreTable';
import Time from '../time';

class SummaryComponent extends React.Component {
    render() {
        return (
            <div>
                <ScoreTable data={this.getData()} />
                <Button style={{ margin: '40px' }} variant='contained' color='secondary' onClick={() => this.handleExitButton()}> Exit to menu </Button>
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

const mapStateToProps = (state) => {
    return {
        game: state.game,
        summary: state.summary
    }
}
export default connect(mapStateToProps)(SummaryComponent);