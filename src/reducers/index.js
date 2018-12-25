import { combineReducers } from 'redux';
import {
  SET_USER,
  REQUEST_DATA,
  RECEIVE_REQUEST_DATA,
  RECEIVE_DATA_FAILED
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
    users: []
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

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

export default rootReducer;
