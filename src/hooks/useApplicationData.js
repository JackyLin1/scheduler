import {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData () {
  //default state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // go through ...state.days and update spots number based on argument
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

  //logic for booking a spot, if not edit mode update spots
  function bookInterview (id, interview, edit) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments,[id]: appointment};
    if(!edit) {
      updateSpots(-1);
    } else {
      updateSpots(0);
    }
     return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({ ...state, appointments})
    });
  };

  // logic for deleting a spot, update spots if something is delted
  function onDelete(id) {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: appointment };
    updateSpots(+1);
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({...state, appointments})
      });
  };

  // set state of Day
  const setDay = day => setState({...state, day})

  // all axios route to the scheduler-api
  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return {state, setDay, bookInterview, onDelete}
}