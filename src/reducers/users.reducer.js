import {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  UPDATE_USERS_REQUEST,
  DISPLAY_USERS_STATUS,
  LOGIN_SUCCESS,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  CLEAR_UPDATE_PROFILE_STATUS,
  CLEAR_DELETE_PROFILE_STATUS,
  DELETE_USER_PROFILE_REQUEST,
  DELETE_USER_PROFILE_SUCCESS,
  DELETE_USER_PROFILE_FAILURE,
  UPDATE_USERS_ONLINE,
  UPLOAD_PHOTO_FAILURE,
  REGISTER_SUCCESS } from '../constants/index';

const initialState = {
  users: [],
  loadUsersStatus: '',
  displayUsersStatus: true,
  user: { errorText: '' },
  errorText: ''
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS: {
      return Object.assign(
        {},
        state,
        { users: action.payload },
        { loadUsersStatus: 'DONE' }
      );
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case LOAD_USERS_FAILURE: {
      return Object.assign({}, state, {
        loadUsersStatus: 'ERROR',
        errorText: action.payload
      });
    }
    case UPDATE_USERS_REQUEST: {
      return Object.assign({}, state, { loadUsersStatus: 'PENDING' });
    }
    case DISPLAY_USERS_STATUS: {
      return Object.assign({}, state, { displayUsersStatus: action.payload });
    }
    case UPDATE_USER_PROFILE_REQUEST: {
      return { ...state, updateProfileStatus: 'PENDING' };
    }
    case CLEAR_UPDATE_PROFILE_STATUS: {
      return { ...state, updateProfileStatus: '' };
    }
    case UPDATE_USER_PROFILE_SUCCESS:
      return { ...state, user: action.payload, updateProfileStatus: 'DONE' };
    case UPDATE_USER_PROFILE_FAILURE: {
      return {
        ...state,
        updateProfileStatus: 'FAIL',
        user: { ...state.user, errorText: action.errorText }
      };
    }
    case DELETE_USER_PROFILE_REQUEST: {
      return { ...state, updateProfileStatus: 'PENDING' };
    }
    case DELETE_USER_PROFILE_SUCCESS: {
      return { ...state,
        updateProfileStatus: 'DONE',
        deleteProfileStatus: 'DONE' };
    }
    case DELETE_USER_PROFILE_FAILURE: {
      return {
        ...state,
        updateProfileStatus: 'FAIL',
        user: { errorText: action.errorText }
      };
    }
    case CLEAR_DELETE_PROFILE_STATUS: {
      return { ...state, updateProfileStatus: '', deleteProfileStatus: '' };
    }
    case UPDATE_USERS_ONLINE: {
      const user = action.payload.msg.user;

      const userIndex = state.users.findIndex(item => item._id === user._id);

      const userWithNewStatus = { ...state.users[userIndex], home: user.home };

      const updatedUserArray = [];

      updatedUserArray[userIndex] = userWithNewStatus;

      const updatedUsers = Object.assign([], state.users, updatedUserArray);

      return { ...state, users: updatedUsers };
    }
    case UPLOAD_PHOTO_FAILURE: {
      return {
        ...state,
        updateProfileStatus: 'FAIL',
        user: { ...state.user, errorText: action.errorText }
      };
    }
    default:
      return state;
  }
};


