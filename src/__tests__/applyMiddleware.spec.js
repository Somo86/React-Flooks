import applyMiddleWare from '../applyMiddleware';

let middleWareFirst;
let middleWareSecond;
let params;

beforeEach(() => {
    middleWareFirst = jest.fn();
    middleWareSecond = jest.fn();

    params = {
        useRedux: jest.fn(),
        store: {},
        Provider: {},
        useSelect: {}
    };
});

describe('applyMiddleware', () => {

    it('should call all middleware passed in', () => {
        applyMiddleWare(middleWareFirst, middleWareSecond)(params);
        expect(middleWareFirst).toHaveBeenCalled();
        expect(middleWareSecond).toHaveBeenCalled();
    });

    it('middleware should get useRedux as callback', () => {
        const middleWareCallback = (useRedux) => useRedux();
        applyMiddleWare(middleWareCallback, middleWareSecond)(params);

        expect(params.useRedux).toHaveBeenCalled();
    });

    it('should include hooks provided for middleware', () => {
        const middleWareHook = () => ({ useTest: {}, });
        const middleWareProps = applyMiddleWare(middleWareHook)(params);
        expect(middleWareProps.useTest).toBeDefined;
    });
});
