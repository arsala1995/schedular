export function getAppointmentsForDay(state, day) {
  
  if(state.days.length === 0) {
    return [];
  }

  const matchingDay = state.days.find(item => item.name === day);
  if(!matchingDay){
    return [];
  }
  
  const appointmentsFound = matchingDay.appointments.map(id => state.appointments[id])

  return appointmentsFound;
}
