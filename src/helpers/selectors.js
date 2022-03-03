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