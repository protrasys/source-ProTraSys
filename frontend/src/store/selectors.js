const selectState = (state) => {
  return state.root;
};

export const selectENotices = (state) => {
  return selectState(state).eNotices;
};

export const selectStudent = (state) => {
  return selectState(state).student;
};

export const selectFaculty = (state) => {
  return selectState(state).faculty;
};
