import { createContext, useContext } from 'react';
import Provider from './provider';

type IState<T> = T | {};
type IAction = {
  type: string,
  payload: any
}

export default function createStore<
  TState,
  TAction
  >(
  reducer,
  preloadedState: IState<TState>,
  enhancer?: Function
) {

  if(typeof preloadedState === 'undefined') {
    throw new Error('You must provide an initial state for the application.');
  }

  if(typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  if(typeof enhancer !== 'undefined') {
    if(typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  const StoreContext = createContext<any>(null);
  const store = {
    reducer,
    preloadedState
  };

  function useRedux(): any[] {
    const {state, dispatch} = useContext(StoreContext);

    return [
      state,
      (action: TAction | IAction) => dispatch(action)
    ]
  }

  function useSelect(selectFunc: Function): void {
    const { state } = useContext(StoreContext);
    return selectFunc(state);
  }

  return {
    StoreContext,
    store,
    Provider: Provider(StoreContext),
    useRedux,
    useSelect
  }
}
