import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import ClassicMatchSettings from './pages/ClassicMatchSettings.jsx';
import ClassicMatch from './pages/ClassicMatch.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <Router>
        <Routes>
          <Route path="/classic-match" element={<ClassicMatch />} />
          <Route path="/classic-match-settings" element={<ClassicMatchSettings />} />
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </React.Suspense>
  </React.StrictMode>,
);