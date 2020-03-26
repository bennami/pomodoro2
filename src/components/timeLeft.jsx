import React, {useState} from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({sessionlength}) =>{
    const [timeLeft, setTimeLeft]  = useState(sessionlength);

    const  formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss');

    return  <div>{formattedTimeLeft} </div>

};

export default TimeLeft;