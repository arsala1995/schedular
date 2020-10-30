import {
  useState
} from "react";


export default function useVisualMode(initial) {
  console.log("initial", initial);
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(item, replace = false) {
    const prevHistory = [...history];
   
    if(replace){
      prevHistory.pop();
    }
    const newHistory = [...prevHistory, item];
    setMode(item);
    setHistory(newHistory);

  }

  function back() {

    const prevHistory = [...history];
   
    if(prevHistory.length > 1){
   
    
console.log("before previous his", prevHistory);

    prevHistory.pop();
    console.log("After pop previous his", prevHistory);
    setMode(prevHistory[prevHistory.length - 1])
    setHistory(prevHistory);
    }
  }
  return {
    mode,
    transition,
    back
  };
}