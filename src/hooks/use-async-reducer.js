import { useCallback, useMemo, useReducer } from 'react';
import { reducerBuilder } from '../utils/reducer-builder';

export function useAsyncReducer(reducer, initialState, asyncReducer) {
  // const combinedHandlers = useCallback((state, action) => {
  //   const {type, payload, dispatch = thunkDispatch} = action;
  //   console.log('handling', type, payload, dispatch)
  //   return [
  //     [true, () => {
  //       const result = reducer(state, {...action});
  //       console.log(result);
  //       return result;
  //     }]
  //   ]
  // }, [asyncReducer, reducer])
  //
  // const combinedReducer = useMemo(() => reducerBuilder(combinedHandlers), [combinedHandlers]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkActionHandlers = useCallback((state, action) => {
    const {type, payload} = action;
    const handlers= [
      ...Object.keys(asyncReducer).map(key => [
        key, () => {
          dispatch({ type: `${key}_pending`, payload, dispatch: thunkDispatch });
          asyncReducer[key](state, action)
            .then(() => dispatch({ type: `${key}_fulfilled`, payload, dispatch: thunkDispatch }))
            .catch(() => dispatch({ type: `${key}_rejected`, payload, dispatch: thunkDispatch }));
          return state;
        }
      ]),
      [true, () => {
        dispatch({...action, dispatch: thunkDispatch})
        return state
      }]
    ]
    return handlers;
  }, [])

  const thunkReducer = useMemo(() => reducerBuilder(thunkActionHandlers), []);
  const [thunkState, thunkDispatch] = useReducer(thunkReducer, {});

  return [
    state,
    thunkDispatch,
  ]
}