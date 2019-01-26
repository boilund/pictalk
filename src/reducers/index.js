import { combineReducers } from 'redux';

import { userReducer } from './userReducer';
import { appReducer } from './appReducer';
import { groupReducer } from './groupReducer';

export const initialState = {
  user: {
    _id: '',
    loggedIn: false,
    nickname: '',
    image: '',
    avatarColor: '',
    favorites: [],
    groups: [],
    photos: [],
    unreadPhotos: [],
    latestGroup: ''
  },
  app: {
    error: false,
    isFetching: false,
    candidates: [],
    openDialog: false
  },
  group: {
    _id: '',
    name: '',
    image: '',
    members: [],
    posts: []
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  group: groupReducer
});

export default rootReducer;
