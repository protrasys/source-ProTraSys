const selectState = (state) => {
  return state.root;
};

export const selectENotices = (state) => {
  return selectState(state).eNotices;
};

export const selectEReports = (state) => {
  return selectState(state).eReporting;
};

export const selectOurProjectFiles = (state) => {
  return selectState(state).projectFiles;
};

export const selectStudent = (state) => {
  return selectState(state).student;
};

export const selectFaculty = (state) => {
  return selectState(state).faculty;
};

export const selectAllFaculties = (state) => {
  return selectState(state).allFaculties;
};

export const selectAllStudents = (state) => {
  return selectState(state).allStudents;
};

export const selectAlerts = (state) => {
  return selectState(state).alerts;
};
