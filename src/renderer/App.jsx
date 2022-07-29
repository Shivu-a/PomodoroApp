import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppProvider from './providers/app';

import { InitialPage } from 'components/homepage/InitialPage';
import { Configure } from 'components/Settings/Configure';
import { Settings } from 'components/Settings/Settings';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/configure" element={<Configure />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
