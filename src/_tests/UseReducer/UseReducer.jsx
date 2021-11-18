import React, { useReducer } from "react"
import "./UseReducer.css"
 
const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET: 'reset',
    CHANGE_COUNT: 'change-count'
}

function reducer(count, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return count + 1
        case ACTIONS.DECREMENT:
            return count - 1
        case ACTIONS.RESET:
            return 0
        case ACTIONS.CHANGE_COUNT:
            return count + action.payload.amount
        default:
            return count
    }
}

const UseReducer = () => {
    const [count, dispatch] = useReducer(reducer, 0)
    
    return (
        <div className="reducer-detail container">
            <div className="counter">
                <span>{count}</span>
                <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
                    +
                </button>
                <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
                    -
                </button>
                <button onClick={() => {
                    dispatch({
                        type: ACTIONS.CHANGE_COUNT,
                        payload: { amount: 5 }
                    })
                }}>
                    Add 5
                </button>
                <button onClick={() => dispatch({ type: ACTIONS.RESET })}>
                    Reset
                </button>
            </div>
            
        </div>
    )
}

export default UseReducer