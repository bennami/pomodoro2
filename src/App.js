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

  const decrementMinutes =() => {
    const newbreakLength = breaklength -60;
    if(newbreakLength>0){
      setbreaklength(newbreakLength);
    }
  };

  const incrementMinutes =()=>{
    const newbreakLength = breaklength +60;
    if(newbreakLength <= 60*60){
      setbreaklength(newbreakLength);
    }
  };

  const decrement =() => {
    const newsessionLength = sessionlength -60;
    if(newsessionLength > 0) {
      setsessionlength(newsessionLength)
    }
  };

  //change timeLeft whenever sessionLength changes, useEffect will listen to the state of session length
  useEffect(
      () => {
        setTimeLeft(sessionlength)
      }, [sessionlength]
  );

//listen change session to break
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



    console.log(currentSessionType);
  //initial state is not null so the when u start the timer for the first time it can work
  const isStarted = intervalId != null;
  const start = () =>{
    //once ur in start mode, button shows 'stop' and if you click it it will stop the timer and go back to start
    if(isStarted){
      clearInterval(intervalId);
      setIntervalId(null)
    }else{
      let test =currentSessionType;
      //if u press start the timer will start count down
      const newIntervalId =  setInterval(() =>{
          setTimeLeft(prevTimeLeft =>  prevTimeLeft -1);
      },100); // TODO: turn back into 1000
      setIntervalId(newIntervalId);
    }
  };

  const increment =()=>{
    setsessionlength(sessionlength+60)
  };

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
              decrement ={decrementMinutes}
              increment = {incrementMinutes}/>
      <Session  sessionlength={sessionlength}
      decrement ={decrement}
      increment = {increment}
      />
      <button id="reset" onClick={handleResetButtonClick}>reset</button>
      <audio id="beep" ref={audioElement}>
      <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"/>
      </audio>
    </div>
  );
}

export default App;
