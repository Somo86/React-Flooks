import createStore from '../createStore';

describe('create store', () => {

    let reducer;
    const preloadState = { test: '', };
    let store;

    beforeAll(() => {
        reducer = () => {};
        store = createStore(reducer, preloadState);
    });

    it('should return store hooks', () => {
        expect(store.useRedux).toBeDefined();
        expect(store.useSelect).toBeDefined();
        expect(store.useDispatch).toBeDefined();
    });
});
