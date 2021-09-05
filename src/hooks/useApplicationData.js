import React, { useState } from "react";
import axios from 'axios';

export default function useApplicationData () {
  const [state, setState] = useState({
    days: [],
    day: 'Monday',
    appointments: [],
    interviewers: []
  })

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
      setState(prev =>  ({...prev, appointments}))
    })
  }

  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState(prev => ({...prev, appointments}))
    })
  }

  const setDay = day => setState(prev => ({...prev, day}));
  const setDays = days => setState(prev => ({...prev, days}));

  return {
    state,
    setState,
    bookInterview,
    deleteInterview,
    setDays,
    setDay
  }
}