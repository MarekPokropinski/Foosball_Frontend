import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'
import Button from '@material-ui/core/Button';
import ScoreTable from '../components/scoreTable';
import PlayIcon from '@material-ui/icons/PlayArrow';

class ReplaysList extends React.Component {
    state = {
        replays: []
    }
    render() {
        return (
            <div>
                <ScoreTable data={this.getData()} />
                
                <Button
                    style={{ margin: '40px' }}
                    variant='contained'
                    color='secondary'
                    onClick={() => this.props.history.replace('/summary')}>
                    Go back
                </Button>
            </div>
        );
    }

    componentDidMount() {
        if (this.props.game.gameType === 'invalid') {
            this.props.history.replace('/')
            return
        }
        this.props.userActions.getReplays(this.props.game.id)
        .then((response) => {
            console.log(response)
            this.setState({ replays: response.value.data })
        })
        .catch((e) => {
            console.error(`Catched error: ${e}`)
            this.setState({ replays: null })
        })
    }

    getData() {
        return this.state.replays.map((value, key) => {
            return {type: value.goal.team, value: <Button onClick={() => this.openInNewTab(value.url)} variant='outlined'><PlayIcon /></Button>};
        });
    }

    openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        game: state.game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplaysList);