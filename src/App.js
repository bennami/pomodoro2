import React, {useEffect, useRef, useState} from 'react';
import Break from "./components/break";
import './assets/main.css';
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


  useEffect(
      () => {
        setTimeLeft(sessionlength)
      }, [sessionlength]
  );


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


  const isStarted = intervalId != null;
  const start = () =>{
 if(isStarted){
      clearInterval(intervalId);
      setIntervalId(null)
    }else{

      const newIntervalId =  setInterval(() =>{
          setTimeLeft(prevTimeLeft =>  prevTimeLeft -1);
      },1000);
      setIntervalId(newIntervalId);
    }
  };


  const handleResetButtonClick = () => {
    audioElement.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType('Session');
    setsessionlength(25*60);
    setbreaklength(5*60);
    setTimeLeft(25*60)

  };

  return (

    <div className="App flex flex-col h-screen items-center justify-center  text-center bg-blue-200 ">
      <div className="flex bg-gray-100 rounded">
        <TimeLeft sessionlength={sessionlength}
                start={start}
                startStopButtonLabel={isStarted? 'Stop': 'Start'}
                timerLabel={currentSessionType} breaklength={breaklength}
                timeLeft={timeLeft}
                handleResetButtonClick={handleResetButtonClick}
        />
      </div>

    <div  className=" bg-gray-100 rounded flex text-center text-lg m-2 p-1">
      <Break  breaklength={breaklength}
              decrement ={decrementBreak}
              increment = {incrementBreak}/>

      <Session  sessionlength={sessionlength}
      decrement ={decrementSession}
      increment = {incrementSession}
      />
    </div>

      <audio id="beep" ref={audioElement}>
      <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"/>
      </audio>

    </div>

  );
}

export default App;
