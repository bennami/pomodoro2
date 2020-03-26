import React, {useState} from "react";
import moment from "moment";

const Session = () => {
    //5 minutes is 300 seconds
    const [sessionlength, setsessionlength] = useState(300);

    const decrement =() => {
        const newsessionLength = sessionlength -60;
        if(newsessionLength <0){
            setsessionlength(0)
        }else{
            setsessionlength(newsessionLength);
        }
    };

    const increment =()=>{
        setsessionlength(sessionlength+60)
    };
    //using moment library, we can convert seconds  to minutes
    const sessionLengthInMinutes = moment.duration(sessionlength, 's').minutes()

    return(
        <div>
            <p id='break-label'>break</p>
            <p id="break-length">{sessionLengthInMinutes}</p>
            <button id="break-decrement" onClick={decrement}>-</button>
            <button id="break-increment" onClick={increment}>+</button>
        </div>
    )
};

export default Session