import React from 'react'
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions'
import { bindActionCreators } from 'redux';
import ScoreTable from '../components/scoreTable';


class Statistics extends React.Component {
    state = {
        user: {
            duoRankingPos: "",
            nick: this.props.nick,
            normalGames: "",
            normalWinRatio: "",
            rankedDuoGames: "",
            rankedDuoWinRatio: "",
            rankedSoloGames: "",
            rankedSoloWinRatio: "",
            soloRankingPos: "",
            
        },
        error: false
    }

    componentDidMount() {
        this.props.userActions.getUserStatistics(this.props.nick)
            .then((response) => {
                this.setState({ user: response.value.data, error: false })
            })
            .catch(() => {
                console.error('Cant get user statistics');
                this.setState({ error: true })
            })
    }

    componentWillUpdate(nextProps) {
        if (nextProps.nick !== this.props.nick) {
            this.props.userActions.getUserStatistics(nextProps.nick)
                .then((response) => {
                    this.setState({ user: response.value.data, error: false })
                })
                .catch(() => {
                    console.error('Cant get user statistics');
                    this.setState({ error: true })
                })
        }
    }

    render() {
        return (
            <div>
                <div style={{ margin: '20px' }}>
                    {
                        (!this.state.user)
                            ?
                            <div>
                                <h1>{(this.state.error) ? 'Error loading data!' : 'Loading...'}</h1>
                            </div>
                            :
                            <ScoreTable data={this.getData()} />
                    }
                </div>
            </div>
        );
    }

    getData() {
        let { nick, normalGames, normalWinRatio, rankedDuoGames, rankedDuoWinRatio, rankedSoloGames, rankedSoloWinRatio, soloRankingPos } = this.state.user
        if(!this.state.error) {
            return [
                { type: 'Nick', value: nick },
                { type: 'Normal games played', value: normalGames },
                { type: 'Normal game win ratio', value: normalWinRatio + '%' },
                { type: 'Ranked solo position', value: soloRankingPos },
                { type: 'Ranked solo games played', value: rankedSoloGames },
                { type: 'Ranked solo game win ratio', value: rankedSoloWinRatio + '%' },
                { type: 'Ranked duo games played', value: rankedDuoGames },
                { type: 'Ranked duo game win ratio', value: rankedDuoWinRatio + '%' },

            ]
        } else {
            return [
                { type: 'Error', value: 'user has no games played' },
            ]       
        }
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Statistics);