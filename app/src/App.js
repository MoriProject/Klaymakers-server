import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import TestPage from './pages/TestPage';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/test" element={<TestPage />} />

          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
