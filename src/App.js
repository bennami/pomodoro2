import React, {useState} from 'react';
import Break from "./components/break";
import './App.css';
import Session from "./components/session";

function App() {
  //5 minutes is 300 seconds
  const [sessionlength, setsessionlength] = useState(300);

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
    <Break/>
    <Session  sessionlength={sessionlength}
    decrement ={decrement}
    increment = {increment}
    />
    </div>
  );
}

export default App;
