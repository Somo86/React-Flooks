import React, { useReducer, useEffect } from 'react';
import { INITIAL_ACTION } from './constants';

export default function Provider(Context) {

  return({ store, children }) => {

    if(typeof store === 'undefined') {
      throw new Error('An store must be provided');
    }

    const { preloadedState, reducer } = store;
    const [state, dispatch] = useReducer(reducer, preloadedState);

    useEffect(() => {
      dispatch({
        type: INITIAL_ACTION
      })
    }, []);

    return (
      <Context.Provider value={{state, dispatch}}>
        { children }
      </Context.Provider>
    );

  };

}
