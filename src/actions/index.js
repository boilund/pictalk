import axios from 'axios';

export const SET_USER = 'SET_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_CANDIDATES = 'FETCH_CANDIDATES';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_REQUEST_DATA = 'RECEIVE_REQUEST_DATA';
export const RECEIVE_DATA_FAILED = 'RECEIVE_DATA_FAILED';
export const OPEN_CREATE_GROUP_DIALOG = 'OPEN_CREATE_GROUP_DIALOG';
export const SET_GROUP_NAME = 'SET_GROUP_NAME';
export const SET_GROUP_IMAGE = 'SET_GROUP_IMAGE';
export const SET_GROUP_MEMBERS = 'SET_GROUP_MEMBERS';
export const CHANGE_GROUP = 'CHANGE_GROUP';
export const SET_PHOTO = 'SET_PHOTO';

export const setUser = user => {
        return {
          type: SET_USER,
      user
    };
};

export const logoutUser = () => dispatch => {
  axios
    .get('/api/logout')
    .then(res => {
      if (res.data.success) {
        dispatch({ type: LOGOUT_USER });
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

export const setGroupName = groupname => {
  return {
    type: SET_GROUP_NAME,
    groupname
  };
};

export const setGroupImage = image => {
  return {
    type: SET_GROUP_IMAGE,
    image
  };
};

export const setGroupMembers = members => {
  return {
    type: SET_GROUP_MEMBERS,
    members
  };
};

export const changeGroup = groupObj => {
  return {
    type: CHANGE_GROUP,
    group: groupObj
  };
};

export const setPhoto = photo => {
  return {
    type: SET_PHOTO,
    photo
  };
};
