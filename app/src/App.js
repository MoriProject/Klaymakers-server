import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import TestPage from './pages/TestPage';
import MainPage from './pages/MainPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/test" element={<TestPage />} />

          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
