import React, {useEffect, useState} from 'react';
import Break from "./components/break";
import './App.css';
import Session from "./components/session";
import TimeLeft from "./components/timeLeft";

function App() {

  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId]  = useState(null);
  const [breaklength, setbreaklength] = useState(5*60);
  const [sessionlength, setsessionlength] = useState(60*25);
  const [timeLeft, setTimeLeft]  = useState(sessionlength);

  const decrementMinutes =() => {
    const newbreakLength = breaklength -60;
    if(newbreakLength <0){
      setbreaklength(0)
    }else{
      setbreaklength(newbreakLength);
    }
  };

  const incrementMinutes =()=>{
    setbreaklength(breaklength+60)
  };

  const decrement =() => {
    const newsessionLength = sessionlength -60;
    if(newsessionLength <0){
      setsessionlength(0)
    }else{
      setsessionlength(newsessionLength);
    }
  };

  //change timeLeft whenever sessionLength changes, useEffect will listen to the state of session length
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
          //if in session, switch to break and set time left to breaklength
          if(currentSessionType === 'Session' ){
            setTimeLeft(breaklength);
            setCurrentSessionType('Break');

          }
          //if in break, switch to session
          else if(currentSessionType === 'Break'){
            setTimeLeft(sessionlength);
            setCurrentSessionType('Session');

          }

        });
      },10); // TODO: turn back into 1000
      setIntervalId(newIntervalId);
    }
  };

  const increment =()=>{
    setsessionlength(sessionlength+60)
  };

  const handleResetButtonClick = () => {
    //clear timeout interval
    clearInterval(intervalId);
    //set interval to null
    setIntervalId(null);
    //set session type to session
    setCurrentSessionType('Session');
    //reset session length to 25 min
    setsessionlength(25*60);
    //reset break length to 5 min
    setbreaklength(5*60);
    // reset timer to 25 min
    setTimeLeft(25*60)

  };

  return (

    <div className="App">
    <TimeLeft sessionlength={sessionlength}
              start={start}
              startStopButtonLabel={isStarted? 'Stop': 'Start'}
              timerLabel={currentSessionType} breaklength={breaklength}
    timeLeft={timeLeft}
    />

    <Break  breaklength={breaklength}
             decrement ={decrementMinutes}
             increment = {incrementMinutes}/>
    <Session  sessionlength={sessionlength}
    decrement ={decrement}
    increment = {increment}
    />
<button id="reset" onClick={handleResetButtonClick}>reset</button>

    </div>
  );
}

export default App;
