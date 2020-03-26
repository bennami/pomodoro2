import React, {useEffect, useState} from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const TimeLeft = ({sessionlength}) =>{
    const [timeLeft, setTimeLeft]  = useState(sessionlength);
    const  formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss');

    //change timeleft whenever sessionlength changes, useEffect will listen to the state of session length
    useEffect(
        () => {
        setTimeLeft(sessionlength)
        }, [sessionlength]
    );

    //prevtime is a built in method that we can  use for  the setter
    const start = () =>{
        setInterval(() =>{
        setTimeLeft(prevTimeLeft => prevTimeLeft -1)
        },1000);
    };

    const end  =  ()  => {


    };

    return  <div>
    <div>{formattedTimeLeft}</div>
    <button onClick={start}>start</button>
    <button>end</button>
    </div>

};

export default TimeLeft;