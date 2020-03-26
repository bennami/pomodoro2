import React, {useEffect, useState} from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const TimeLeft = ({sessionlength}) =>{
    const [intervalId, setIntervalId]  = useState(null);
    const [timeLeft, setTimeLeft]  = useState(sessionlength);
    const  formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss',{trim:false});

    //change timeleft whenever sessionlength changes, useEffect will listen to the state of session length
    useEffect(
        () => {
        setTimeLeft(sessionlength)
        }, [sessionlength]
    );

    const isStarted = intervalId != null;
    const start = () =>{
        if(isStarted){

            clearInterval(intervalId);
            setIntervalId(null)
        }else{
            const newIntervalId =  setInterval(() =>{
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft  =  prevTimeLeft -1;
                    if(newTimeLeft >= 0){
                        return prevTimeLeft -1
                    }
                    return prevTimeLeft;
                } )
            },1000);
            setIntervalId(newIntervalId)
        }
     };




    const end  =  ()  => {


    };

    return  <div>
    <div>{formattedTimeLeft}</div>
    <button onClick={start}> {isStarted? 'Stop': 'Start'}</button>
    <button>end</button>
    </div>

};

export default TimeLeft;