export function getAppointmentsForDay(state, day) {
  //function to find appointments on certain day and then use this function in application file

  if (state.days.length === 0) {
    return [];
  }

  let matchingDay = state.days.find(item => item.name === day);
  if (!matchingDay) {
    return [];
  }

  const appointmentsFound = matchingDay.appointments.map(id => state.appointments[id])
  return appointmentsFound;
}


export function getInterview(state, interview) {

  if (interview === null) {
    return null;
  }

  const interviewerExpected = state.interviewers[interview.interviewer]

  const newObj = {
    student: interview.student,
    interviewer: interviewerExpected
  }
  return newObj;
}

export function getInterviewersForDay(state, day) {
  //function to find interviewers on certain day and then use this function in application file
  if (state.days.length === 0) {
    return [];
  }

  let matchingDay = state.days.find(item => item.name === day);
  if (!matchingDay) {
    return [];
  }

  const interviewerFound = matchingDay.interviewers.map(id => state.interviewers[id]);
  return interviewerFound;
}