import {createStore, combineReducers} from './redux-react-hook';
import clickReducer from './redux-react-hook/reducers/clickReducer';

const reducers = combineReducers({
  click: clickReducer
});

export const {
  Provider,
  store,
  useRedux,
  useSelect
} = createStore(reducers, {click: null});
