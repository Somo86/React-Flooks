import React from 'react';
import { useAsyncRedux, useSelect } from './store';

const selectClick = state => state.click;

const handleAsyncron = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: 'TEST',
      payload: 'done'
    })
  }, 1000);
}

function App() {
  const currentClickState = useSelect(selectClick);
  useAsyncRedux(handleAsyncron);
  //const [state, dispatch] = useRedux();

  return (
    <h1>Hello {currentClickState}</h1>
  );
}

export default App;
