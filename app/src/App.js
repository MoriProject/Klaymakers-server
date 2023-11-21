import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/store';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TestPage />
      </div>
    </Provider>
  );
}

export default App;
