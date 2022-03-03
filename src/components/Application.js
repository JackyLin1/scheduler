import React, {useState, useEffect} from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay} from "../helpers/selectors";

import "components/Application.scss";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointments = dailyAppointments.map(appointment => {
    return <Appointment key={appointment.id} {...appointment} />;
  })

  const setDay = day => setState({...state, day})
  // const setDays = days => setState({...state, days})
  
  useEffect(() => {

    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments')
    ]).then(all => {
      const days = all[0].data;
      const appointments = all[1].data;
      setState(prev => ({...prev, days, appointments}));
    });
  }, []);

  
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} value={state.day} setDay={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
