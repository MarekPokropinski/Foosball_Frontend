import React from 'react'
import StatisticsForm from '../containers/statisticsForm';
import UserStatistics from '../containers/userStatistics'
export default class Statistics extends React.Component {
    state = {
        value: ""
    }

    render() {
        let statistics = (this.props.match.params.nick === undefined) ? (<StatisticsForm history={this.props.history}/>) : (<UserStatistics history={this.props.history} match={this.props.match} />)
        return (
            <div>
                {statistics}
            </div>
        );
    }
}