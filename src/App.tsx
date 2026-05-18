import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import PermitDetail from './pages/PermitDetail';
import Gantt from './pages/Gantt';
import ProjectDetail from './pages/ProjectDetail';
import ProjectDashboard from './pages/ProjectDashboard';
import ProjectAnalytics from './pages/ProjectAnalytics';
import Commitments from './pages/Commitments';
import Calendar from './pages/Calendar';
import ActiveProjects from './pages/ActiveProjects';
import HistoricalProjects from './pages/HistoricalProjects';
import PredictiveAnalysis from './pages/PredictiveAnalysis';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="tracker/:id" element={<PermitDetail />} />
          <Route path="project-dashboard/:id" element={<ProjectDashboard />} />
          <Route path="project-analytics/:id" element={<ProjectAnalytics />} />
          <Route path="project/:id" element={<ProjectDetail />} />
          <Route path="active-projects" element={<ActiveProjects />} />
          <Route path="historical-projects" element={<HistoricalProjects />} />
          <Route path="predictive" element={<PredictiveAnalysis />} />
          <Route path="gantt" element={<Gantt />} />
          <Route path="commitments" element={<Commitments />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
