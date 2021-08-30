import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from 'axios';

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "./Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: [],
    interviewers: []
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(res => {
      console.log(res);
      setState(prev =>  ({...prev, appointments}))
    })
  }

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
      ></Appointment>
    )
  })

  const setDay = day => setState(prev => ({...prev, day}));
  const setDays = days => setState(prev => ({...prev, days}));

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
