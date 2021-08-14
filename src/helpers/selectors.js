export const getAppointmentsForDay = function (state, name) {
  const day = state.days.filter(d => d.name === name)[0];
  if (!day) {
    return [];
  }
  return day.appointments.map(id => {
    return state.appointments[id]
  })
}
