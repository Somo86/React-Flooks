import { createContext, useContext } from 'react';
import Provider from './provider';

type IState<T> = T | {};
type IAction = {
  type: string,
  payload: any
}

type ApplyMidd = Function;

export default function createStore<
  TState,
  TAction
  >(
  reducer,
  preloadedState: IState<TState>,
  enhancer?: ApplyMidd
) {

  if(typeof preloadedState === 'undefined') {
    throw new Error('You must provide an initial state for the application.');
  }

  if(typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  return context<TAction>({
    reducer,
    preloadedState,
    enhancer
  });
}

export function context<TAction>({
  reducer, 
  preloadedState, 
  enhancer
}) {
  
  const StoreContext = createContext<any>(null);
  let listeners: Function[] = [];
  const store = {
    reducer,
    preloadedState,
  };

  const publicData = {
    StoreContext,
    store,
    Provider: Provider(StoreContext),
    useRedux,
    useSelect,
    useDispatch,
    useSubscribe
  };

  if(typeof enhancer !== 'undefined') {
    if(typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    // if applyMiddleware is used 
    // public same values adding any middleware hook
    return {
      ...publicData,
      ...enhancer(useRedux) 
    };
  }

  
  /**
   * @return state and dispatch
   */
  function useRedux(): any[] {
    const {state, dispatch} = useContext(StoreContext);
    const getState = () => state;

    return [
      getState,
      (action: TAction | IAction) => {
        dispatch(action);
        runListeners();
      }
    ];
  }

  /**
   * @return state
   */
  function useSelect(selectFunc?: Function) {
    const { state } = useContext(StoreContext);

    return typeof selectFunc === 'function' 
      ? selectFunc(state)
      : state
  }

  /**
   * @return dispatch
   */
  function useDispatch() {
    const { dispatch } = useContext(StoreContext);
    return action => {
      dispatch(action);
      runListeners();
    };
  }

  function runListeners() {
    listeners.forEach(listener => listener());
  }

  function useSubscribe(listener) {
    if(typeof listener !== 'function') {
      throw new Error('subscriber needs to be a function');
    }
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  return publicData;
}
