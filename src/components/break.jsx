import React from "react";
import moment from "moment";

const Break = props => {

    //using moment library, we can convert seconds  to minutes
    const breakLengthInMinutes = moment.duration(props.breaklength, 's').asMinutes();
    return(
        <div>
            <p id='session-label'>Break</p>
            <p id="session-length">{breakLengthInMinutes}</p>
            <button id="session-decrement" onClick={props.decrement}>-</button>
            <button id="session-increment" onClick={props.increment}>+</button>
        </div>
    )
};

export default Break