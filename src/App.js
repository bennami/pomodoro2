import React, {useState} from 'react';
import Break from "./components/break";
import './App.css';
import Session from "./components/session";
import TimeLeft from "./components/timeLeft";

function App() {
  //5 minutes is 300 seconds
  const [breaklength, setbreaklength] = useState(300);

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


  //5 minutes is 300 seconds
  const [sessionlength, setsessionlength] = useState(60*25);

  const decrement =() => {
    const newsessionLength = sessionlength -60;
    if(newsessionLength <0){
      setsessionlength(0)
    }else{
      setsessionlength(newsessionLength);
    }
  };

  const increment =()=>{
    setsessionlength(sessionlength+60)
  };

  return (

    <div className="App">
    <TimeLeft sessionlength={sessionlength} breaklength={breaklength}/>

    <Break  breaklength={breaklength}
             decrement ={decrementMinutes}
             increment = {incrementMinutes}/>
    <Session  sessionlength={sessionlength}
    decrement ={decrement}
    increment = {increment}
    />


    </div>
  );
}

export default App;
