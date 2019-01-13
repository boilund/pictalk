import { combineReducers } from 'redux';
import {
  SET_USER,
  LOGOUT_USER,
  FETCH_CANDIDATES,
  REQUEST_DATA,
  RECEIVE_REQUEST_DATA,
  RECEIVE_DATA_FAILED,
  OPEN_CREATE_GROUP_DIALOG,
  SET_GROUP_NAME,
  SET_GROUP_IMAGE,
  SET_GROUP_MEMBERS,
  CHANGE_GROUP,
  SET_PHOTO
} from '../actions';

const initialState = {
  user: {
    id: '',
    loggedIn: false,
    nickname: '',
    image: '',
    avatarColor: '',
    favorites: [],
    groups: [],
    photos: []
  },
  app: {
    isFetching: false,
    candidates: [],
    openDialog: false
  },
  group: {
    id: '',
    name: '',
    image: '',
    members: [],
    post: {}
  }
};

const userReducer = (state = initialState.user, action) => {
  const { type, user } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        id: user._id,
        loggedIn: true,
        nickname: user.nickname,
        image: user.image,
        avatarColor: user.avatarColor,
        favorites: user.favorites,
        groups: user.groups,
        photos: user.photos
      };
    case LOGOUT_USER:
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state;
  }
};

const appReducer = (state = initialState.app, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_CANDIDATES:
      return {
        ...state,
        candidates: action.candidates
      };
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_REQUEST_DATA:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_DATA_FAILED:
      return {
        ...state,
        isFetching: false
      };
    case OPEN_CREATE_GROUP_DIALOG:
      return {
        ...state,
        openDialog: action.openDialog
      };
    default:
      return state;
  }
};

const groupReducer = (state = initialState.group, action) => {
  const { type } = action;
  switch (type) {
    case SET_GROUP_NAME:
      return {
        ...state,
        name: action.groupname
      };
    case SET_GROUP_IMAGE:
      return {
        ...state,
        image: action.image
      };
    case SET_GROUP_MEMBERS:
      return {
        ...state,
        members: action.members
      };
    case CHANGE_GROUP:
      return {
        ...state,
        id: action.group._id,
        name: action.group.name,
        image: action.group.image,
        members: action.group.members
      };
    case SET_PHOTO:
      return {
        ...state,
        post: action.photo
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  group: groupReducer
});

export default rootReducer;
