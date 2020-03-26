import React from "react";
import moment from "moment";

const Session = props => {

    //using moment library, we can convert seconds  to minutes
    const sessionLengthInMinutes = moment.duration(props.sessionlength, 's').minutes()

    return(
        <div>
            <p id='break-label'>Session</p>
            <p id="break-length">{sessionLengthInMinutes}</p>
            <button id="break-decrement" onClick={props.decrement}>-</button>
            <button id="break-increment" onClick={props.increment}>+</button>
        </div>
    )
};

export default Session