import { SET_ALERT, REMOVE_ALERT } from './types';
import { v4 } from 'uuid';

const setAlert = ((msg, alertType) = (dispatch) => {
  const id = v4();
  dispatch({
    type: setAlert,
    payload: { msg, alertType, id }
  });
});
