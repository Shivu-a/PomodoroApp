import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AppProvider from './providers/app';

const Hello = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-teal-900">
      <h1 className="text-4xl text-yellow-500 font-extrabold">Pomodoro App</h1>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
