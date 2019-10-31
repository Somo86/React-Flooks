import store from '../createStore';
import Provider from '../provider';
import { INITIAL_ACTION } from '../constants';

describe('store component', () => {
  const actionMock = jest.fn();
  const reducer = (state, action) => actionMock.mockReturnValueOnce(action);
  const initialState = { test: 'state test' };
  let storeMount;

  beforeEach(() => {
    const ProviderComp = Provider({Provider: ({children}) => <h1>{children}</h1>})
    
    React.useContext = () => ({ state: initialState, dispatch: jest.fn() });
    storeMount = store(reducer, initialState);
    
    mount(
      <ProviderComp store={ storeMount.store }>
        <div>test</div>          
      </ProviderComp>
    )
  });

  it('useSelect should return current state', () => {
    const testState = state => state.test;
    const state = storeMount.useSelect(testState);
    expect(state).toBe('state test');
  });

  it('useDispatch should return dispatch action', () => {
    const dispatch = storeMount.useDispatch();
    expect(dispatch).toBeDefined();
    dispatch();
    expect(dispatch).toHaveBeenCalled();
  });

  it('useRedux should return state and dispatch', () => {
    const [state, dispatch] = storeMount.useRedux();
    expect(state).toBeDefined();
    expect(dispatch).toBeDefined();
  });

  it('should throw error if store is empty', () => {
    expect(() => Provider()()).toThrow();
  });

  it('should dispatch initial action after mount', () => {
    const action = actionMock();
    expect(action.type).toBe(INITIAL_ACTION);
  });

});
