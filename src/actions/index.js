import axios from 'axios';
import { socket } from '../components/App';

export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_CANDIDATES = 'FETCH_CANDIDATES';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_REQUEST_DATA = 'RECEIVE_REQUEST_DATA';
export const RECEIVE_DATA_FAILED = 'RECEIVE_DATA_FAILED';
export const OPEN_CREATE_GROUP_DIALOG = 'OPEN_CREATE_GROUP_DIALOG';
export const RESET_GROUP = 'RESET_GROUP';
export const CHANGE_GROUP = 'CHANGE_GROUP';

export const setUser = user => {
  return {
    type: SET_USER,
    user
  };
};

export const updateUser = userId => dispatch => {
  axios.get(`/api/user/${userId}`).then(res => {
    if (res.data.success) {
      dispatch({ type: SET_USER, user: res.data.user });
    }
  });
};

export const logoutUser = () => dispatch => {
  axios
    .get('/api/logout')
    .then(res => {
      if (res.data.success) {
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: RESET_GROUP });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchUsers = userId => dispatch => {
  axios
    .get('/api/users')
    .then(res => {
      // remove login user from all users
      const me = res.data.users.find(user => user._id === userId);
      const index = res.data.users.indexOf(me);
      res.data.users.splice(index, 1);
      dispatch({ type: FETCH_CANDIDATES, candidates: res.data.users });
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

export const openCreateGroupDialog = boolean => ({
  type: OPEN_CREATE_GROUP_DIALOG,
  openDialog: boolean
});

export const changeGroup = groupId => dispatch => {
  socket.emit('joinRoom', { room: groupId });

  axios
    .get(`/api/group/${groupId}`)
    .then(res => {
      if (res.data.success) {
        dispatch({ type: CHANGE_GROUP, group: res.data.group });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
