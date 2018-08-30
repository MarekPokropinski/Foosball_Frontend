import React from 'react'
import { getPlayers } from "../actions/playersActions"
import Button from '@material-ui/core/Button'
import UserComponent from "../containers/userComponent"
import AddIcon from '@material-ui/icons/Add'
import SwapIcon from '@material-ui/icons/SwapVert'

export default (props) => {
    return (
        <div className='flex'>
            <div>
                {drawTeam('blue', props)}
            </div>
            <div>
                {drawTeam('red', props)}
            </div>
            {/* <div>
            {props.players.map((val, index) => {
                if(val.color === 'blue')
                    return (
                        <div key={index}>
                        <UserComponent color='blue' id={index} />
                        </div>
                    );
                else
                    return <div key={index} />
            })}
            {(getPlayers(props.players, 'blue').length < 2)
                ? drawAddButton('blue', props.addUser)
                : drawSwapButton('blue', props.changePositions)
            }
            </div>
            <div>
            {props.players.map((val, index) => {
                if(val.color === 'red')
                return (
                    <div key={index}>
                    <UserComponent color='red' id={index} />
                    </div>
                );
                else
                return <div key={index} />
            })}
            {(getPlayers(props.players, 'red').length < 2)
                ? drawAddButton('red', props.addUser)
                : drawSwapButton('red', props.changePositions)
            }
            </div> */}
        </div>
    );
}

const drawTeam = (color, props) => {
    let toDraw = []
    let i = 0
    let index = 0
    for (let player of props.players) {
        if (player.color === color) {
            toDraw.push(
                <span key={i}>
                    <UserComponent color={color} id={index} />
                </span>
            );

            if(getPlayers(props.players, color).length > i + 1) {
                toDraw.push(drawSwapButton(color, props.changePositions))
            }

            i++
        }
        index++
    }

    if(getPlayers(props.players, color).length < 2) {
        toDraw.push(drawAddButton(color, props.addUser))
    }
    return toDraw
}

const drawAddButton = (color, addUser) => {
    return (
        <Button style={{ margin: '0' }} variant="fab" color="secondary" aria-label="Add" onClick={() => addUser(color)}>
            <AddIcon />
        </Button>
    );
}

const drawSwapButton = (color, changePositions) => {
    return (
        <Button
            variant="fab"
            style={{ margin: '0px' }}
            color="secondary"
            onClick={() => changePositions(color)} >
            <SwapIcon />
      </Button>
    );
}