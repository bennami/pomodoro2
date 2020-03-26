import React, {useState} from "react";
import moment from "moment";

const Break = () => {
    //5 minutes is 300 seconds
    const [breaklength, setbreaklength] = useState(60*25);

    const decrement =() => {
        const newbreakLength = breaklength -60;
        if(newbreakLength <0){
        setbreaklength(0)
        }else{
        setbreaklength(newbreakLength);
        }
    };

    const increment =()=>{
        setbreaklength(breaklength+60)
    };
    //using moment library, we can convert seconds  to minutes
    const breakLengthInMinutes = moment.duration(breaklength, 's').minutes()

    return(
        <div>
            <p id='session-label'>Session</p>
            <p id="session-length">{breakLengthInMinutes}</p>
            <button id="session-decrement" onClick={decrement}>-</button>
            <button id="session-increment" onClick={increment}>+</button>
        </div>
    )
};

export default Break