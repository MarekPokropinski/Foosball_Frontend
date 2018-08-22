import React from 'react'

export default class Score extends React.Component {

    state = {
        timer: null
    }

    render() {
        return (
            <p  className={this.props.className}
                onClick={this.props.onClick}
                onMouseDown={() => this.handleButtonPress()}
                onMouseUp={() => this.handleButtonRelease()}
                onTouchStart={() => this.handleButtonPress()}
                onTouchEnd={() => this.handleButtonRelease()}
                >
            {this.props.value}
            </p>
        );
    }

    handleButtonPress() {
        clearTimeout(this.state.timer);
        this.setState({timer: setTimeout(() => this.props.onHold(), this.props.delay)})
    }

    handleButtonRelease() {
        clearTimeout(this.state.timer);
    }
}