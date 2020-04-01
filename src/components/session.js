import React from "react";
import moment from "moment";

const Session = props => {

    const sessionLengthInMinutes = moment.duration(props.sessionlength, 's').minutes();

    return(
        <div>
            <p id='break-label'>Session</p>
            <p id="break-length">{sessionLengthInMinutes}</p>
            <button  className="border-2 border-blue-900   hover:bg-blue-900 text-blue-900 hover:text-white font-bold px-2 m-1 rounded" id="break-decrement" onClick={props.decrement}>-</button>
            <button className="border-2 border-blue-900   hover:bg-blue-900 text-blue-900 hover:text-white font-bold px-2 m-1 rounded" id="break-increment" onClick={props.increment}>+</button>
        </div>
    )
};

export default Session