import React from "react";
import moment from "moment";

const Break = props => {


    const breakLengthInMinutes = moment.duration(props.breaklength, 's').asMinutes();
    return(

        <div>
            <p id='session-label'>Break</p>
            <p id="session-length">{breakLengthInMinutes}</p>
            <button className="border-2 border-blue-900 hover:bg-blue-900 text-blue-900 hover:text-white px-2 m-1 rounded" id="session-decrement" onClick={props.decrement}>-</button>
            <button className="border-2 border-blue-900 hover:bg-blue-900 text-blue-900 hover:text-white px-2 m-1 rounded" id="session-increment" onClick={props.increment}>+</button>
        </div>
    )
};

export default Break
