import React from 'react';
import { useRedux, useSelect } from './store';

const selectClick = state => state.click;

function App() {
  const [state, dispatch] = useRedux();
  const currentClickState = useSelect(selectClick);
  return (
    <h1 onClick={() => {dispatch({type: 'TEST', payload: 'hola'})}}>Hello {currentClickState}</h1>
  );
}

export default App;
