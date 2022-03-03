export function getAppointmentsForDay(state, day) {
  let result = [];
  let filteredDay = state.days.filter(d => d.name === day)[0];

  if(!state.days || !filteredDay){
    return [];
  }
  
  for(const id of filteredDay.appointments){
    const appObj = state.appointments[id];
    result.push(appObj);
  }

  return result;
}

export function getInterview(state, interview) {
  let result = {};
  let intObj = state.interviewers;

  if(!intObj || !interview){
    return null;
  }

  for(const key in intObj) {
    let interviewer = intObj[key];
    if(interviewer.id === interview.interviewer){
      result["interviewer"] = interviewer;
      result["student"] = interview.student;
    }
  }
  return result;
}