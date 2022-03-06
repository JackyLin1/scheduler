import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData () {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const updateSpots = (num) => { 
    let filteredDay = state.days.filter(d => d.name === state.day)[0];
    const Days = [...state.days];
    Days.forEach (d => {
      if (d.id === filteredDay.id) {
        d.spots += num;
      };
    });
 
    return Days;
  }

  function bookInterview (id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments,[id]: appointment};
    const spots = updateSpots(-1);
     return axios.put(`/api/appointments/${id}`, { interview })
    .then(
      setState({ ...state, appointments, spots})
    );
  };

  function onDelete(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    const spots = updateSpots(+1);
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then( 
        setState({...state, appointments, spots})
      );
  };

  const setDay = day => setState({...state, day})

  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return {state, setDay, bookInterview, onDelete}
}