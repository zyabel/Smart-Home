import {
  ADD_DEVICE,
  ADD_ITEM,
  DELETE_ITEM,
  SET,
  RESET_DEVICE_BUILDER_FORM
} from '../constants/index';

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    item
  };
};
export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    id
  };
};

export const setValue = (name, value) => {
  return {
    type: SET,
    name,
    value
  };
};

export const resetProto = () => {
  return {
    type: RESET_DEVICE_BUILDER_FORM
  };
};

export const addDevice = (device) => {
  return {
    type: ADD_DEVICE,
    device
  };
};