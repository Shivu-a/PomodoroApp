import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import { InitialPage } from 'components/homepage/InitialPage';
import { Configure } from 'components/Settings/Configure';
import { Settings } from 'components/Settings/Settings';
import { Timer } from 'components/Timer';
import AppProvider from './providers/app';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<InitialPage />} /> */}
          <Route path="/" element={<Timer />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/configure" element={<Configure />} />
          {/* <Route path="/timer" element={<Timer />} /> */}
        </Routes>
      </Router>
    </AppProvider>
  );
}
