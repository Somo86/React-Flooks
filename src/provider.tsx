import React, { useReducer } from 'react';
import { INITIAL_ACTION } from './constants';

export default function Provider(Context) {

  return({ store, children }) => {

    if(typeof store === 'undefined') {
      throw new Error('An store must be provided');
    }

    const { preloadedState, reducer } = store;
    const [state, dispatch] = useReducer(reducer, preloadedState);
    React.useEffect(() => {
      /** Dispatch initial action */
      dispatch({
        type: INITIAL_ACTION
      });
    }, []);


    const values = React.useMemo(() => ({state, dispatch}), [state])
    
    return (
      <Context.Provider value={values}>
        { children }
      </Context.Provider>
    );

  };
}
