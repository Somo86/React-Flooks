import store from '../createStore';
import Provider from '../provider';

describe('store component', () => {  
  let wrapper;
  let storeMount;
  const reducer = () => {};
  const initialState = {
    test: 'state test'
  };

  beforeAll(() => {
    React.useContext = () => ({ state: initialState, dispatch: jest.fn() });
    storeMount = store(reducer, initialState);
    wrapper = mount(
        <Provider store={ storeMount.store }>
          <div>test</div>          
        </Provider>
    );
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

});
