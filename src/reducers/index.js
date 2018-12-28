import { combineReducers } from 'redux';
import {
  SET_USER,
  FETCH_CANDIDATES,
  REQUEST_DATA,
  RECEIVE_REQUEST_DATA,
  SET_GROUP_MEMBERS
} from '../actions';

const initialState = {
  user: {
    _id: '',
    nickname: '',
    image: '',
    favorites: [],
    groups: [],
    photos: []
  },
  app: {
    isFetching: false,
    candidates: []
  },
  group: {
    members: []
  }
};

const userReducer = (state = initialState.user, action) => {
  const { type, user } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        _id: user._id,
        nickname: user.nickname,
        image: user.image,
        favorites: user.favorites,
        groups: user.groups,
        photos: user.photos
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
    default:
      return state;
  }
};

const groupReducer = (state = initialState.group, action) => {
  const { type } = action;
  switch (type) {
    case SET_GROUP_MEMBERS:
      return {
        ...state,
        members: action.members
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
