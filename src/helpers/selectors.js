export const getAppointmentsForDay = function (state, name) {
  const day = state.days.filter(d => d.name === name)[0];
  if (!day) {
    return [];
  }
  const appointments = day.appointments.map(id => {
    return state.appointments[id]
  })
  // console.log(appointments)
  return appointments;
}

export const getInterview = function (state, interview) {
  if (!interview) {
    return null;
  }
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  }
}

export const getInterviewersForDay = function (state) {
  return Object.values(state.interviewers)
}
