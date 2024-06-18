import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { reducerBuilder } from '../utils/reducer-builder';

export function useAsyncReducer(reducer, initialState, asyncReducer) {
  const combinedHandlers = useCallback((state, action) => {
    console.log(action);
    const {type, payload} = action;
    console.log('handling', type, payload)
    return [
      ...Object.keys(asyncReducer).map(key => [
        key, () => {
          dispatch({ type: `${key}_pending`, payload, dispatch: dispatch });
          asyncReducer[key](state, action).then(() => dispatch({
            type: `${key}_fulfilled`,
            payload,
            dispatch: dispatch
          })).catch(() => dispatch({ type: `${key}_rejected`, payload, dispatch: dispatch }));
          return state;
        }
      ]),
      [true, () => {
        const result = reducer(state, {...action, dispatch: dispatch});
        console.log(result);
        return result;
      }]
    ]
  }, [asyncReducer])

  const combinedReducer = useMemo(() => reducerBuilder(combinedHandlers), [combinedHandlers]);
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  const thunkActionHandlers = useCallback((state, action) => {
    const {type, payload} = action;
    console.log('handling', type, payload)
    const handlers= [
      [true, () => {
        dispatch(action)
        return state
      }]
    ]
    console.log(handlers)
    return handlers;
  }, [])

  const thunkReducer = useMemo(() => reducerBuilder(thunkActionHandlers), [thunkActionHandlers]);
  const [thunkState, thunkDispatch] = useReducer(thunkReducer, {});

  return [
    state,
    thunkDispatch,
  ]
}