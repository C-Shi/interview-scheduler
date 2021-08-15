export const getAppointmentsForDay = function (state, name) {
  console.log(state, name)
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
