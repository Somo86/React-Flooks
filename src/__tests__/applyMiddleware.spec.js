import applyMiddleWare from '../applyMiddleware';

let middleWareFirst;
let middleWareSecond;
let useRedux;

beforeEach(() => {
    middleWareFirst = jest.fn();
    middleWareSecond = jest.fn();
    useRedux = jest.fn();
});

describe('applyMiddleware', () => {

    it('should call all middleware passed in', () => {
        applyMiddleWare(middleWareFirst, middleWareSecond)(useRedux);
        expect(middleWareFirst).toHaveBeenCalled();
        expect(middleWareSecond).toHaveBeenCalled();
    });

    it('middleware should get useRedux as callback', () => {
        const middleWareCallback = (useRedux) => useRedux();
        applyMiddleWare(middleWareCallback, middleWareSecond)(useRedux);

        expect(useRedux).toHaveBeenCalled();
    });

    it('should include hooks provided for middleware', () => {
        const middleWareHook = () => ({ useTest: {}, });
        const middleWareProps = applyMiddleWare(middleWareHook)(useRedux);
        expect(middleWareProps.useTest).toBeDefined;
    });
});
