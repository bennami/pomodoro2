import React, {useEffect, useState} from "react";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

const TimeLeft = ({sessionlength ,breaklength}) =>{
    const [currentSessionType, setCurrentSessionType]  =useState('Session');
    const [intervalId, setIntervalId]  = useState(null);
    const [timeLeft, setTimeLeft]  = useState(sessionlength);
    const  formattedTimeLeft = moment.duration(timeLeft,'s').format('mm:ss',{trim:false});

    //change timeleft whenever sessionlength changes, useEffect will listen to the state of session length
    useEffect(
        () => {
        setTimeLeft(sessionlength)
        }, [sessionlength]
    );

    //initial state is not null so the when u start the timer for the first time it can work
    const isStarted = intervalId != null;
    const start = () =>{
        //once ur in start mode, button shows 'stop' and if you click it it will stop the timer
        if(isStarted){
            clearInterval(intervalId);
            setIntervalId(null)
        }else{
            //if u press start the timer will count down
            const newIntervalId =  setInterval(() =>{
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft  =  prevTimeLeft -1;
                    if(newTimeLeft >= 0){
                        return prevTimeLeft -1
                    }
if(currentSessionType === 'Session'){
setCurrentSessionType('Break');
setTimeLeft(breaklength);

}else if(currentSessionType === 'Break'){
    setCurrentSessionType('Session');
    setTimeLeft(sessionlength);
}
                    //once timer reaches 00:00 start the break if ur in session
                    return prevTimeLeft;
                } )
            },10);

            setIntervalId(newIntervalId)
        }
     };




    const end  =  ()  => {


    };

    return  <div>
    <p id='timer-label'> you are in:  {currentSessionType}</p>
    <div>{formattedTimeLeft}</div>

    <button onClick={start}> {isStarted? 'Stop': 'Start'}</button>
    <button>end</button>
    </div>

};

export default TimeLeft;