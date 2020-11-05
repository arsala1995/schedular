export function getAppointmentsForDay(state, day) {
  
  if(state.days.length === 0) {
    return [];
  }

  let matchingDay = state.days.find(item => item.name === day);
  if(!matchingDay){
    return [];
  }
  
  const appointmentsFound = matchingDay.appointments.map(id => state.appointments[id])

  return appointmentsFound;
}


export function getInterview(state, interview) {
  
  if(interview === null){
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
  
  if(state.days.length === 0) {
    return [];
  }

  let matchingDay = state.days.find(item => item.name === day);
  if(!matchingDay){
    return [];
  }

const interviewerFound = matchingDay.interviewers.map(id => state.interviewers[id]);
  return interviewerFound;
}