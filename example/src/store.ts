import {createStore, combineReducers, applyMiddleWare, asyncMiddleware} from './redux-react-hook';
import clickReducer from './redux-react-hook/reducers/clickReducer';

const reducers = combineReducers({
  click: clickReducer
});

export const {
  Provider,
  store,
  useRedux,
  useSelect,
  useAsyncRedux
} = createStore(
  reducers,
  {click: null},
  applyMiddleWare(asyncMiddleware)
);
