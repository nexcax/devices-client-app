import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import devices, { fetchDevicesEpic } from './devices';

export const rootEpic = combineEpics(
  fetchDevicesEpic,
);

export const rootReducer = combineReducers({
  devices,
});
