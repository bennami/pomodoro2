import React, {useEffect, useRef, useState} from 'react';
import Break from "./components/break";
import './App.css';
import Session from "./components/session";
import TimeLeft from "./components/timeLeft";

function App() {
  const audioElement = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId]  = useState(null);
  const [breaklength, setbreaklength] = useState(5*60);
  const [sessionlength, setsessionlength] = useState(60*25);
  const [timeLeft, setTimeLeft]  = useState(sessionlength);

  const decrementBreak =() => {
    const newbreakLength = breaklength -60;
    if(newbreakLength>0){
      setbreaklength(newbreakLength);
    }
  };

  const incrementBreak =()=>{
    const newbreakLength = breaklength +60;
    if(newbreakLength <= 60*60){
      setbreaklength(newbreakLength);
    }
  };

  const decrementSession =() => {
    const newsessionLength = sessionlength -60;
    if(newsessionLength > 0) {
      setsessionlength(newsessionLength)
    }
  };

  const incrementSession =() => {
      setsessionlength(sessionlength+60)
  };

  //change timeLeft whenever sessionLength changes, useEffect will listen to the state of session length
  useEffect(
      () => {
        setTimeLeft(sessionlength)
      }, [sessionlength]
  );

    //listens to any changes in the dependencies, runds the code only when timeLeft === 0.
    // this will switch from session to break and play a sound
    useEffect(() => {
       if(timeLeft === 0){
           //play audio
           audioElement.current.play();
           if(currentSessionType === 'Session'){
               setCurrentSessionType('Break');
               setTimeLeft(breaklength)
           }else if(currentSessionType ==='Break'){
               setCurrentSessionType('Session');
               setTimeLeft(sessionlength)
           }
       }
    },[breaklength, sessionlength, setTimeLeft, currentSessionType,timeLeft ]);

  //initial state is not null so the when u start the timer for the first time it can work properly
  const isStarted = intervalId != null;
  const start = () =>{
    //once ur in start mode, button shows 'stop' and if you click it it will stop the timer and go back to start
    if(isStarted){
      clearInterval(intervalId);
      setIntervalId(null)
    }else{
      //if u press start the timer will start count down
      const newIntervalId =  setInterval(() =>{
          setTimeLeft(prevTimeLeft =>  prevTimeLeft -1);
      },1000);
      setIntervalId(newIntervalId);
    }
  };

  //reset button
  const handleResetButtonClick = () => {
    //reset audio
    audioElement.current.load();
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
              decrement ={decrementBreak}
              increment = {incrementBreak}/>
      <Session  sessionlength={sessionlength}
      decrement ={decrementSession}
      increment = {incrementSession}
      />
      <button id="reset" onClick={handleResetButtonClick}>reset</button>
      <audio id="beep" ref={audioElement}>
      <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}

export default App;
