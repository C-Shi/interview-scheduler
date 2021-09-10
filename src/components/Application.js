import React, { useEffect } from "react";
import axios from 'axios';
import useApplicationData from "../hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "./Appointment";

export default function Application(props) {
  const {
    state,
    setState,
    bookInterview,
    deleteInterview,
    updateSpots,
    setDays,
    setDay
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        updateSpots={updateSpots}
      ></Appointment>
    )
  })

  useEffect(() => {
    Promise.all([
      axios.get(process.env.REACT_APP_GET_DAYS),
      axios.get(process.env.REACT_APP_GET_APPOINTMENTS),
      axios.get(process.env.REACT_APP_GET_INTERVIEWERS)
    ])
    .then(([days, appointments, interviewers]) => {
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
      setDays(days.data);
    })
  }, [])

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
          <DayList day={state.day} days={state.days} setDay={setDay}/>
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
