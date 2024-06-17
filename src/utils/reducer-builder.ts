import _ from 'lodash';
import { ReducerAction, ReducerState, ReducerWithoutAction } from 'react';

type ActionHandler = [
  cond: boolean | string,
  callback: (state: ReducerState<any>, payload: ReducerAction<any>) => any,
  config?: {
    isVoid: boolean
  }
]

export const reducerBuilder = (
  actionHandlers: (state: ReducerState<any>, action: ReducerAction<any>) => ActionHandler[]
) => (state: ReducerState<any>, action: ReducerAction<any>) => {
  const { type, payload } = action;

  const handlers = actionHandlers(state, action);

  for (let [cond, callback, config] of handlers) {
    if (_.isBoolean(cond) ? cond : type === cond) {
      if (config?.isVoid) {
        callback?.(state, payload);
        continue;
      }
      return _.isFunction(callback) ? callback(state, payload) : callback;
    }
  }

  return { ...state, [type]: payload };
};