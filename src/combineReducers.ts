export default function combineReducers(reducers) {

  if(typeof reducers !== 'object') {
    throw new Error('Expected the reducers to be an object.');
  }
  // validates each property provided includes a reducer function
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        throw new Error(`No reducer provided for key "${key}"`);
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }

  const finalReducerKeys = Object.keys(finalReducers);

  // Hooks Reducer callback
  return function combination(state = {}, action) {

    let hasChanged = false;
    const nextState = {};

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = reducers[key];
      const previousStateForKey = state[key]; // previous state
      const nextStateForKey = reducer(previousStateForKey, action); // next State

      if (typeof nextStateForKey === 'undefined') {
        //const errorMessage = getUndefinedStateErrorMessage(key, action)
        //throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state
  }
}
