import { initialState } from './index';

import {
  SET_USER,
  LOGOUT_USER,
  FETCH_UNREAD_PHOTOS,
  UPDATE_UNREAD_PHOTOS,
  FETCH_FAVORITE_PHOTOS,
  HANDLE_FAVORITE,
  UPDATE_FAVORITE_PHOTOS,
  SET_LATEST_GROUP
} from '../actions';

export const userReducer = (state = initialState.user, action) => {
  const { type, user } = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        _id: user._id,
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
    case FETCH_UNREAD_PHOTOS:
      return {
        ...state,
        unreadPhotos: action.unreadPhotos
      };
    case UPDATE_UNREAD_PHOTOS:
      return {
        ...state,
        unreadPhotos: action.unreadPhotos
      };
    case FETCH_FAVORITE_PHOTOS:
      return {
        ...state,
        favorites: action.favorites
      };
    case HANDLE_FAVORITE:
      const copy = [...state.favorites];
      // if you click photo that is already marked favorite remove it
      // otherwise add it to the list
      if (copy.some(post => post._id === action.clickedPost._id)) {
        const index = copy.indexOf(action.clickedPost);
        copy.splice(index, 1);
      } else {
        copy.push(action.clickedPost);
      }
      return {
        ...state,
        favorites: copy
      };
    case UPDATE_FAVORITE_PHOTOS:
      return {
        ...state,
        favorites: action.favorites
      };
    case SET_LATEST_GROUP:
      return {
        ...state,
        latestGroup: action.latestGroup
      };
    default:
      return state;
  }
};
