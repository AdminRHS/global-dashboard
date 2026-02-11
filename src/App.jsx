/**
 * Global Dashboard App
 * Main application component with routing
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import DashboardDetail from './pages/DashboardDetail.jsx';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard/:dashboardId" element={<DashboardDetail />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
