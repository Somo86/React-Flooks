# REACT-FLOOKS
React Flooks combine the concepts of [React Hooks](https://reactjs.org/docs/hooks-intro.html) and [Facebook's Flux](http://facebook.github.io/flux/) state management.
## Table of Contents
----------
* [Install](###install)
* [Quick start](###Quick-start)
* [Usage](###Usage)
    * [Create store](###Create-store)
    * [useRedux](###useRedux)
    * [useDispatch](###useDispatch)
    * [useState](###useState)
    * [useSubscribe](###useSubscribe)
* [Asynchronous state management](###Asynchronous-state-management)

### Install
---
```javascript
# NPM
npm install --save react-flooks
```
### Quick start
---
```javascript
// store.js
import { createStore, combineReducers } from 'react-flooks';

const clickReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TEXT':
            return action.payload;
        default:
            return state;
    }
};

const reducers = combineReducers({
  clickText: clickReducer
});

const initialState = { clickText: '' };

export const {
  Provider,
  store,
  useRedux,
  useSelect,
  useDispatch
} = createStore(reducers, initialState);
```
```javascript
// app.jsx
import { Provider, store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
```
```javascript
// component.jsx
import { useDispatch, useSelect } from './store';

export function AddTextComponent() {

    const { dispatch } = useDispatch();
    const text = useSelect(state => state.clickText); 

    const addText = useCallback(text => () => {
        dispatch({
            type: 'ADD_TEXT',
            payload: text
        });
    });

    return (
        <div>
            <p>{ text }</p>
            <button onClick={addText('added text')}>
                Add text
            </button>
        </div>
    );
}
```
### Usage
---
### Create store
Before you can use the store methods you need to initialize it and provide a context using a Provider.
```javascript
import { Provider, store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
```
### useRedux
The easiest way to access ```getState()``` and ```dispatch``` methods. Usefull when you need to access the state at any time an event is triggered.
```javascript
import { useRedux } from '../store';

function Component() {
    const [getState, dispatch] = useRedux();

    const handleClick = () => manageClick(getState());

    return <div onClick={handleClick}>click</div>;
}
```
### useDispatch
The best way to dispatch actions to change the application state
```javascript
import { useDispatch } from '../store';

function Component() {
    const dispatch = useDispatch();

    const changeState = () => dispatch({
        type: 'CHANGE_STATE',
        payload: 'new state',
    });

    return <div onClick={changeState}>click</div>;
}
```
### useState
Return the given selector function against your store state. Notice that you can produce a similar usage of mapStateToProps.
```javascript
import { useState } from '../store';

function Component() {
    const selector = state => ({
        todo: state.todo,
        todoList: state.todoList
    });

    const {todo, todoList} = useState(selector);

    return <div>{ todo }</div>;
}
```
### useSubscribe
It allows you to subscribe any function that is executed when any change of state is required.
```javascript
import { useSubscribe, useDispatch } from '../store';

function Component() {
    const receiver = () => console.log('state change required');
    const unSubcribeReceiver = useSubscribe(receiver);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            unSubcribeReceiver();
        }
    }, [])

    const handleClick = () => dispatch({});
    // subscribed function is executed
    // log: state change required

    return <div onClick={handleClick}>click</div>;
}
```

### Asynchronous state management
---
Sometimes we need to work with asynchronous processes to get data that needs to be stored. React-Flooks works in a synchronous way, which means tha dispatch an action does not wait for an asynchronous process.

To solve this issue you can use a middleware for asynchronous processes such as [Flooks-Thunk](https://github.com/Somo86/flooks-thunk)