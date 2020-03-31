import React from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const TimeLeft = ({startStopButtonLabel,start, timerLabel, timeLeft, handleResetButtonClick}) =>{

    const  formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss',{trim:false});

    return ( <div>
    <p className="text-4xl" id='timer-label'>{timerLabel}</p>
    <div className="text-5xl">{formattedTimeLeft}</div>
    <button className="border-2 border-blue-900   hover:bg-blue-900 text-blue-900 hover:text-white font-bold px-2 m-2 rounded" onClick={start}>{startStopButtonLabel}</button>
    <button className="border-2 border-blue-900   hover:bg-blue-900 text-blue-900 hover:text-white font-bold px-2 m-2 rounded" id="reset" onClick={handleResetButtonClick}>{"Reset"}</button>
    </div>
    )

};

export default TimeLeft;