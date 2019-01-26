import { initialState } from './index';
import { RESET_GROUP, FETCH_GROUP } from '../actions';

export const groupReducer = (state = initialState.group, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_GROUP:
      return {
        ...state,
        _id: action.group._id,
        name: action.group.name,
        image: action.group.image,
        members: action.group.members,
        posts: action.group.posts
      };
    case RESET_GROUP:
      return {
        ...state,
        _id: initialState.group._id,
        name: initialState.group.name,
        image: initialState.group.image,
        members: initialState.group.members,
        posts: initialState.group.posts
      };
    default:
      return state;
  }
};
