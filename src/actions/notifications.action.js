import {
  NOTIFICATIONS_FETCH_SUCCEEDED, NOTIFICATIONS_FETCH_REQUESTED,
  NOTIFICATIONS_CHANGE_STATUS
 }
from '../constants/index';

export const fetchNotificationsSuccess = (notifications) => {
  return {
    type: 'NOTIFICATIONS_FETCH_SUCCEEDED',
    notifications
  };
};

export const fetchNotificationsRequest = () => {
  return {
    type: 'NOTIFICATIONS_FETCH_REQUESTED'
  };
};

export const changeStatusNotification = (payload) => {
  console.log(payload);
  return {
    type: 'NOTIFICATIONS_CHANGE_STATUS',
    payload
  };
};