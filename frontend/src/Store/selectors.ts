const selectState = (state: any) => {
  return state.root;
};

export const selectENotices = (state: any) => {
  return selectState(state).eNotices;
};

export const selectEReports = (state: any) => {
  return selectState(state).eReporting;
};

export const selectOurProjectFiles = (state: any) => {
  return selectState(state).projectFiles;
};

export const selectStudent = (state: any) => {
  return selectState(state).student;
};

export const selectFaculty = (state: any) => {
  return selectState(state).faculty;
};

export const selectAllFaculties = (state: any) => {
  return selectState(state).allFaculties;
};

export const selectAllStudents = (state: any) => {
  return selectState(state).allStudents;
};

export const selectAlerts = (state: any) => {
  return selectState(state).alerts;
};

export const selectAllProjectGroups = (state: any) => {
  return selectState(state).allProjectGroups;
};

export const selectMineProjectGroups = (state: any) => {
  return selectState(state).mineGroups;
};

export const selectCountedAllDocuments = (state: any) => {
  return selectState(state).AllDocuments;
};

export const selectAdmin = (state: any) => {
  return selectState(state).admin;
};

export const selectAllAdmins = (state: any) => {
  return selectState(state).allAdmins;
};

export const selectAllData = (state: any) => {
  return selectState(state).AllData;
};
