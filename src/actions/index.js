import axios from 'axios';

export const SET_USER = 'SET_USER';
export const FETCH_USERS = 'FETCH_USERS';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_REQUEST_DATA = 'RECEIVE_REQUEST_DATA';
export const RECEIVE_DATA_FAILED = 'RECEIVE_DATA_FAILED';

export const setUser = user => {
  return {
    type: SET_USER,
    user: user
  };
};

export const fetchUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => {
      dispatch({ type: FETCH_USERS, users: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const requestData = () => ({
  type: REQUEST_DATA
});

export const receiveRequestData = () => ({
  type: RECEIVE_REQUEST_DATA
});

export const receiveDataFailed = () => ({
  type: RECEIVE_DATA_FAILED
});
