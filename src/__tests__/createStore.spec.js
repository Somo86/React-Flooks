import createStore from '../createStore';
import applyMiddleWare from '../applyMiddleware';

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

describe('store with enhancer', () => {
    let reducer;
    const preloadState = { test: '', };
    let store;
    const middleware = () => ({ useTest: '' })
    const enhacer = applyMiddleWare(middleware);

    beforeAll(() => {
        reducer = () => {};
        store = createStore(reducer, preloadState, enhacer);
    });

    it('should return store hooks merged with middleware hooks', () => {
        expect(store.useRedux).toBeDefined();
        expect(store.useSelect).toBeDefined();
        expect(store.useDispatch).toBeDefined();
        expect(store.useTest).toBeDefined();
    });
})

describe('create store -> errors', () => {
    it('should throw error if initialState is not defined', () => {
        expect(() => { createStore(() => {}) }).toThrow();
    });

    it('should throw error if reducer is not function', () => {
        expect(() => { createStore('reducer') }).toThrow();
    });

    it('should throw error if enhancer is not defined or not function', () => {
        const reducer = () => {};
        const initialState = {};
        const enhancer = {}
        expect(() => { 
            createStore(reducer, initialState, enhancer) 
        }).toThrow();
    });
});
