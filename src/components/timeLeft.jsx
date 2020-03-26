import React from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const TimeLeft = ({startStopButtonLabel,start, timerLabel, timeLeft}) =>{

    const  formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss',{trim:false});

    return  <div>
    <p id='timer-label'> you are in:  {timerLabel}</p>
    <div>{formattedTimeLeft}</div>
    <button onClick={start}>{startStopButtonLabel}</button>
    </div>

};

export default TimeLeft;