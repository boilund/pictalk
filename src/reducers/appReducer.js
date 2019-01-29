import { initialState } from './index';

import {
  ERROR,
  NO_ERROR,
  FETCH_CANDIDATES,
  REQUEST_DATA,
  RECEIVE_REQUEST_DATA,
  RECEIVE_DATA_FAILED,
  OPEN_CREATE_GROUP_DIALOG,
  TOGGLE_DRAWER_LIST
} from '../actions';

export const appReducer = (state = initialState.app, action) => {
  const { type } = action;
  switch (type) {
    case ERROR:
      return {
        ...state,
        error: true
      };
    case NO_ERROR:
      return {
        ...state,
        error: false
      };
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
    case TOGGLE_DRAWER_LIST:
      return {
        ...state,
        openDrawerList: action.openDrawerList
      };
    default:
      return state;
  }
};
