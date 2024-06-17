import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { reducerBuilder } from '../utils/reducer-builder';

export function useAsyncReducer(reducer, initialState, asyncReducer) {
  const combinedHandlers = useCallback((state, action) => {
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
        const result = reducer(state, action);
        console.log(result);
        return result;
      }]
    ]
  }, [])

  const combinedReducer = useMemo(() => reducerBuilder(combinedHandlers), [combinedHandlers]);
  const [state, dispatch] = useReducer(combinedReducer, initialState);

  const thunkActionHandlers = useCallback((state, action) => {
    const {type, payload} = action;
    const handlers= [
      // ...Object.keys(asyncReducer).map(key => [
      //   key, () => {
      //     dispatch({ type: `${key}_pending`, payload, dispatch: dispatch });
      //     asyncReducer[key](state, action).then(() => dispatch({
      //       type: `${key}_fulfilled`,
      //       payload,
      //       dispatch: dispatch
      //     })).catch(() => dispatch({ type: `${key}_rejected`, payload, dispatch: dispatch }));
      //     return state;
      //   }
      // ]),
      [true, () => {
        dispatch({...action, dispatch: dispatch})
        return state
      }]
    ]
    console.log(handlers)
    return handlers;
    // return [
    //   ['edit', () => {
    //     pageDispatch({type: 'edit_pending'});
    //     addSchool(payload).unwrap().then(() => pageDispatch({type: 'edit_fulfilled'})).catch(() => pageDispatch({type: 'edit_rejected'}));
    //   }]
    // ]
  }, [])

  const thunkReducer = useMemo(() => reducerBuilder(thunkActionHandlers), [thunkActionHandlers]);
  const [thunkState, thunkDispatch] = useReducer(thunkReducer, {});

  return [
    state,
    thunkDispatch,
  ]
}