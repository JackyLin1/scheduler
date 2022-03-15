import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    onDelete,
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  
  const schedule = dailyAppointments.map(appointment => {
  
    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewer={dailyInterviewers}
      bookInterview={bookInterview}
      onDelete={onDelete}
      />);
    });

  return (
    <main className="layout">
      <section className="sidebar">
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};
