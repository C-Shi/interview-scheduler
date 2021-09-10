import React, { useState, useReducer } from "react";
import axios from 'axios';
import { getAppointmentsForDay } from '../helpers/selectors';

export default function useApplicationData () {
  const BOOK = 'BOOK';
  const DELETE = 'DELETE';
  const DAY = 'DAY';
  const DAYS = 'DAYS';
  const INITIALIZE = 'INITIALIZE';
  
  const [state, dispatch] = useReducer(function(state, action) {
    switch (action.type) {
      case BOOK:
        return {...state, appointments: action.payload };
      case DELETE:
        return {...state, appointments: action.payload };
      case DAY:
        return {...state, day: action.payload };
      case DAYS:
        return {...state, days: action.payload };
      case INITIALIZE:
        return {...state, ...action.payload };
      default:
        throw new Error();
    }
  }, {
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
      dispatch({ type: BOOK, payload: appointments })
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
      dispatch({ type: DELETE, payload: appointments })
    })
  }

  const updateSpots = (action = 'book') => {
    const dailyAppointments = getAppointmentsForDay(state, state.day);
    const newSpot = dailyAppointments.reduce((accu, curr) => {
      return accu + (curr.interview ? 0 : 1);
    }, action === 'book' ? -1 : 1);

    const newDays = state.days.map(d => {
      if(d.name === state.day) {
        d.spots = newSpot;
      }
      return d;
    })

    setDays(newDays);
  }

  const setDay = day => dispatch({ type: DAY, payload: day});
  const setDays = days => dispatch({ type: DAYS, payload: days });
  const initializeState = (days, appointments, interviewers) => {
    dispatch({ 
      type: INITIALIZE, 
      payload: { days, appointments, interviewers } 
    })
  };

  return {
    state,
    initializeState,
    bookInterview,
    deleteInterview,
    updateSpots,
    setDays,
    setDay
  }
}