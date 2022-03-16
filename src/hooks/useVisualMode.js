import {useState} from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // change state of mode, and save it to history
  function transition(newMode, replace = false) {
    
    setMode(newMode);
    
    if (replace) {
      setHistory(() => [...history.slice(0, history.length - 1), newMode]);
    } else {
      setHistory(() => [...history, newMode]);
    }
  }
  
  // if there's history, setmode to the top of history
  function back() {
    if (history.length > 1) {
      setHistory(prev => {
        setMode(prev[prev.length - 2])
        return prev.slice(0, prev.length - 1)
      });
    }
  };
   return { mode, transition, back };
}
