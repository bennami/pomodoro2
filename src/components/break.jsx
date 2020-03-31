import React from "react";
import moment from "moment";

const Break = props => {

    //using moment library, we can convert seconds  to minutes
    const breakLengthInMinutes = moment.duration(props.breaklength, 's').asMinutes();
    return(
        /*// added the className below just to confirm Tailwind works!*/
        <div>
            <p id='session-label'>Break</p>
            <p id="session-length">{breakLengthInMinutes}</p>
            <button className="border-2 border-blue-900 hover:bg-blue-900 text-blue-900 hover:text-white px-2 m-1 rounded" id="session-decrement" onClick={props.decrement}>-</button>
            <button className="border-2 border-blue-900 hover:bg-blue-900 text-blue-900 hover:text-white px-2 m-1 rounded" id="session-increment" onClick={props.increment}>+</button>
        </div>
    )
};

export default Break
